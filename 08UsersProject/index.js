const express = require("express")
const fs = require("fs")
const users = require("./MOCK_DATA.json")
const PORT = 8000

const app = express()

// Middleware or plugin
// we need to use this if we want to get the form data as body
app.use(express.urlencoded({extended: false}))

// Routes
app.get("/", (req, resp) => {
    resp.send("Welcome to users home page, to view list of all users go to /users path")
})

// html resp example
app.get("/users", (req, resp) => {
    const respHtmlData = `<ul>
        ${users.map((user) => `<li>${user.id}, ${user.first_name}</li>`).join("")}
    </ul>`

    resp.send(respHtmlData)
})

app.get("/api/users", (req, resp) => {
    resp.json(users)
})

app.get("/api/users/:id", (req, resp) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)

    resp.json(user)
})

app.post("/api/users", (req, resp) => {
    const body = req.body;
    // console.log(body)

    users.push({id: users.length + 1, ...body})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        resp.send(`User added successfully with id ${users.length}`)
    })
})

app.patch("/api/users", (req, resp) => {
    let index = -1
    const body = req.body

    for (let i=0; i<users.length; i++) {
        if (users[i].id == Number(body.id)) {
            index = i
            break
        }
    }

    if (index != -1) {
        users.splice(index, 1, body)
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            resp.send("User details updated " + JSON.stringify(body))
        })
    } else {
        users.push(body)
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            resp.send("New user added " + JSON.stringify(body))
        })
    }
})

app.delete("/api/users/:id", (req, resp) => {
    let index = -1
    const id = Number(req.params.id)

    for (let i=0; i<users.length; i++) {
        if (users[i].id == id) {
            index = i
            break
        }
    }

    if (index != -1) {
        users.splice(index, 1)
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            resp.send(`Deleted user with id : ${id}`)
        })
    } else {
        resp.send(`User with id ${id} doesn't exists`)
    }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
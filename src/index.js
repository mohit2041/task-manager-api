const express = require("express")
require("./db/mongoose")
const taskrouter = require("./routers/tasks")
const userrouter= require("./routers/users")
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(taskrouter)
app.use(userrouter)

app.listen(port,()=>{
    console.log("server is up on the port "+port)
})



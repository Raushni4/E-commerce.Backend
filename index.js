const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const User = require("./src/Models/User")
const { register, login, findUser, updateUser} = require("./src/Controllers/Users")

const http = require("http")
const {Server} = require("socket.io")
const server = express()
const app = http.createServer(server)

const io = new Server(app)



const cors = require("cors")
const { verifyToken, validateForm, isValidated } = require("./src/Middlewares")
const { addForm } = require("./src/Controllers/Form")
const { sendEmail } = require("./src/Helper/Email")

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.status(200).json({
        uname: "Raushni",
        uphone: "00000000"

    })
})



server.post("/register", register,sendEmail)
server.post("/login", login)
server.post("/addForm",validateForm,isValidated,addForm)
server.put("/update-user",verifyToken,updateUser);
server.get("/get-product/:id",(req,res)=>{
   res.send(req.params.id)
})


server.get("/get-User",verifyToken,findUser)

io.on("connection",socket=>{
    console.log("New user connected ");
    socket.on("message",(message,room)=>{
        console.log(`New message recieved in ${room} and message is ${message}`);
        socket.to(room).emit("message",message)
    })
    socket.on("join",(room)=>{
        console.log(room)
        socket.join(room)
        socket.emit("joined")
    })
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server Started")
})
const mongodb =process.env.MONGODB_url
mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.ahbd6j6.mongodb.net/?retryWrites=true&w=majority
`)
    .then(data => console.log("Database Connected"))
    .catch(error => console.log(error))

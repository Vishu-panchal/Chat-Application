const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const app = express();
const PORT = 8080;
const server = http.createServer(app);
//requiring the server 
const {Server } =  require("socket.io");

app.set("view engine","ejs");

// creating instance of i/o --> input and output
const io = new Server(server);
// Now io will handle all input and output request 
app.get("/",(req,res)=>{
    // res.send(`Server running at port : ${PORT}`);
    res.render("index.ejs");
})


// Whenever a connection from front end is made  
io.on("connection", socket =>{ // This socket is basically client here 
    // console.log("A new user has connected ", socket.id);

    socket.on("user-message", message =>{
        // console.log("A new user MSG",message);
        io.emit("message" , message);
    })
}) 
server.listen(PORT,()=>{
    console.log("Ok");
})


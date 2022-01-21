const express= require('express')
const app=express()
const cors=require('cors')
const http=require('http')
const {Server}=require('socket.io')

app.use(cors())

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods: ["GET","POST"]
    }
})

io.on('connection',(socket)=>{
    // console.log("Connect id:",socket.id)
    socket.on("join_chat",(user)=>{
        socket.join(user.room)
        console.log(user.name+" has join the chat, room id: "+user.room)
    })

    socket.on("send_message",(messageData)=>{
        socket.to(messageData.room).emit("received_message",messageData)
    })

    socket.on('disconnect',(data)=>{
        console.log('id: '+socket.id+' is disconnected!')
    })
})

server.listen('bartaserver2.herokuapp.com',()=>{
    console.log("Server started...")
})
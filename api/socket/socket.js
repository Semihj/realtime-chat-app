import {createServer} from "http";
import express from "express";
import {Server} from "socket.io";

const app = express();

const httpServer = createServer(app)

const io = new Server(httpServer,{
    cors:{
        origin:"*"
    }
})

let users = {}


const removeUser = (socketId) => {
    users.filter((user) => user.socketId !== socketId) 

}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}
export const getReceiverSocketId = (receiverId) => {
	return users[receiverId];
};

io.on('connection',(socket) => {
    console.log("a user connected")

    socket.on("addUser",(userId) => {
        users[userId] = socket.id
        io.emit("getUsers",users)
    })
/*     socket.on("newMessage",({senderId,receiverId,message}) => {
        console.log(senderId)
        console.log(receiverId)
        console.log(message)
        const receiverSocketId = getReceiverSocketId(receiverId)
         console.log(receiverSocketId)
         io.to(receiverSocketId).emit("getMessage",{
            senderId,
            message
        })
    }) */
  /*   
    if(receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
    } */
    socket.on("disconnect",() => {
        console.log("a user disconnected")
        delete users[socket.id]
    })

})

export {app,io,httpServer}
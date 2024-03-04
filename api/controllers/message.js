import express from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const router = express.Router();

router.post("/send",async (req,res) => {
    let {senderId,message,receiverId} = req.body
    let conversationId = null
    try {
        let conversation = await Conversation.findOne({
            members:{$all:[senderId,receiverId]}
        })
        if(!conversation) {
            conversation = new Conversation({
                members:[senderId,receiverId]
            })
            conversationId = conversation._id
            await conversation.save()
        } else {
            conversationId = conversation._id
        }
        const newMessage = new Message({
            conversationId,
            senderId,
            message,
            receiverId
        })
        const receiverSocketId = getReceiverSocketId(receiverId)
        console.log(receiverSocketId)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(500).json(error.message)
    }
} )
router.post("/find",async (req,res) => {
    try {
       const {members} = req.body
       const conversation = await Conversation.find({
        members:{$all:members}
       }) 
       
       res.status(200).json(conversation)
    } catch (error) {
        console.log(error)
    }
})

router.get("/getMessages/:id",async (req,res) => {
    try {
        const messages = await Message.find({conversationId: req.params.id})
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.get("/getChats/:id",async (req,res) => {
        try {
            const chat = await Conversation.find({members:{$in : [req.params.id]}})
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error.message)
        }
})

router.get("/getConversation",async(req,res) => {

})

export default router;
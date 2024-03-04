import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:String,
        require:true,
   
    },
    message:{
        type:String,
    },
    receiverId:{
        type:String,
        require:true,
    },
    senderId:{
        type:String,
        require:true,
    },
},{timestamps:true})

const Message = mongoose.model('Message',MessageSchema)

export default Message
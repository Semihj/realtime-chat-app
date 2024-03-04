import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Message from "../Message/Message";
import { LuSendHorizonal } from "react-icons/lu";
import axios from "axios";
import { useSelector } from "react-redux";
import {io} from "socket.io-client"
export default function Chat({ chatId, chatMemberId }) {
  const [messages, setMessages] = useState({});

  const scrollRef = useRef();
  const socket = useRef()
  const { currentUser } = useSelector((state) => state.user);
  const [messageData, setMessageData] = useState({
    senderId: currentUser._id,
    receiverId: chatMemberId,
    message: null,
  });


  





  useEffect(() => {
    getMessages();
    setMessageData({
      senderId: currentUser._id,
      receiverId: chatMemberId,
      message: null,
    });
  }, [chatId]);

  useEffect(() => {
    socket.current = io("ws://localhost:3000")
    socket.current.emit("addUser",currentUser._id)
    if(!chatId) setMessages({})
  }, [socket])
  
  useEffect(() => {
 
  }, [messages])
  


  const handleMessage = async () => {
    try {
      const res = await axios.post("/api/message/send", messageData);
      setMessages((prev) => [...prev, res.data]);
        socket?.current.on("newMessage",(message) => {
      setMessages((prev) => [...prev,message] )
    })
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axios.get(`/api/message/getMessages/${chatId}`);
      if(res.data.length === 0) setMessages({})
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.length > 0 && chatId ?
          messages.map((message, index) => {
            return (
              <div ref={scrollRef} key={index} className="msg-container">
                <Message
                  own={message.senderId === currentUser._id}
                  messageData={message}
                />
              </div>
            );
          }):<div className="empty-chat" >
            Start a conversation
            </div>}
      </div>
      { chatMemberId && 
      <div className="send-message">
        <input
          type="text"
          placeholder="how you doin?"
          className="send-input"
          onChange={(e) =>
            setMessageData({ ...messageData, message: e.target.value })
          }
        />
        <button disabled={!messageData.message} onClick={handleMessage}>
          {" "}
          <LuSendHorizonal className="send-icon"  />
        </button>{" "}
      </div>
      }
    </div>
  );
}

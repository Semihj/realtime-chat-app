import React, { useEffect, useState } from "react";
import "./ChatBar.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
export default function ChatBar({setChatMemberId}) {
  const [chats, setChats] = useState([]);
  const [searchName,setSearchName] = useState(null)
  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    searchUsers()
    if(searchName === "" ) {
      
      setSearchName(null)
      getChats()
    }

  }, [searchName])
const searchUsers = async () => {
  try {
    
    const res = await axios.get(`/api/user/findUser/${searchName}`)
   const users = await res.data.filter((user) => {
      return user._id !== currentUser._id 
     
    })
    console.log(users)
    setChats(users)
  } catch (error) {
    console.log(error.message)
  }
}

  const { currentUser } = useSelector((state) => state.user);
  const getChats = async () => {
    try {
      const res = await axios.get(`/api/message/getChats/${currentUser._id}`);
      res.data.map((element) => {
        element.members.map(async (member) => {
          if (member !== currentUser._id) {
            try {
              const res = await axios.get(`/api/user/findUserById/${member}`);
              setChats((prev) => [...prev, res.data]);
             
            } catch (error) {
              console.log(error);
            }
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="chat_bar">
      <div className="search_bar">
        <input type="text" className="search" placeholder="John Doe" onChange={(e) => setSearchName(e.target.value) } />
        <FaSearch className="search_icon" />
      </div>
      <div className="chats">
        {chats.length > 0 ?
          chats.map((chat, index) => {
            return (
              <div className="chat_1" key={index} onClick={() => setChatMemberId(chat._id) } >
                <img src={chat.profileImg} className="chat_img" alt="" />
                <div className="chat_info">
                  <h1 className="friend_name">{chat.name}</h1>
                  <p className="friend_desc">
                  
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                  </p>
                </div>
              </div>
            );
          }):<div className="no-user" >User Not found </div>}
      </div>
    </div>
  );
}

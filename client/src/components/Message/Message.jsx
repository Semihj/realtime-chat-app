import { useEffect, useState } from 'react'
import "./Message.css";
import axios from 'axios';

export default function Message({own,messageData}) {
  const [sender,setSender] = useState({})

  useEffect(() => {
    
    const getReceiver = async () => {
      try {
        const res = await axios.get(`/api/user/findUserById/${messageData.senderId}`)
        setSender(res.data)
      
      } catch (error) {
        console.log(error);
      }
    }
    getReceiver()

  }, [])
  console.log(sender)
  return (
    <div className={own ? " message own_msg":" message "} >
      <img src={sender.profileImg || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" } className='sender-img' alt=""   />
      <div className="wrap">
      
      <p className='msg' >{messageData.message} </p>
      </div>
    </div>
  )
}

import  { useEffect, useState } from 'react'
import ChatBar from '../../components/ChatBar/ChatBar'
import Chat from '../../components/Chat/Chat'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Home() {

  const [chatId, setChatId] = useState(null)
  const [chatMemberId, setChatMemberId] = useState()
  const {currentUser} = useSelector((state) => state.user )
  console.log(chatMemberId)

  useEffect(() => {
    getChatId()
  }, [chatMemberId])

  const getChatId = async () => {
    try {
      const res = await axios.post("/api/message/find",{
        members:[currentUser._id,chatMemberId]
      })
      if(res.data[0]) setChatId(res.data[0]._id)
      else setChatId()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='app' >
      <ChatBar setChatMemberId={setChatMemberId} />
      <Chat chatId={chatId} chatMemberId={chatMemberId} />
    </div>
  )
}

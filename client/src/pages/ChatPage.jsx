import React from 'react'
import toast from 'react-hot-toast'

function ChatPage() {
  return (
    <div>
        <h1>chatpage</h1>
        <button onClick={()=>toast.error()}>click</button>
    </div>
  )
}

export default ChatPage
import BibleChat from '@/components/bibleChat'
import React from 'react'

export default function Page() {
  const intialMessage = `Welcome to our chat! 😊 How can I assist you today? Whether you have questions about the Bible, need guidance, or just want to have a conversation, I'm here to help. Feel free to ask me anything!`

  return (
    <div className=' flex h-screen justify-center items-center'>
       <BibleChat type='Start New Chat' api='/api/chat' initalMessage={intialMessage}/> 
    </div>
  )
}

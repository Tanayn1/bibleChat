'use client'
import React from 'react'
import { useChat } from "ai/react"

export default function BibleChat() {
const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/chat',
    onError: (e) =>{
        console.log(e)
    }
    });
  return (
    <div className=''>
        {messages.map((m, index)=>{
           return( 
           <div key={index}>
                {m.role === 'assistant' ? (
        <div className=' chat chat-start mr-36'>
            <div className='chat-header'>
                AI
            </div>
                <div className=' chat-bubble'>{m.content}</div>
        </div>) : (
        <div className=' chat chat-end'>
            <div className=' chat-header'>
                You
            </div>
            <div className=' chat-bubble'>{m.content}</div>
        </div>)}
            </div>
            )
        })}

    </div>
  )
}

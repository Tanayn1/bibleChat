'use client'
import React from 'react'
import { useChat } from "ai/react"

export default function BibleChat() {
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onError: (e) =>{
        console.log(e)
    }
    
    });
  return (
    <div className=' flex flex-col h-screen w-[600px]'>
        <div className=' flex-grow overflow-auto no-scrollbar mt-24 '>
            {messages.map((m, index)=>{
            return( 
            <div key={index}>
                    {m.role === 'assistant' ? (
            <div className=' chat chat-start mr-36'>
                <div className='chat-header'>
                    Bible
                </div>
                    <div className=' chat-bubble max-w-[100x]'>{ isLoading ? <div className=' loading loading-dots loading-xs '></div> : m.content}</div>
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
        <div className=' mt-4'>
            <form onSubmit={handleSubmit} className=' flex' >
                <input type="text" className=' input input-bordered' value={input} onChange={handleInputChange}  />
                <button className=' btn' type='submit'>Submit</button>
            </form>

        </div>

    </div>
  )
}

'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useChat } from "ai/react"
import ReactTextareaAutosize from 'react-textarea-autosize';
import { IoIosSend } from 'react-icons/io';
import parse from 'html-react-parser';
import { createClient } from '../../utils/supabase/client';
import { Message } from 'ai';
import showdown from 'showdown'
import PricingModal from './pricingModal';
import { checkChatNum, isPlanFree } from '@/functions/functions';
import PricingModalChat from './pricingModalChat';


export default function BibleChatHistory({api,  id, messageHistory} : 
    {api : string,  id: string,  messageHistory : Array<any>}) {
const supabase = createClient();    
const [chatSessionID, setChatSessionID] = useState<null | string>(null);
const [modal, setModal] = useState<boolean>(false);
const [chatCheck, setChatCheck] = useState<boolean>(false)
const checkChat = async ()=>{
    const isOnFreePlan : boolean = await isPlanFree(supabase)
    setModal(isOnFreePlan)
    setChatCheck(true)
}

const updateChatSession = async (message : Message)=>{
    if (chatSessionID === null) {
        console.log(input)
        const {data, error} : any = await supabase
        .from('chatSessions')
        .insert({
            type: api,
            api_route: api,
            messages: [...messages,{
                id: "firstMessage",
                role: 'user',
                content: input,
                createdAt: Date.now()
            }, message],
            
        })
        .select();
        if (error) console.log(error);
        console.log(data, data[0].id)
        setChatSessionID(data[0].id)

    } else {
        console.log(chatSessionID);
        console.log([...messages, message])
        const response = await supabase
        .from('chatSessions')
        .update({messages: [...messages,{
            id: "lastMessage",
            role: 'user',
            content: input,
            createdAt: Date.now()
        }, message]})
        .eq('id', chatSessionID)
        .select();
        if (response.error) console.log(response.error)
        console.log(response)
    }
}

const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages} = useChat({
    api: api,
    onError: (e) =>{
        console.log(e)
    },
    initialMessages: messageHistory,
    onFinish: (message)=>{
        updateChatSession(message);
    }
    });
    
    const converter = new showdown.Converter();

    function convertMarkdownToHTML(markdown : any) {
        return converter.makeHtml(markdown);
    }

    const chatContainer = useRef<HTMLDivElement>(null);

    const scroll = ()=>{
        if (!chatContainer.current) return;
        const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement
        if (scrollHeight >= scrollTop + offsetHeight) {
            chatContainer.current?.scrollTo(0, scrollHeight + 200)
        }
    }
    
    useEffect(()=>{
        checkChat();
        setChatSessionID(id)
        setMessages(messageHistory)
    },[])
    useEffect(()=>{
        scroll();
    },[messages])
 if (chatCheck === true) {return (
    <div className=' flex flex-col h-screen w-[600px] mobile:w-[300px]'>
        <div ref={chatContainer} className=' flex-grow overflow-auto no-scrollbar mt-24 '>
            {messages.map((m, index)=>{
            return( 
            <div key={index}>
                    {m.role === 'assistant' ? (
            <div className=' chat chat-start mr-36'>
                <div className='chat-header'>
                    Bible
                </div>
                    <div className=' chat-bubble max-w-[100x] mobile:max-w-[360px]'>{parse(convertMarkdownToHTML(m.content))}</div>
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
            <div className='  flex items-center justify-center bg-zinc-900 rounded-t-2xl  mobile:rounded-3xl mobile:shadow-none shadow-2xl shadow-slate-800 mobile:mb-32'>
                <form onSubmit={handleSubmit} className=' flex' >
                    <ReactTextareaAutosize  
                    className='  w-[400px] mobile:w-[170px] m-6 bg-zinc-900 no-scrollbar resize-none rounded-lg p-2 focus:outline-none' 
                    value={input} 
                    onChange={handleInputChange}
                    autoFocus
                    placeholder='Ask anything.....'
                    />
                    <button disabled={isLoading} className=' mx-2 btn mt-6 hover:bg-slate-200 bg-white text-black rounded-full px-4 ' type='submit'>
                    {isLoading ?<div className=' loading loading-dots loading-sm'></div> : <IoIosSend className=' w-6 h-6' />} 
                    </button>
                </form>
            </div>
        </div>
        <PricingModalChat show={modal}/>
    </div>
  )}  else {
    return (
        <div className=' flex h-screen justify-center items-center'>
            <div className=' loading loading-spinner loading-md'></div>
        </div>
    )
  }
}

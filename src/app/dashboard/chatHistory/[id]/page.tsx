'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../../../../utils/supabase/client'
import BibleChatHistory from '@/components/bibleChatHistory';

export default function Page() {
    const { id } : any = useParams();
    const [chat, setChat] = useState<null | any>(null)
    const supabase = createClient();
    const fetchChat = async ()=>{
        const { data, error } = await supabase
        .from('chatSessions')
        .select('*')
        .eq('id', id);
        if (error) console.log(error);
        console.log(data)
        if (data) setChat(data[0]);
    }

    useEffect(()=>{
        console.log(id)
        fetchChat();
    },[])
  return (
    <div className=' flex h-screen justify-center items-center'>
        {chat ? 
        <BibleChatHistory 
        api={chat.api_route}
        messageHistory={chat.messages}
        id={id}
        
        /> : <div className=' loading loading-spinner loading-lg'></div>}
    </div>
  )
}

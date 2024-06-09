'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function ChatHistory() {
    const supabase = createClient();
    const [chats, setChats] = useState<null | Array<any>>(null);
    const router = useRouter();
    const fetchChats = async ()=>{
      const response = await supabase.auth.getUser()
      if (response.error) console.log(response.error)
      const userID = response.data.user?.id
      const { data, error } = await supabase
      .from('chatSessions')
      .select('*')
      .eq('user_id', userID)
      if (error) console.log(error)
      console.log(data);    
      
      const sortedChats = data?.sort((a : any, b : any) => {
        const dateA : any = new Date(a.created_at);
        const dateB : any = new Date(b.created_at);
        return dateB - dateA;
      });
      sortedChats && setChats(sortedChats)
    }
    useEffect(()=>{
        fetchChats();
    },[])
    const formatDate = (date : any) => {
        const d = new Date(date);
        const dd = d.toDateString()
        return dd
    }
   return (
    <div className=' bg-zinc-950 w-[400px] h-[600px] rounded-xl mobile:h-[500px] mobile:w-[360px]'>
        <h1 className=' text-2xl font-semibold m-3'>Chat History</h1>
        <div className=' h-500px overflow-auto no-scrollbar'>
            {chats ? chats.map((chat, index)=>{
                return (
                <div key={index} className=' cursor-pointer bg-zinc-900 rounded-xl hover:bg-zinc-800 m-3 mx-5' 
                onClick={()=>{router.push(`/dashboard/chatHistory/${chat.id}`)}}>
                    <div className=' m-3'>
                        <div className=' p-1 h-[25px] overflow-hidden'>
                            <h1>{chat.messages[1].content}</h1>
                        </div>
                        <div className=' flex justify-between items-center p-2'>
                            <h1 className=' text-xs text-gray-300'>{chat.type}</h1>
                            <h1 className=' text-xs text-gray-300'>{formatDate(chat.created_at)}</h1>
                        </div>
                    </div>
                </div>
            )
            })
             : 
             <div></div>}
        </div>
    </div>
  )
}

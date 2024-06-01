'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
    const supabase = createClient();
    const [name, setName] = useState<null | string>(null);
   const fetchData = async ()=>{
    try {
        const res = await supabase.auth.getUser();
        const userID = res.data.user?.id; 
        const {data, error} = await supabase.from('users').select().eq('id',userID)
        console.log()
        data && setName(data[0].name)
    } catch (error) {
        console.log(error)
    }
   };
   useEffect(()=>{
    fetchData();
   },[])
  return (
    <div>
        <div className=' m-12'>
            <h1 className=' text-gray-400 font-md text-xl'>Welcome Back, </h1>
            { name ? <h1 className=' text-3xl text-white font-semibold ml-9'>{name}</h1> : 
            <div className="skeleton h-4 w-20"></div>}
        </div>
        <div className=' mt-4 flex w-full'>
            <Link href={'/dashboard/startNewChat'}>
                <div className=' cursor-pointer w-[500px] bg-zinc-950 rounded-3xl ml-8 flex items-center transform transition-transform duration-300 hover:scale-105 '>
                <div className=' fade-mask'>
                    <Image className=' rounded-2xl opacity-50 ' alt='' src={'/516db099-309d-44e0-a17e-e1b81b96148d.jpeg'} height={250} width={250}/>
                </div>
                    <div className=' ml-12'>
                        <h2 className="text-4xl font-semibold text-gray-400">Start</h2>    
                        <h2 className="text-4xl font-semibold ml-16">Chat</h2>    
                    </div>
                </div>
            </Link>
        </div>
        
       

        <div className=' flex mt-4'>
            <div className=' bg-zinc-950 rounded-xl'>
                Create a prayer
            </div>
        </div>
    </div>
  )
}

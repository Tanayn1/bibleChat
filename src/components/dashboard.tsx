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
    <div >
        <div className=' m-12 '>
            <h1 className=' text-gray-400 font-md text-xl'>Welcome Back, </h1>
            { name ? <h1 className=' text-3xl text-white font-semibold ml-9'>{name}</h1> : 
            <div className="skeleton h-4 w-20"></div>}
        </div>
        <div className=' mt-4 flex  mobile:flex-col-reverse sm:flex-col-reverse sm:items-center w-full mobile:items-center '>
            <Link href={'/dashboard/startNewChat'}>
                <div className=' cursor-pointer w-[500px] mobile:w-[350px]  sm:mx-0 sm:mt-7 mobile:mx-0 mobile:mt-7 bg-zinc-950 rounded-3xl ml-8 flex items-center transform transition-transform duration-300 hover:scale-105 '>
                <div className=' fade-mask'>
                    <Image className=' rounded-2xl opacity-50 ' alt='' src={'/516db099-309d-44e0-a17e-e1b81b96148d.jpeg'} height={250} width={250}/>
                </div>
                    <div className=' ml-12 mobile:pr-10'>
                        <h2 className="text-4xl font-semibold mobile:text-lg ">Start</h2>    
                        <h2 className="text-4xl font-semibold ml-16 mobile:ml-4 mobile:text-lg">Chat</h2>    
                    </div>
                </div>
            </Link>
            <div className='mobile:w-[350px] bg-zinc-950 mx-16 rounded-2xl relative flex flex-col items-center'>
                <div className=' fade-mask-bottom relative  '>
                    <Image className=' rounded-2xl ' alt='' src={'/wideBible.jpg'}  width={500} height={500}/>
                </div>
                <div className=' absolute bottom-0 left-0 right-0 flex flex-col items-center'>
                    <h1 className=' text-sm font-bold '>Verse Of The Day:</h1>
                    <h1 className=' font-serif text-lg mobile:text-xs w-[400px] mobile:w-[200px] text-center'>"Blessed are the peacemakers, for they will be called children of God."</h1>
                    <h1 className=' font-semibold text-xl my-3 w-[400px] text-center'>Mathew 5:9</h1>
                </div>
            </div>
        </div>
        <h1 className='ml-8 mt-6 text-2xl font-semibold'>Ask About...</h1>
        <div className=' flex  my-7 mobile:grid mobile:grid-cols-2 mb-24 sm:grid sm:grid-cols-2  '>
            <Link href={'/dashboard/startNewChat/createPrayer'}>
                <div className=' cursor-pointer ml-8 mx-4 mobile:mx-1 sm:mx-2 bg-zinc-950 rounded-xl transform transition-transform duration-300 hover:scale-105'>
                    <div className='fade-mask-bottom '>
                        <Image className=' rounded-2xl' alt='' src={'/a34e1e38-89a4-4c7a-bf4f-e49355f8d16d.jpg'} height={300} width={300}/>
                    </div>
                    <h1 className='mx-3 mb-4 text-xl font-md'>Create My Prayer</h1>
                </div>
            </Link>
            <Link href={'/dashboard/startNewChat/healMyPain'}>
                <div className='cursor-pointer mx-4 mobile:mx-1 sm:mx-1 bg-zinc-950 rounded-xl transform transition-transform duration-300 hover:scale-105'>
                    <div className='fade-mask-bottom  '>
                        <Image className=' rounded-2xl' alt='' src={'/e7814445-9a80-4857-a120-a66168b2d1b9.jpg'} height={300} width={300}/>
                    </div>
                    <h1 className='mx-3 mb-4 text-xl font-md'>Heal my pain</h1>
                </div>
            </Link>
            <Link href={'/dashboard/startNewChat/creation'}>
                <div className=' cursor-pointer mx-4 mobile:mx-1 sm:mx-2 bg-zinc-950 rounded-xl transform transition-transform duration-300 hover:scale-105'>
                    <div className='fade-mask-bottom '>
                        <Image className=' rounded-2xl' alt='' src={'/6d5e95a4-db90-44e9-9700-098e92fa840b.jpg'} height={300} width={300}/>
                    </div>
                    <h1 className='mx-3 mb-4 text-xl font-md'>Creation</h1>
                </div>
            </Link>
            <Link href={'/dashboard/startNewChat/relationships'}>
                <div className=' cursor-pointer mx-4 mobile:mx-1 sm:mx-1 bg-zinc-950 rounded-xl transform transition-transform duration-300 hover:scale-105'>
                    <div className='fade-mask-bottom '>
                        <Image className=' rounded-2xl' alt='' src={'/535de883-23aa-4487-b46c-c004433c80b6.jpg'} height={300} width={300}/>
                    </div>
                    <h1 className='mx-3 mb-4 text-xl font-md'>Relationships</h1>
                </div>
            </Link>

        </div>
    </div>
  )
}

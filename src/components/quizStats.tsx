'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'

export default function QuizStats() {
    const supabase = createClient();
    const [stats, setStats] = useState<null | Array<any>>(null);
    const fetchData = async () => {
        const res = await supabase.auth.getUser();
        if (res.error) throw res.error;
        const userID = res.data.user?.id
        const { data, error } = await  supabase
        .from('userScores')
        .select('*')
        .eq('user_id', userID);
        if (error) throw error;
        const array : Array<any> = [];
        console.log(data)
        data.forEach((obj)=>{
            const date = new Date(obj.created_at)
            const time = date.toDateString()
            array.push({
                quizID: obj.id,
                score: obj.score,
                createdAt: time,
                questions: obj.questions,
                difficulty: obj.difficulty
            })
        });
        console.log(array);
        setStats(array) ;
    }

    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div className=' m-6'>
        <div className=' bg-zinc-950 flex flex-col rounded-2xl'>
                <div className=' m-8'>
                <h1 className=' text-lg font-semibold'>Previous Quizzes</h1>
                <p className=' text-xs mt-2'>View your previous quiz results</p>
                <div className=' h-[300px] overflow-auto no-scrollbar'>
                    {stats ? stats.map((stat, index)=>{
                        return (
                        <div key={index} className=' cursor-pointer flex items-center justify-between my-6 transition transform duration-150 ease-in-out hover:bg-zinc-800 hover:shadow-2xl rounded-2xl'>
                            <div className=' m-3'>
                                <h1>Date:</h1>
                                <div className=' flex items-center justify-between'>
                                    <h1 className=' text-xs text-gray-300 m-1'>{stat.createdAt}</h1>
                                    <h1 className=' text-xs text-gray-300 ml-5 '>Score: {stat.score}/7</h1>
                                    <h1 className=' text-xs text-gray-300 ml-5 '>Difficulty: {stat.difficulty}</h1>
                                </div>
                            </div>
                        </div>
                        )
                    })  : 
                    <div className=' flex flex-col items-center'>
                        <div className=' skeleton w-full mx-3 mt-4 my-1 h-9'></div>   
                        <div className=' skeleton w-full mx-3 mt-4 my-1 h-9'></div>    
                        <div className=' skeleton w-full mx-3 mt-4 my-1 h-9'></div>    
                        <div className=' skeleton w-full mx-3 mt-4 my-1 h-9'></div>    
                        <div className=' skeleton w-full mx-3 mt-4 my-1 h-9'></div>     
                    </div>
                    }
                </div>
            </div>

        </div>
    </div>
  )
}

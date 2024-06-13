import React from 'react'

export default function SelectTier({ setDiff } : {setDiff : Function}) {
  return (
    <div className='flex h-screen justify-center items-center mobile:mb-20 '>
        <div className=' flex flex-col items-center '>
            <div className=' m-4 '>
                <h1 className=' text-3xl my-5 text-center'>Select Difficulty</h1>
                <div onClick={()=>{setDiff('easy_questions')}} className=' cursor-pointer my-1  bg-zinc-950 w-[300px] rounded-xl border border-zinc-900 transform transition-transform duration-300 hover:scale-105'>
                    <h1 className=' m-7 text-center text-xl'>Easy</h1>
                </div>
                <div onClick={()=>{setDiff('medium_questions')}} className=' cursor-pointer my-2  bg-zinc-950 w-[300px] rounded-xl border border-zinc-900 transform transition-transform duration-300 hover:scale-105'>
                    <h1 className=' m-7 text-center text-xl'>Medium</h1>
                </div>
                <div onClick={()=>{setDiff('hard_questions')}} className=' cursor-pointer my-1  bg-zinc-950 w-[300px] rounded-xl border border-zinc-900 transform transition-transform duration-300 hover:scale-105'>
                    <h1 className=' m-7 text-center text-xl'>Hard</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

import React from 'react'
import { BiBible } from 'react-icons/bi'

export default function Banner1() {
  return (
    <div className=' mb-24'>
        <div className=' flex justify-center items-center '>
            <div className=' flex flex-col items-center'>
                <BiBible className=' h-28 w-28'/>
                <p className=' w-[400px] text-sm text-center'>Deepen your connection with the Lord by engaging directly with the Holy Scriptures. Ask questions about faith, life, and spirituality, and receive guidance rooted in the wisdom of the Bible. Holy Harmony provides instant access to divine insights. Discover the transformative power of scripture and strengthen your relationship with the Lord, one conversation at a time</p>
            </div>
            <div className='  bg-zinc-900 border-4 border-purple-700 mx-7 rounded-2xl'>
                <div className=' flex flex-col items-center m-4'>
                    <BiBible className=' h-28 w-28'/>
                    <p className=' w-[400px] text-sm text-center'>Deepen your connection with the Lord by engaging directly with the Holy Scriptures. Ask questions about faith, life, and spirituality, and receive guidance rooted in the wisdom of the Bible. Holy Harmony provides instant access to divine insights. Discover the transformative power of scripture and strengthen your relationship with the Lord, one conversation at a time</p>
                </div>
            </div>
            <div className=' flex flex-col items-center'>
                <BiBible className=' h-28 w-28'/>
                <p className=' w-[400px] text-sm text-center'>Deepen your connection with the Lord by engaging directly with the Holy Scriptures. Ask questions about faith, life, and spirituality, and receive guidance rooted in the wisdom of the Bible. Holy Harmony provides instant access to divine insights. Discover the transformative power of scripture and strengthen your relationship with the Lord, one conversation at a time</p>
            </div>
        </div>
    </div>
  )
}

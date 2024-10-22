import React from 'react'
import { BiBible, BiMessageSquare, BiPencil } from 'react-icons/bi'
import { FaChurch } from 'react-icons/fa'
import { MdQuiz } from 'react-icons/md'

export default function BottomNav() {
  return (
    <div className=' md:hidden lg:hidden fixed bottom-0 w-full py-4 bg-zinc-950 z-20'>
        <div className=' flex justify-center'>
            <div className=' mx-4'>
                <a href='/dashboard' className=' flex flex-col items-center'>
                    <FaChurch className=' h-6 w-6 mb-1'/>
                    Home
                </a>
            </div>
            <div className=' mx-4'>
                <a href='/dashboard/bible' className=' flex flex-col items-center'>
                    <BiBible className=' h-6 w-6'/>
                    Bible
                </a>
            </div>            
            <div className=' mx-2'>
                <a href='/dashboard/chatHistory' className=' flex flex-col items-center'>
                    <BiMessageSquare className=' h-6 w-6'/>
                    Chats
                </a>
            </div>
            <div  className=' mx-2'>
                <a href='/dashboard/quiz' className=' flex flex-col items-center'>
                    <MdQuiz className=' h-6 w-6'/>
                    Bible Quiz
                </a>
            </div>
        </div>
    </div>
  )
}

'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiBible, BiMessageSquare } from 'react-icons/bi'
import { FaChurch } from 'react-icons/fa6'
import { MdQuiz } from 'react-icons/md'
import { GiHamburgerMenu } from "react-icons/gi";

export default function MobileSidebar() {
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const handleToggle = ()=>{
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }
  return (
    <div className=' md:hidden lg:hidden'>
        <div className=' fixed top-0 left-0 z-50'>
            <GiHamburgerMenu className='  fill-white m-5 h-6 w-6 cursor-pointer' onClick={handleToggle} />
        </div>
            <ul className={` ${open ? 'opacity-100' : ' opacity-0 pointer-events-none '} fixed left-0 top-11 z-40 menu menu-lg bg-zinc-950  w-56 rounded-box transition-opacity duration-300`}>
                <li onClick={()=>{router.push('/dashboard')}} className={``}>
                    <a>
                        <FaChurch className=' h-6 w-6 mb-1'/>
                        Home
                    </a>
                </li>
                <li onClick={()=>{router.push('/dashboard/bible')}}>
                    <a>
                        <BiBible className=' h-6 w-6'/>
                        Bible
                    </a>
                </li>
                <li onClick={()=>{router.push('/dashboard/chatHistory')}}>
                    <a>
                        <BiMessageSquare className=' h-6 w-6'/>
                        Chats
                    </a>
                </li>
                <li onClick={()=>{router.push('/dashboard/quiz')}}>
                    <a>
                        <MdQuiz className=' h-6 w-6'/>
                        Bible Quiz
                    </a>
                </li>
            </ul>
</div>
  )
}


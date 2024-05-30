import Image from 'next/image'
import React from 'react'

export default function SideNav() {
  return (
    <div className=' flex flex-col bg-zinc-950  h-screen'>       
        <div className=' m-4'>
            <Image alt='logo' src={'/holyharmonyWhiteNobg.png'} width={200} height={200}/>
        </div>
        <div>
            <ul className="menu menu-lg bg-zinc-950  w-56 rounded-box">
                <li>
                    <a>Home</a>
                </li>
                <li><a>md item 2</a></li>
            </ul>
        </div>
    </div>
  )
}

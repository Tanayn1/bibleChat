import Image from 'next/image'
import React from 'react'

export default function SideNav() {
  return (
    <div className=' flex flex-col bg-slate-100 h-screen'>
        <div className=' m-4'>
            <Image alt='logo' src={'/logoholyharmony.jpeg'} width={100} height={100}/>
        </div>
        <div>
            <ul className="menu menu-md bg-base-200 w-56 rounded-box">
                <li><a>Home</a></li>
                <li><a>md item 2</a></li>
            </ul>
        </div>
    </div>
  )
}

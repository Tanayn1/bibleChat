import Image from 'next/image'
import React from 'react'
import { FaCross } from 'react-icons/fa'

export default function Banner3() {
  return (
    <div className=' bg-gradient-to-b from-zinc-900 to-black'>
        <div className=' flex justify-center items-center'>
            <div>
                <Image alt='1' src={'/Screenshot 2024-06-06 190553-portrait.png'} height={300} width={300}/>
            </div>
            <div className=' ml-24'>
                <h1 className=' font-semibold text-4xl flex'>Test Your 
                    <span className=' flex text-purple-700 mx-2'>
                        Faith
                        <FaCross/>
                    </span>
                </h1>
                <h1 className=' text-4xl mt-3 font-semibold'>Grow Your Knowledge</h1>
            </div>
        </div>
    </div>
  )
}

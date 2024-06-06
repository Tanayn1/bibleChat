import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <div className=' bg-gradient-to-b from-black to-zinc-900'>
        <div className=' flex justify-between items-center py-16'>
            <div className=' p-4'>
                <Image alt='' src={'/v2_white_with_transparent_background (1).png'} height={200} width={200}/>
            </div>
            <div>
                <h1 className=' text-sm text-gray-300'>© Copyright 2024, All Rights Reserved by Precision Labs</h1>
            </div>
            <div className=' pr-14'>
                <h1 className=' text-xs text-gray-300'>Contact:</h1>
                <h1 className=' mt-2'>ceo@holyharmony.com</h1>
                <div></div>
            </div>
        </div>
    </div>
  )
}

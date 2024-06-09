import Image from 'next/image'
import React from 'react'

export default function Banner2() {
  return (
    <div className='bg-gradient-to-b from-black to-zinc-900 pb-20'>
        <div className=' flex justify-center items-center mobile:flex-col'>
            <div className=' mr-24 flex flex-col items-center mobile:mr-0 mobile:my-4'>
                <h1 className=' text-4xl font-semibold '>Enjoy A Personilzed</h1>
                <h1 className=' text-4xl font-semibold'>Spiritual Journey</h1>
                <h1 className=' text-4xl text-center font-semibold'><span className=' mx-2 text-purple-700 font-bold'>Catered</span> To You</h1>
                <a href=""></a>
            </div>
            <div>
                <Image alt='' src={'/Screenshot 2024-06-06 190112-portrait.png'} height={300} width={300} />
            </div>
        </div>
    </div>
  )
}

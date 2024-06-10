'use client'
import WordRotate from '@/components/magicui/wordRotate'
import Image from 'next/image'
import React, { useState } from 'react'
import TypingAnimation from '../magicui/typingAnimation'
import FiveStars from '../fivestars'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { signUpWithGoogle } from '@/app/auth/actions'

export default function Hero() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleGoogle = async () => {
        setIsLoading(true);
        await signUpWithGoogle();
        setIsLoading(false)
    }  
  return (
<div className=' relative py-40 '>
    <div className='flex flex-col  justify-center items-center' >
            <div className=' flex flex-col items-center m-10'>
                <h1 className=' text-4xl text-center font-semibold'>Strengthen Your Faith</h1>
                <h1 className=' text-3xl text-center font-semibold flex items-center '>One<span className='text-4xl text-purple-700 mx-2'><TypingAnimation text='Conversation' /></span>at a Time</h1>
                <h1 className=' text-sm text-gray-300 my-3'>#1 App For Bible Study</h1>
                <FiveStars />
                    <div className='flex flex-col items-center mt-4'>
                        <div className=' flex mobile:flex-col'>
                            <Link href={'/auth/signup'}>
                                <button className='btn bg-purple-700 hover:bg-purple-800 border-purple-700 btn-wide '>Get Started Today!</button>
                            </Link>
                            <button disabled={isLoading} onClick={handleGoogle} className=' btn btn-wide ml-3 mobile:ml-0 mobile:my-3'> <FcGoogle className=' h-6 w-6'/>Sign In With Google</button>  
                        </div>
                    </div>
            </div>
        <div className=' rounded-xl fade-mask-bottom mobile:w-[300px] mb-24'>
            <Image className=' rounded-xl opacity-50' alt='' src={'/holyharmonybackgroundimage.png'} height={800} width={800}/>
            <div className=' absolute top-0 mt-36 mobile:mt-7 left-0 right-0 flex flex-col items-center z-10'>
                    <h1 className=' font-serif text-md  mobile:text-xs w-[400px] mobile:w-[200px] text-center'>&quot;Search for them as you would for silver; seek them like hidden treasures. Then you will understand what it means to fear the Lord, and you will gain knowledge of God.&quot;</h1>
                    <h1 className=' font-semibold text-xl my-3 w-[400px] text-center'>Proverbs 2:4-5</h1>
            </div>
        </div>
        </div>
    <div>

    </div>
    <Image className='-z-50' alt='' src={'/bg2.png'} fill/>
</div>
  )
}

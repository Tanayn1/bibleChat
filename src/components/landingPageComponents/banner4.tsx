import React from 'react'
import ShineBorder from '../magicui/shine-border'
import { FaCross } from 'react-icons/fa6'
import Link from 'next/link'

export default function Banner4() {
  return (
    <div className=' my-24'>
        <div className=' flex flex-col justify-center items-center mx-20'>
            <ShineBorder color={['#6B21A8']} className=' relative'>
                <div className=' m-7 mobile:top-0  '>
                    <h1 className=' text-4xl font-semibold text-center'>Help Us Reach <span className=' text-5xl text-purple-700'>Millions</span> Of Christians Worldwide</h1>
                    <p className=' text-center text-sm mt-5 text-gray-300 '>Support Christianity and help us spread the faith by using Holy Harmony. Our app empowers you to engage deeply with the Bible, enhancing your spiritual journey. By sharing and using Holy Harmony, you play a vital role in bringing the teachings of Christ to others, fostering a global community rooted in love, faith, and understanding. Join us in this mission to spread the light of Christianity, one conversation at a time.</p>
                    <div className=' flex justify-center mt-5'>
                        <Link href={'/auth/signup'}>
                            <button className=' btn bg-purple-700 hover:bg-purple-700'>Get Started Today<FaCross/></button>
                        </Link>
                    </div>
                </div>
            </ShineBorder>
        </div>
    </div>
  )
}

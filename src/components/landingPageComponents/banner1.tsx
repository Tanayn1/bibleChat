import React from 'react'
import { BiBible } from 'react-icons/bi'
import ShineBorder from '../magicui/shine-border'
import { FaPencil } from 'react-icons/fa6'
import { FaQuestionCircle } from 'react-icons/fa'

export default function Banner1() {
  return (
    <div className=' mb-24'>
        <div className=' flex justify-center items-center mobile:flex-col sm:flex-col '>
            <div className=' flex flex-col items-center'>
                <BiBible className=' h-24 w-24'/>
                <p className=' w-[400px] text-xs text-center text-gray-300 mt-2'>Deepen your connection with the Lord by engaging directly with the Holy Scriptures. Ask questions about faith, life, and spirituality, and receive guidance rooted in the wisdom of the Bible. Holy Harmony provides instant access to divine insights. Discover the transformative power of scripture and strengthen your relationship with the Lord, one conversation at a time</p>
            </div>
            <ShineBorder color={['#6B21A8']} className=' m-4'>
                <div className=' flex flex-col items-center m-5'>
                    <FaQuestionCircle className=' h-24 w-24'/>
                    <p className=' w-[400px] text-sm text-center text-gray-300 mt-2'>Deepen your connection with the Lord by engaging directly with the Holy Scriptures. Ask questions about faith, life, and spirituality, and receive guidance rooted in the wisdom of the Bible. Holy Harmony provides instant access to divine insights. Discover the transformative power of scripture and strengthen your relationship with the Lord, one conversation at a time</p>
                </div>
            </ShineBorder>
            <div className=' flex flex-col items-center'>
                <FaPencil className=' h-24 w-24'/>
                <p className=' w-[400px] text-xs text-center text-gray-300 mt-4'>Deepen your connection with the Lord by engaging directly with the Holy Scriptures. Ask questions about faith, life, and spirituality, and receive guidance rooted in the wisdom of the Bible. Holy Harmony provides instant access to divine insights. Discover the transformative power of scripture and strengthen your relationship with the Lord, one conversation at a time</p>
            </div>
        </div>
    </div>
  )
}

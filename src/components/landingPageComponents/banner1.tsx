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
                <p className=' w-[400px] text-xs text-center text-gray-300 mt-2'>Personalized Biblical Guidance: Ask questions and receive insightful answers directly from the Holy Scriptures.</p>
            </div>
            <ShineBorder color={['#6B21A8']} className=' m-4 relative mobile:hidden'>
                <div className=' flex flex-col items-center m-5 '>
                    <FaQuestionCircle className=' h-24 w-24'/>
                    <p className=' w-[400px] text-sm text-center text-gray-300 mt-2'>Daily Inspiration: Enjoy daily Bible readings and reflections to inspire your day.</p>
                </div>
            </ShineBorder>
            <div className=' flex flex-col items-center m-5 sm:hidden md:hidden lg:hidden border-2 border-purple-700 rounded-2xl '>
                  <div className=' m-4 flex flex-col items-center '>
                    <FaQuestionCircle className=' h-24 w-24'/>
                    <p className=' w-[400px] text-sm text-center text-gray-300 mt-2'>Daily Inspiration: Enjoy daily Bible readings and reflections to inspire your day.</p>
                  </div>
            </div>
            <div className=' flex flex-col items-center'>
                <FaPencil className=' h-24 w-24'/>
                <p className=' w-[400px] text-xs text-center text-gray-300 mt-4'>Interactive Bible: Bring the Bible along with you anywhere you go. Highlight verses, take personal notes, and access them anytime, making your study more engaging and convenient.</p>
            </div>
        </div>
    </div>
  )
}

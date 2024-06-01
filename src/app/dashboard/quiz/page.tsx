import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div>
        <div className=' flex mt-32'>
            <div className=' bg-zinc-950 rounded-2xl w-[300px] m-6'>
                <div className=' m-8 flex flex-col'>
                    <h1 className=' text-xl font-semibold'>Quiz Me</h1>
                    <p className=' text-xs mt-2'>Test your knowlege of the Bible by taking a short quiz</p>
                    <Link href={'/dashboard/quiz/singleChoiceQuiz'}>
                        <button className=' btn mt-6 w-full'>Start!</button>
                    </Link>
                </div>
            </div>
        </div>

    </div>
  )
}

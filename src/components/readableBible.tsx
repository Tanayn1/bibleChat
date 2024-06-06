'use client'
import React, { useState } from 'react'
import SelectBook from './selectBook'
import SelectChapter from './selectChapter'
import bible from '../../src/data/en_bbe.json'
const bibleArray = bible as any

export default function ReadableBible() {
    const [book, setBook] = useState<number>(0)
    const [chapter, setChapter] = useState<number>(0)

  return (
    <div className=' w-[400px] mobile:w-[360px]'>
        <div className=' flex mt-24 mobile:mt-6'>
            <SelectBook setBookIndex={(value : number)=>{setBook(value)}}/>
            <SelectChapter setChapter={(value : number)=>{setChapter(value)}} bookIndex={book}/>
        </div>
        <div className=' overflow-auto lg:h-[650px] md:h-[500px] sm:h-[500px] mobile:h-[450px] mb-20 no-scrollbar'>
        <h1 className='text-center my-5 text-3xl font-semibold'>{`${bibleArray[book].name} ${Number(chapter) + 1}`}</h1>
            {bibleArray[book].chapters[chapter].map((line : string, index : number)=>{
                return (
                        <div key={index} className=' flex my-2'>
                            <h1 className=' mr-1 text-xs text-gray-300'>{index + 1}</h1>
                            <h1>{line}</h1>
                        </div>
                        )
            })}
        </div>
    </div>
  )
}

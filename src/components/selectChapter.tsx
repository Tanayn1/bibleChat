import React from 'react'
import bible from '../../src/data/en_bbe.json'
const bibleArray = bible as any

export default function SelectChapter({setChapter, bookIndex} : 
    {setChapter : Function, bookIndex : number}) {

  return (
    <div>
        <select onChange={(e)=>{setChapter(e.target.value)}} className="select w-full max-w-xs">
            {bibleArray[bookIndex].chapters.map((chapter : any, index : number)=>{
                return <option key={index} value={index}>Chapter {index + 1}</option>
            })}
        </select>
    </div>
  )
}

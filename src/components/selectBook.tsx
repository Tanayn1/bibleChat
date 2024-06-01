import React, { useState } from 'react'
import bible from '../../src/data/en_bbe.json'
const bibleArray = bible as any

export default function SelectBook({setBookIndex} : {setBookIndex : Function}) {
  return (
    <div>
        <select onChange={(e)=>{setBookIndex(e.target.value)}} className="select w-full max-w-xs">
            {bibleArray.map((book : any, index : number)=>{
                return <option key={index} value={index}>{book.name}</option>
            })}
        </select>
    </div>
  )
}

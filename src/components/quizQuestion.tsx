'use client'
import React, { useEffect, useState } from 'react'

export default function QuizQuestion({question, choiceA, 
  choiceB, choiceC, choiceD, correct, setCorrect, setAnswer} : {question : string, choiceA : string, 
    choiceB : string, choiceC : string, choiceD : string, correct : string, setCorrect : Function, 
    setAnswer : Function}) {
      const [isCorrect, setIsCorrect] = useState<null | boolean>(null)
      const handleClick = (choice : string)=>{
        if (correct === choice) {
            setAnswer({
              choice: choice,
              isCorrect: true
            })
            setIsCorrect(true)
            setCorrect(1);
        } else {
          setIsCorrect(false)
            setCorrect(0);
            setAnswer({
              choice: choice,
              isCorrect: false
            })
     
        }
      }
 

  if (question) {return (
    <div>
      <div>
        <h1 className=' my-5 text-xl font-semibold'>{question}</h1>
        <div className=' flex flex-col items-center'>
          <div onClick={()=>{handleClick(choiceA)}} className='cursor-pointer my-1  bg-zinc-950 w-[300px] rounded-xl border border-zinc-900 transform transition-transform duration-300 hover:scale-105'>
            <h1 className=' p-7 text-lg text-center'>A. {choiceA}</h1>
          </div>
          <div onClick={()=>{handleClick(choiceB)}} className=' cursor-pointer my-1  bg-zinc-950 w-[300px] rounded-xl border border-zinc-900 transform transition-transform duration-300 hover:scale-105'>
            <h1 className=' p-7 text-lg text-center'>B. {choiceB}</h1>
          </div>
          <div onClick={()=>{handleClick(choiceC)}} className=' cursor-pointer my-1 bg-zinc-950 w-[300px] rounded-xl border border-zinc-900 transform transition-transform duration-300 hover:scale-105'>
            <h1 className=' p-7 text-lg text-center'>C. {choiceC}</h1>
          </div>
          <div onClick={()=>{handleClick(choiceD)}} className=' cursor-pointer my-1  bg-zinc-950 w-[300px] rounded-xl border border-zinc-900 transform transition-transform duration-300 hover:scale-105'>
            <h1 className=' p-7 text-lg text-center'>D. {choiceD}</h1> 
          </div>
        </div>
      </div>
    </div>
  )} else {return (
    <div>
        <div>
          <div className=' skeleton w-6 h-3'></div>
        </div>
    </div>
  )}
}

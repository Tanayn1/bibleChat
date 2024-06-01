import React from 'react'

export default function QuestionTracker({questions, currentQuestion} : 
    {questions : Array<any>, currentQuestion : number}) {
    const translateValue = -currentQuestion * 200; // Adjust 60px based on your needs, e.g., width + margin of each item

  return (
    <div className=' flex overflow-hidden w-[500px] '>
    <div
        className='flex transition-transform duration-500 ease-in-out'
        style={{ transform: `translateX(${translateValue}px)` }}
      >
        {questions.map((value, index)=>{
            return (
            <div key={index} className=' flex items-center'>
                 <div className={`${value === true ? 'bg-white' : 'bg-zinc-900'} w-[35px] h-[35px] rounded-full flex justify-center items-center transition duration-500 ease-in-out transform`}>
                    <h1 className={`${value === true ? 'text-black' : 'text-white'} font-bold`}>{index + 1}</h1>
                </div>
                {index === questions.length - 1 ? '' :  <div  className={` flex items-center w-[200px] h-2 ${value === true ? 'bg-white' : 'bg-zinc-900 '} rounded-xl mx-2 transition duration-500 ease-in-out transform`}></div>}
                
            </div>
            )
        })}
        </div>
    </div>
  )
}

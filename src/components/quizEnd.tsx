'use client'
import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { TiTick } from 'react-icons/ti'
import { createClient } from '../../utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function QuizEnd({ score, questions, answers } : 
    { score: number, questions : any, answers : Array<any> }) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleUploadResults = async ()=>{
    setIsLoading(true)
    const array : Array<any> = [];
    questions.forEach((question : any, index : number)=>{
        array.push({
            question: question.question,
            correctAnswer: question.correctAnswer,
            choice: answers[index].choice
        });
    })
    const {data, error} = await supabase.from('userScores').insert({
        score: score,
        questions: array,
    });

    if (error) {
        console.log(error)
        setIsLoading(false)
        return;
    };
    router.push('/dashboard/quiz')
  }
  return (
    <div className=' flex justify-center bg-zinc-950 rounded-2xl mt-9 '>
        <div className=' m-7 '>
            <h1 className=' text-3xl font-bold'>Score: {score}/7</h1>
            <div className=' m-3 h-[300px] overflow-auto no-scrollbar'>
                {questions.map((question : any, index : number)=>{
                    return (
                    <div key={index} className='   m-2 my-5  '>
                        <h1 className=' text-gray-300 text-sm'>{question.question}</h1>
                        <div className=' mx-4 flex items-center justify-between my-2'>
                            <h1 className=' text-gray-300 text-xs'>Correct: {question.correctAnswer}</h1>
                            <div className=' flex items-center'>
                                <h1 className=' text-gray-300 text-xs'>You Answered: {answers[index].choice}</h1>
                                {answers[index].isCorrect === true ? <TiTick className=' mx-1 h-6 w-6'/> : <ImCross className=' mx-2'/>}
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <button disabled={isLoading} onClick={handleUploadResults} className=' btn w-full my-3'>Continue</button>
        </div>
    </div>
  )
}

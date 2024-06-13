'use client'
import React, { useEffect, useState } from 'react'
import QuestionTracker from './questionTracker'
import { createClient } from '../../utils/supabase/client';
import QuizQuestion from './quizQuestion';
import { DiVim } from 'react-icons/di';
import QuizEnd from './quizEnd';

export default function SingleChoiceQuiz({ diff } : {diff : string}) {
const supabase = createClient();
const [questions, setQuestions] = useState<null | Array<any>>(null);
const [currentQuestion, setCurrentQuestion] = useState<any>(null);
const [questionAnswerState, setQuestionsAnswerState] = useState<Array<any>>([null, null, null, null, null, null, null]);
const [score, setScore] = useState<number>(0);
const [quizOver, setQuizOver] = useState(false);
const [answers, setAnswers] = useState<Array<any>>([])
const fetchQuestions = async ()=>{
try {
  let { data: questions, error, count } = await supabase
  .from(diff) //update this to diff
  .select('*', { count: 'exact' });

console.log(questions)
if (error) throw error;
if (questions) {
const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
const selectedQuestions = shuffledQuestions.slice(0, 7);
  const array : any = [];
  selectedQuestions?.forEach((question : any, index : number)=>{
    array.push({
      question: question.question,
      choiceA: question.choiceA,
      choiceB: question.choiceB,
      choiceC: question.choiceC,
      choiceD: question.choiceD,
      correctAnswer: question.correctAnswer,
      questionNumber: index
    })});
    console.log(array)
    setQuestions(array)
    setCurrentQuestion(array[0])
  }
    
} catch (error) {
  console.log(error)
}

  };

  useEffect(()=>{
    fetchQuestions();
  },[]);
  const updateAnswer = (value : any)=>{
    const array = [...answers, value];
    setAnswers(array)
  }
  const handleQuestionChange = (value : number)=>{
    if (questions) {
    if (currentQuestion.questionNumber === 6) {
      setScore(score + value);
      setQuizOver(true)
      return;
    }
    console.log(currentQuestion.questionNumber)
    setScore(score + value);
    setCurrentQuestion(questions[currentQuestion.questionNumber + 1]);
    const newState = [...questionAnswerState];
    console.log(newState)
    newState[currentQuestion.questionNumber] = true
    setQuestionsAnswerState(newState)
  
    }
  }

 if (questions) {return (
    <div className='flex h-screen justify-center items-center mobile:mb-20  '>
      <div className="flex flex-col justify-center items-center w-[500px]  overflow-hidden">
        <QuestionTracker questions={questionAnswerState} currentQuestion={currentQuestion.questionNumber}/>
        {currentQuestion && quizOver === false ? <QuizQuestion question={currentQuestion.question} 
        choiceA={currentQuestion.choiceA} choiceB={currentQuestion.choiceB} 
        choiceC={currentQuestion.choiceC} choiceD={currentQuestion.choiceD} 
        correct={currentQuestion.correctAnswer} setAnswer={(value : any)=>{updateAnswer(value)}} setCorrect={(value : number)=>{handleQuestionChange(value)}}/> : 
        <QuizEnd diff={diff} score={score} questions={questions} answers={answers}/> }
      </div>
    </div>
  )} 
  else {
    return (
      <div className=' flex h-screen justify-center items-center '>
        <div className=' flex flex-col items-center'>
          <div className=' skeleton w-[700px] h-4'></div>
          <div className=' skeleton w-[300px] h-[80px] mt-7 mb-2'></div>
          <div className=' skeleton w-[300px] h-[80px] my-2'></div>
          <div className=' skeleton w-[300px] h-[80px] my-2'></div>
          <div className=' skeleton w-[300px] h-[80px] my-2'></div>
        </div>
      </div>
    )
  }
}

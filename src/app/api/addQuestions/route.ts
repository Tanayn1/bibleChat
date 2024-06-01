import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server"
import questions from '../../../data/questions.json'
const questionsArray = questions as any

export async function GET(req : Request, res : Response) {
    const supabase = createClient();
    try {
        for (const [index, question] of questionsArray.entries()) {
            const {data, error} = await supabase
            .from('singleChoiceQuestions')
            .insert({
                question: question.question,
                choiceA: question.choices[0],
                choiceB: question.choices[1],
                choiceC: question.choices[2],
                choiceD: question.choices[3],
                correctAnswer: question.correctAnswer
            })
        }
        return NextResponse.json('Success')
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}
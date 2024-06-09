import { NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { NextResponse } from "next/server";
import bible from '../../../../../src/data/en_bbe.json'
import { createClient } from "../../../../../utils/supabase/server";

const filePath = '../../../../src/data/en_bbe.json'
const bibleArray = bible as any


export async function GET(req: Request) {
const client = createClient();
 try {

   const embeddings = new OpenAIEmbeddings({
       apiKey: process.env.OPEN_AI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
       batchSize: 512, // Default value if omitted is 512. Max is 2048
       model: "text-embedding-3-small",
     });
  
   
   for (const [bookIndex, book] of bibleArray.entries()) {
      const bookName = book.name
      const chapters = book.chapters
      console.log(bookName)
      if (bookName === 'Revelation') {
        for (const [indexChapter, chapter] of chapters.entries()) {
                    for (const [indexLine, line] of chapter.entries()){
                       try {
        
                          console.log(`Embedding: ${line}, ${bookName} ${indexChapter + 1}:${indexLine + 1}`)
                          await SupabaseVectorStore.fromTexts(
                             [`${line}, ${bookName} ${indexChapter + 1}:${indexLine + 1}`],
                             {bookName: bookName, chapter: indexChapter + 1, line: indexLine + 1},
                             embeddings,
                             {
                               client,
                               tableName: 'documents',
                             }
                           );
        
        
                       } catch (error) {
                          console.log(error)
                          return NextResponse.json(error)
                       }
        
                    }
                  }
      }
//       for (const [indexChapter, chapter] of chapters.entries()) {
//         for (const [indexLine, line] of chapter.entries()){
//            try {
//
//               console.log(`Embedding: ${line}, ${bookName} ${indexChapter + 1}:${indexLine + 1}`)
//               await SupabaseVectorStore.fromTexts(
//                  [`${line}, ${bookName} ${indexChapter + 1}:${indexLine + 1}`],
//                  {bookName: bookName, chapter: indexChapter + 1, line: indexLine + 1},
//                  embeddings,
//                  {
//                    client,
//                    tableName: 'documents',
//                  }
//                );
//
//
//            } catch (error) {
//               console.log(error)
//               return NextResponse.json(error)
//            }
//
//         }
//       }
   };
    return NextResponse.json('Success')
 } catch (error) {
    console.log(error)
    return NextResponse.json(error)
 }   
}



 
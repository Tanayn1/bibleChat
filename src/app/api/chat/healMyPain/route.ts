import {
    Message as VercelChatMessage,
    StreamingTextResponse,
    createStreamDataTransformer
} from 'ai';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { HttpResponseOutputParser } from 'langchain/output_parsers';

import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables'
import { formatDocumentsAsString } from 'langchain/util/document';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { NextResponse } from 'next/server';
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createClient } from '../../../../../utils/supabase/server';



export const dynamic = 'force-dynamic'

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const condenseQuestionTemplate = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;
const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(
  condenseQuestionTemplate
);

const TEMPLATE = `Answer the user's questions based on the bible verse that is provided, 
state the bible passage and explain it whilist answering the users question as well as 
keeping answers very concise and straight to the point:
==============================
Bible passage: {context}
==============================

user: {question}
assistant:`;



export async function POST(req: Request) {
    const client = createClient()
    try {
        // Extract the `messages` from the body of the request
        const { messages } = await req.json();
        const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
        const currentMessageContent = messages[messages.length - 1].content;
        const embeddings = new OpenAIEmbeddings({ 
        apiKey: process.env.OPEN_AI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
        batchSize: 512, // Default value if omitted is 512. Max is 2048
        model: "text-embedding-3-small",
      })
        const vectorStore = new SupabaseVectorStore(embeddings, {
            client,
            tableName: 'documents', 
            queryName: 'match_documents'
        })
        const retriever= vectorStore.asRetriever()
        const prompt = PromptTemplate.fromTemplate(TEMPLATE);
        const model = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY!,
            model: 'gpt-4o',
            temperature: 0,
            streaming: true,
            verbose: true,
        });

        /**
       * Chat models stream message chunks rather than bytes, so this
       * output parser handles serialization and encoding.
       */
        const parser = new HttpResponseOutputParser();
        type ConversationalRetrievalQAChainInput = {
            question: string;
            chat_history: [string, string][];
          };

          const standaloneQuestionChain = RunnableSequence.from([
            {
              question: (input: any) => input.question,
              chat_history: (input: any) => input.chat_history
                 
            },
            CONDENSE_QUESTION_PROMPT,
            model,
            new StringOutputParser(),
          ]);

          const answerChain = RunnableSequence.from([
            {
              context: retriever.pipe(formatDocumentsAsString),
              question: new RunnablePassthrough(),

            },
            prompt,
            model,
            parser
          ]);
          
        const chain = standaloneQuestionChain.pipe(answerChain)
        console.log(currentMessageContent)

      // Convert the response into a friendly text-stream

        const stream = await chain.stream({
            chat_history: formattedPreviousMessages.join('\n'),
            question: currentMessageContent,
        });

        // Respond with the stream
        return new StreamingTextResponse(
            stream.pipeThrough(createStreamDataTransformer()),
        );
    } catch (e: any) {
        console.log(e)
        return Response.json({ error: e.message }, { status: e.status ?? 500 });
    }
}
// import { auth } from '@clerk/nextjs';
// import { NextResponse } from 'next/server';
// import {OpenAI} from 'openai';

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// export async function POST (
//     req: Request,
// ) {
//     try{
//         const {userId} = auth();
//         const body = await req.json();
//         const {messages } = body;

//         if(!userId) return new NextResponse("Unauthorized", {status: 401});

//         if (!openai.apiKey) return new NextResponse("OpenAI API Key not configured", {status: 500});

//         if (!messages) return new NextResponse("No messages provided", {status: 400});

//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages,
//           });

//         return NextResponse.json(response.choices[0].message)
        
//     } catch (error) {
//         console.log(error)
//         return new NextResponse("Internal Server Error", {status: 500})
//     }
// }

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request, {params} : {params: {personality: string}}) {
  const { prompt } = await req.json();
  const {personality} = params;

  if(!personality) return new NextResponse("Personality not provided", {status: 400});
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    stream: true,
    max_tokens: 3000,
    prompt: `You are an imaginative journal writer named [John]. You have a ${personality} personality. I will provide you with a list of prompts. Please write a journal entry containing a maximum of 200 words based on the prompts while adopting your assigned personality. Do not include this instruction text in your response.

    Prompts:
    ${prompt}
    
    Response:`,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
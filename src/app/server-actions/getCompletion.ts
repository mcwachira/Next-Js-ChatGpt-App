"use server"
import OpenAI  from "openai";
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENAI_API_KEY,
})


export async function getCompletion(
    messageHistory:{
        role:"user" | "assistant";
        content:string;
    }[]
){

    const response = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: messageHistory,
    });
    console.log(response);

    const messages = [
        ...messageHistory,
        response.choices[0].message as unknown as {
            role: "user" | "assistant";
            content: string;
        },
    ];

    console.log( response.choices[0].message);
    return { messages };
}
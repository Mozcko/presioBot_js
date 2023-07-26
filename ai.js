import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const config = new Configuration({
    apiKey: process.env.AI_TOKEN,
    organization: process.env.AI_ORGANIZATION
});

const openai = new OpenAIApi(config);

export async function ask(prompt) {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user", content: prompt
        }],
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    const answer = response.data.choices[0].message.content;
    return answer;
}


import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1", // Ye line Groq se connect karti hai
});

export default ai;
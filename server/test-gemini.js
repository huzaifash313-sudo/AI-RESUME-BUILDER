import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const test = async () => {
    try {
        console.log("Testing Key:", process.env.OPENAI_API_KEY ? "Found" : "NOT FOUND");
        const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);
        
        // Dashboard ke mutabiq 2.5 try karte hain
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
        
        const result = await model.generateContent("Hello, are you working?");
        console.log("Response:", result.response.text());
        console.log("✅ API KEY IS WORKING PERFECTLY!");
    } catch (err) {
        console.error("❌ API KEY FAILED!");
        console.error("Error Detail:", err.message);
    }
};

test();
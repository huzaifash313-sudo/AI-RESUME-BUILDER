import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ai from "../configs/ai.js";

export const enhanceProfessionalSummary = asyncHandler(async (req, res) => {
    const { userContent } = req.body;
    if (!userContent) throw new ApiError(400, "Content missing");

    try {
        console.log("Nexo AI: Calling Groq (Free Tier)...");

        const completion = await ai.chat.completions.create({
            model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: `You are a professional resume writer. 
Rewrite the user's input into a sharp, modern professional summary.
- Max 2-3 sentences.
- No "Job Title" headers, no "Key Responsibilities" list.
- Just one single paragraph of text.
- Return ONLY the final summary text and nothing else.` 
                },
                { role: "user", content: userContent },
            ],
        });

        const enhancedContent = completion.choices[0].message.content;

        console.log("✅ Nexo AI: Groq Response Success!");
        return res.status(200).json(new ApiResponse(200, { enhancedContent }));
    } catch (error) {
        console.error("GROQ CRITICAL ERROR:", error.message);
        throw new ApiError(500, `AI Error: ${error.message}`);
    }
});

// For Job Description
export const enhanceJobDescription = asyncHandler(async (req, res) => {
    const { userContent } = req.body;
    try {
        const completion = await ai.chat.completions.create({
            model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: `Enhance this job description: ${userContent}` }],
        });
        return res.status(200).json(new ApiResponse(200, { enhancedContent: completion.choices[0].message.content }));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ai from "../configs/ai.js";

// Professional Summary Enhance logic
export const enhanceProfessionalSummary = asyncHandler(async (req, res) => {
    const { userContent } = req.body;
    if (!userContent) throw new ApiError(400, "Content missing");

    try {
        console.log("Nexo AI: Enhancing Summary...");

        const completion = await ai.chat.completions.create({
            model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: `You are an expert resume writer. 
                    Rewrite the input into a professional resume summary.
                    - STRICTLY 2-3 sentences only.
                    - No headers, no lists, no bullet points.
                    - Just one single paragraph.
                    - Return ONLY the final summary text.` 
                },
                { role: "user", content: userContent },
            ],
            temperature: 0.5, // Temperature kam rakhi hai taake AI to-the-point rahe
        });

        const enhancedContent = completion.choices[0].message.content.trim();

        console.log("✅ Nexo AI: Summary Enhanced!");
        return res.status(200).json(new ApiResponse(200, { enhancedContent }));
    } catch (error) {
        console.error("GROQ ERROR:", error.message);
        throw new ApiError(500, `AI Error: ${error.message}`);
    }
});

// Job Description / Experience Enhance logic
export const enhanceJobDescription = asyncHandler(async (req, res) => {
    const { userContent } = req.body;
    if (!userContent) throw new ApiError(400, "Experience content missing");

    try {
        console.log("Nexo AI: Enhancing Job Description...");

        const completion = await ai.chat.completions.create({
            model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: `You are a professional resume writer. 
                    Rewrite the job description into clean, impactful bullet points.
                    - Maximum 3-4 bullet points.
                    - Start each bullet with an action verb (e.g., Developed, Managed, Led).
                    - Return ONLY the enhanced bullet points without any intro or outro.` 
                },
                { role: "user", content: userContent },
            ],
            temperature: 0.5,
        });

        const enhancedContent = completion.choices[0].message.content.trim();

        return res.status(200).json(new ApiResponse(200, { enhancedContent }));
    } catch (error) {
        throw new ApiError(500, `AI Error: ${error.message}`);
    }
});
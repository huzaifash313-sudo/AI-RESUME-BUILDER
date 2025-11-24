import Resume from "../models/Resume.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ai from "../configs/ai.js"

export const enhanceJobDescription = asyncHandler(async(req, res) => {
    const { userContent } = req.body;

    if(!userContent) {
        throw new ApiError(400, 'Missing required fields')
    }
    const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gemini-2.5-flash",
        messages: [
            {
                role: "system", content: "You are an expert resume writing. Your task is to enhance professional summarys of a resumes. The summary should be 1-2 sentences also highlighting key skills, experience, nd carreer objectivees. Make it compelling and ATS-friendly. and only return text no options or anything else."},
            {
                role: "user", content: userContent
            }
        ],
    });
    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json(
        new ApiResponse(200, { enhancedContent })
    )
});

export const enhanceProfessionalSummary = asyncHandler(async(req, res) => {
    const { userContent } = req.body;

    if(!userContent) {
        throw new ApiError(400, 'Missing required fields')
    }
    const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gemini-2.5-flash",
        messages: [
            {
                role: "system", content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and return text no options or anything else."},
            {
                role: "user", content: userContent
            }
        ],
    });
    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json(
        new ApiResponse(200, { enhancedContent })
    )
});


export const uploadResume = asyncHandler(async(req, res) => {
    
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if(!resumeText) {
        throw new ApiError(400, 'Missing required fields')
    }

    const systemPrompt = "You are an expert AI Agent to extract data from resume."

    const userPrompt = `extract data from this resume: ${resumeText} 
    Provide data in the following JSON format with no additional text before or after: 
    {
    professional_summary: {
        type: String,
        default: ''
    },
    skills: [{
        type: String,
    }],
    personal_info: {
        image: {
            type: String,
            default: ''
        },
        full_name: {
            type: String,
            default: ''
        },
        profession: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        website: {
            type: String,
            default: ''
        },
    },
    experience: [{
        institution: {
            type: String,
        },
        degree: {
            type: String,
        },
        field: {
            type: String,
        },
        graduation_date: {
            type: String,
        },
        gpa: {
            type: String,
        },
    }]}`;

    const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEl || "gemini-2.5-flash",
        messages: [
            {
                role: "system", content: systemPrompt},
            {
                role: "user", content: userPrompt
            }
        ],

        response_format: {
            type: "json_object",
        }
    });
    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({
        userId,
        title,
        ...parsedData,
    });
    res.json(new ApiResponse(200, { resumeId: newResume._id }, 'Resume parsed and created'));
});
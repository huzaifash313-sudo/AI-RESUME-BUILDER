import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createResume = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { title } = req.body;

  const newResume = await Resume.create({ 
    userId, 
    title: title || "Untitled Resume",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false
  });
  return res.status(201).json(
    new ApiResponse(201, { resume: newResume }, 'Resume created successfully')
  );
});

export const deleteResume = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { resumeId } = req.params;
  
  const deletedResume = await Resume.findOneAndDelete({ userId, _id: resumeId });
  
  if (!deletedResume) {
    throw new ApiError(404, "Resume not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, 'Resume deleted successfully')
  );
});

export const getResumeById = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { resumeId } = req.params;
  
  const resume = await Resume.findOne({ userId, _id: resumeId });
  
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }

  return res.status(200).json(
    new ApiResponse(200, { resume })
  );
});

export const getPublicResumeById = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findOne({ public: true, _id: resumeId });
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }
  return res.status(200).json(
    new ApiResponse(200, { resume })
  );
});

export const updateResume = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { resumeId } = req.params;
  const { resumeData, removeBackground } = req.body;
  const image = req.file;

  let resumeDataCopy;
  try {
    resumeDataCopy = typeof resumeData === 'string' ? JSON.parse(resumeData) : { ...resumeData };
  } catch (e) {
    throw new ApiError(400, "Invalid resume data format");
  }
  
  if (image) {
    try {
      // KHRABI FIX: Transformation options ko simplify kiya
      // removeBackground ko string check kiya kyunke FormData string bhejta hai
      const isBgRemoveTrue = removeBackground === 'true' || removeBackground === 'yes';
      
      const transformationOptions = `w-300,h-300,fo-face${isBgRemoveTrue ? ',e-bgremoved' : ''}`;

      const response = await imagekit.upload({
        file: image.buffer,
        fileName: `resume_${resumeId}.jpg`,
        folder: 'user-resumes',
        transformation: {
          pre: transformationOptions
        }
      });
      
      if (!resumeDataCopy.personal_info) resumeDataCopy.personal_info = {};
      resumeDataCopy.personal_info.image = response.url;
    } catch (imgError) {
      console.error("ImageKit Error (Transformation failed):", imgError.message);
      
      // FALLBACK: Agar transformation fail ho (e.g. BG remove feature active nahi), to simple upload karein
      const fallbackResponse = await imagekit.upload({
        file: image.buffer,
        fileName: `resume_${resumeId}_simple.jpg`,
        folder: 'user-resumes'
      });
      
      if (!resumeDataCopy.personal_info) resumeDataCopy.personal_info = {};
      resumeDataCopy.personal_info.image = fallbackResponse.url;
    }
  }

  const updateFields = { ...resumeDataCopy };
  delete updateFields._id;
  delete updateFields.userId;

  const resume = await Resume.findOneAndUpdate(
    { _id: resumeId, userId },
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!resume) {
    throw new ApiError(404, 'Resume not found or unauthorized');
  }

  return res.status(200).json(
    new ApiResponse(200, { resume }, 'Saved Successfully')
  );
});

export const uploadResume = asyncHandler(async (req, res) => {
  const userId = req.userId;
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const response = await imagekit.upload({
    file: req.file.buffer,
    fileName: req.file.originalname,
    folder: "user-resumes"
  });

  const newResume = await Resume.create({
    userId,
    title: req.file.originalname,
    personal_info: {
        image: response.url
    }
  });

  return res.status(200).json(
    new ApiResponse(200, { resume: newResume }, "Resume image uploaded successfully")
  );
});
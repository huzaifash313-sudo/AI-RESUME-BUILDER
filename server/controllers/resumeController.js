import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.model.js";
import fs from 'fs';
import { ApiError } from "../middlewares/authMiddleware.js"; // fixed import
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createResume = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { title } = req.body;

  const newResume = await Resume.create({ 
    userId, 
    title,
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
  await Resume.findOneAndDelete({ userId, _id: resumeId });
});

export const getResumeById = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { resumeId } = req.params;
  console.log('=== GET RESUME START ===');
  console.log('Getting resume for userId:', userId, 'resumeId:', resumeId);
  
  const resume = await Resume.findOne({ userId, _id: resumeId });
  console.log('Resume fetched:', resume);
  console.log('Experience in fetched resume:', resume?.experience);
  
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }
  resume.__v = undefined;
  resume.createdAt = undefined;
  resume.updatedAt = undefined;
  console.log('=== GET RESUME END ===');
  
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
  const { resumeId, resumeData, removeBackground } = req.body;
  const image = req.file;

  console.log('=== UPDATE RESUME START ===');
  console.log('resumeId:', resumeId);
  console.log('userId:', userId);
  console.log('resumeData received:', resumeData);
  
  let resumeDataCopy;
  if(typeof resumeData === 'string') {
    resumeDataCopy = JSON.parse(resumeData)
  }
  else {
    resumeDataCopy = JSON.parse(JSON.stringify(resumeData))
  }
  
  console.log('resumeDataCopy after parse:', resumeDataCopy);
  console.log('experience array:', resumeDataCopy.experience);
  
  if (image) {
    const imageBufferData = fs.createReadStream(image.path);
    const response = await imagekit.files.upload({
      file: imageBufferData,
      fileName: 'resume.jpg',
      folder: 'user-resumes',
      transformation: {
        pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? ',e-bgremoved' : '')
      }
    });
    if (!resumeDataCopy.personal_info) resumeDataCopy.personal_info = {};
    resumeDataCopy.personal_info.image = response.url;
  }

  // Get existing resume first and perform a safe $set update (avoid full overwrite)
  const existingResume = await Resume.findOne({ _id: resumeId, userId });
  if (!existingResume) {
    throw new ApiError(404, 'Resume not found');
  }

  // Prepare update fields: copy incoming data but never allow overriding system fields
  const updateFields = { ...resumeDataCopy };
  delete updateFields._id;
  delete updateFields.userId;
  delete updateFields.createdAt;
  delete updateFields.updatedAt;

  console.log('Update fields keys:', Object.keys(updateFields));
  console.log('Does update include experience?', Object.prototype.hasOwnProperty.call(updateFields, 'experience'));

  // Apply a $set update so arrays are replaced only when provided and other fields are preserved
  const resume = await Resume.findOneAndUpdate(
    { _id: resumeId, userId },
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  console.log('Resume after update (safe $set):', resume);
  console.log('Experience in saved resume:', resume?.experience);
  console.log('=== UPDATE RESUME END ===');

  return res.status(200).json(
    new ApiResponse(200, { resume }, 'Saved Successfully')
  );
});

// Export uploadResume for AI route
export const uploadResume = asyncHandler(async (req, res) => {
  const userId = req.userId;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageBufferData = fs.createReadStream(req.file.path);
  const response = await imagekit.files.upload({
    file: imageBufferData,
    fileName: req.file.originalname,
    folder: "user-resumes"
  });

  const newResume = await Resume.create({
    userId,
    title: req.file.originalname,
    fileUrl: response.url
  });

  return res.status(200).json(
    new ApiResponse(200, { resume: newResume }, "Resume uploaded successfully")
  );
});
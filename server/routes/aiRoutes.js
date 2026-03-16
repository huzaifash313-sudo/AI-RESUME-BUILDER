import express from "express";
import { enhanceJobDescription, enhanceProfessionalSummary } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js"; 
import { uploadResume } from "../controllers/resumeController.js";
import upload from "../configs/multer.js"; // kyunke file configs folder mein hai

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-description', protect, enhanceJobDescription);

aiRouter.post('/upload-resume', protect, upload.single('image'), uploadResume);

export default aiRouter;
import express from "express";
import { enhanceJobDescription, enhanceProfessionalSummary } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js"; 
import { uploadResume } from "../controllers/resumeController.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-description', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);

export default aiRouter;
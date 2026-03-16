import express from "express";
import protect from "../middlewares/authMiddleware.js"; // named import
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeController.js";
import upload from "../configs/multer.js";
import requestLogger from "../middlewares/requestLogger.js";

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);

// KHRABI FIX: Update route mein bhi :resumeId hona chahiye taake pata chale kis resume ko update karna hai
resumeRouter.put('/update/:resumeId', protect, upload.single('image'), requestLogger, updateResume); 

resumeRouter.delete('/delete/:resumeId', protect, deleteResume);

// KHRABI FIX: Route parameters (/:resumeId) use karna standard practice hai
resumeRouter.get('/get/:resumeId', protect, getResumeById); 

resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;
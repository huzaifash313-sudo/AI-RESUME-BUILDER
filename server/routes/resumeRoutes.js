import express from "express";
import protect  from "../middlewares/authMiddleware.js"; // named import
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeController.js";
import upload from "../configs/multer.js";
import requestLogger from "../middlewares/requestLogger.js";

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update', protect, upload.single('image'), requestLogger, updateResume); // protect before upload; requestLogger is temporary
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById); // fixed typo
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;

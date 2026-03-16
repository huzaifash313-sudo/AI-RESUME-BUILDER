import express from "express";
import cors from 'cors';
import "dotenv/config.js";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import {errorHandler} from "./middlewares/error.middleware.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://ai-resume-builder-theta-seven.vercel.app"
    ],
    credentials: true
}));

app.get('/', (req, res) => res.send('Server is live ...'));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database connection failed!", error.message);
        process.exit(1);
    }
};

startServer();
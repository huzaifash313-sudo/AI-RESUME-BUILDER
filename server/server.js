import express from "express";
import cors from 'cors';
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import {errorHandler} from "./middlewares/error.middleware.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Setup middleware
app.use(express.json());
app.use(cors());

// Define routes
app.get('/', (req, res) => res.send('Server is live ...'));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)
app.use(errorHandler);

// --- STARTUP FUNCTION ---
const startServer = async () => {
    // 1. Attempt to connect to the database
    try {
        await connectDB();
        console.log("Database connection successful.");
    } catch (error) {
        console.error("❌ Database connection failed! Server cannot run.", error.message);
        // If DB is mandatory, you might want to process.exit(1) here.
        // For now, we'll continue starting the server but log the error.
    }

    // 2. Start the Express server
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
        console.log(`URL: http://localhost:${PORT}`);
    });
};

startServer();
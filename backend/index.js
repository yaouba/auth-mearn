import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import authRoute from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {origin: process.env.FRONTEND_URL, credentials: true}
));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);

app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
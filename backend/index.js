import express from "express";
import connectDB from "./db/connectDB.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.listen(3000, async() => {
    await connectDB();
    console.log("Server is running on port 3000");
});
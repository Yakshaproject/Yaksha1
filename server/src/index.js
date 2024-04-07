import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to database")  
})  

const app = express();
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
}));

app.use("/auth", authRoutes)

app.listen(5004, () => {
    console.log("Server Port: 5004")
})      
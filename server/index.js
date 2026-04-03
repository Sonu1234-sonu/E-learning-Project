import express from 'express'
import dotenv from "dotenv";
import { connectDb } from './database/db.js';
import cors from 'cors';

import Razorpay from 'razorpay'
dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.Razorpay_key,
    key_secret: process.env.Razorpay_Secret,
});



const app = express();
//useing middleware

app.use(express.json());

app.use(cors());

const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send("server is working ");
})
//for upload folder 
app.use("/uploads", express.static("uploads"))

//importing routes

import userRouter from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';
//using routes

app.use("/api", userRouter);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})
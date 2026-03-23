import express from 'express'
import dotenv from "dotenv";
import { connectDb } from './database/db.js';
dotenv.config();



const app = express();
//useing middleware

app.use(express.json());
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send("server is working ");
})

//importing routes

import userRouter from './routes/user.js';

//using routes

app.use("/api", userRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})
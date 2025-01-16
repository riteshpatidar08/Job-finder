import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db/connect.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors'
import JobRoutes from './routes/jobRoutes.js';
dotenv.config();
dbConnect();

const app = express();
app.use(cors())
app.use(express.json())
//middlewares

//routes

app.use('/auth', userRouter);
app.use('/job' , JobRoutes)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on the ${process.env.PORT}`);
});

//redux setup complete

//Login Page => mantine prefer

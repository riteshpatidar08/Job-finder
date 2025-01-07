import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db/connect.js';
import userRouter from './routes/userRouter.js';
dotenv.config();
dbConnect();

const app = express();

app.use(express.json())
//middlewares

//routes

app.use('/auth', userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on the ${process.env.PORT}`);
});

//redux setup complete

//Login Page => mantine prefer

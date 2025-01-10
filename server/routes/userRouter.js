import { register } from '../controllers/userControllers.js';
import express from 'express';
import upload from './../middleware/upload.js'
const userRouter = express.Router();

userRouter.post('/register', upload.single('resume') ,register);

export default userRouter;







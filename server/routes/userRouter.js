import { register } from '../controllers/userControllers.js';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/register', register);

export default userRouter;

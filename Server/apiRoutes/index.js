import express from 'express';
export const router = express.Router();
import userRouter from './userRoutes.js'

router.use(userRouter);

export default router;
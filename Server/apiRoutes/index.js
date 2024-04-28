import express from 'express';
export const router = express.Router();
import userRouter from './userRoutes.js'
// import patientRouter from './patientRoutes.js';



router.use(userRouter);
// router.use(patientRouter)

export default router;
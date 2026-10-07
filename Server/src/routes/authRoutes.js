// MAPPING LAYER: authentication endpoints.

import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireFields } from '../middleware/requireFields.js';

export const createAuthRouter = (authService) => {
  const router = Router();

  router.post('/login', requireFields('username', 'password'), asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await authService.login(username, password);
    res.json({ message: 'Login successful', user });
  }));

  // `username` and `email_id` are the same value in this system; accept either.
  router.post('/signup', (req, res, next) => {
    req.body = { ...req.body, email_id: req.body?.email_id ?? req.body?.username };
    next();
  }, requireFields('email_id', 'password', 'security_ans1'), asyncHandler(async (req, res) => {
    const { email_id: email, password, security_ans1: securityAns1, security_ans2: securityAns2 } = req.body;
    const user = await authService.signup({ email, password, securityAns1, securityAns2 });
    res.status(201).json({ message: 'Signup successful', user });
  }));

  router.post('/reset-password', requireFields('username', 'ans1', 'newPassword'), asyncHandler(async (req, res) => {
    const { username, ans1, newPassword } = req.body;
    await authService.resetPassword(username, ans1, newPassword);
    res.json({ message: 'Password reset successful' });
  }));

  return router;
};

export default createAuthRouter;

// DATA ACCESS (client side): authentication calls to the API server.
import { postJson } from '../client';

export const loginUser = (username, password) =>
  postJson('/login', { username, password });

export const createAccount = ({ email, password, securityAns1 }) =>
  postJson('/signup', { username: email, email_id: email, password, security_ans1: securityAns1 });

export const resetPassword = (username, ans1, newPassword) =>
  postJson('/reset-password', { username, ans1, newPassword });

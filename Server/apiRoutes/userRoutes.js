// MAPPING LAYER

import express from 'express';
export const userRouter = express.Router();
import session from 'express-session';
import bcrypt from 'bcrypt'
import {db} from '../../DB/connection.js';
import { login_query, signup_query, forgotPassword_query } from './queries.js';

// Middleware for session management
userRouter.use(session({
  secret: 'your-secret-key', // Change this to a secret key
  resave: false,
  saveUninitialized: true,
}));

// Login route
userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const [rows] = await db.execute(login_query, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, rows[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Store user information in session
    req.session.user = rows[0];

    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Signup route
userRouter.post('/signup', async (req, res) => {
  const { username, password, role, email_id, security_ans1, security_ans2 } = req.body;

  try {
    // Hash the password before storing in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database using promise-based query
    await db.execute(signup_query,
      [username, hashedPassword, role, email_id, security_ans1, security_ans2]);

    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Password reset route
userRouter.post('/reset-password', async (req, res) => {
  const { username, ans1, newPassword } = req.body;

  try {
    // Hash the new password before updating in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database using promise-based query
    const updated = await db.execute(forgotPassword_query, [hashedPassword, username, ans1]);
    if(updated.affectedRows === 0){
      res.status(404);
    }
    else{
      res.json({ message: 'Password reset successful' });
    }
    
  } catch (error) {
    console.error('Error:', error);
    alert(error)
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default userRouter;

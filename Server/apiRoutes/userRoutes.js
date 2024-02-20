import express from 'express';
export const userRouter = express.Router();
import session from 'express-session';
import bcrypt from 'bcrypt'
import {db} from '../../DB/connection.js';

// Middleware for session management
userRouter.use(session({
  secret: 'your-secret-key', // Change this to a secret key
  resave: false,
  saveUninitialized: true,
}));

// Login route
// Login route
userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const [rows] = await db.execute('SELECT * FROM login_cred WHERE username = ?', [username]);

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
    await db.execute('INSERT INTO login_cred (username, password, role, email_id, security_ans1, security_ans2) VALUES (?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, role, email_id, security_ans1, security_ans2]);

    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Password reset route
userRouter.post('/reset-password', async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    // Hash the new password before updating in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database using promise-based query
    await db.execute('UPDATE login_cred SET password = ? WHERE username = ?', [hashedPassword, username]);

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default userRouter;

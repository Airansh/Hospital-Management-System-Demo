import express from 'express';
export const userRouter = express.Router();
import bcrypt from 'bcrypt'
import {db} from '../../DB/connection.js';

// Create a new user
userRouter.post('/users', async (req, res) => {
  const { username, password, role, email_id, security_ans1, security_ans2 } = req.body;
  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user data with hashed password
    const [results] = db.query(
      'INSERT INTO `login_cred` (username, password, role, email_id, security_ans1, security_ans2) VALUES (?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, role, email_id, security_ans1, security_ans2]
    );

    res.json({ message: 'User created successfully', userId: results.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
userRouter.get('/users', async (req, res) => {
  try {
    const [results] = db.query('SELECT * FROM `login_cred`');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific user by username
userRouter.get('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const [results] = db.query('SELECT * FROM `login_cred` WHERE username = ?', [username]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a user by username
userRouter.put('/users/:username', async (req, res) => {
  const { username } = req.params;
  const { password, role, email_id, security_ans1, security_ans2 } = req.body;
  try {
    const [results] = db.query(
      'UPDATE `login_cred` SET password = ?, role = ?, email_id = ?, security_ans1 = ?, security_ans2 = ? WHERE username = ?',
      [password, role, email_id, security_ans1, security_ans2, username]
    );
    if (results.affectedRows > 0) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user by username
userRouter.delete('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const [results] = db.query('DELETE FROM `login_cred` WHERE username = ?', [username]);
    if (results.affectedRows > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sign-in route
userRouter.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const [results] = db.query('SELECT * FROM `login_cred` WHERE username = ?', [username]);

    if (results.length === 0) {
      // User not found
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare hashed password with provided password
    const isMatch = await bcrypt.compare(password, results[0].password);

    if (isMatch) {
      // Sign-in successful
      res.json({ message: 'Sign-in successful', user: results[0] });
    } else {
      // Invalid password
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userRouter;

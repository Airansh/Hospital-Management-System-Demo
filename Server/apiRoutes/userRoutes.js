import express from 'express';
router = express.Router();
const db = require('../../DB/connection');

// Create a new user
router.post('/users', async (req, res) => {
  const { username, password, role, email_id, security_ans1, security_ans2 } = req.body;
  try {
    const [results] = await db.query(
      'INSERT INTO `login_cred` (username, password, role, email_id, security_ans1, security_ans2) VALUES (?, ?, ?, ?, ?, ?)',
      [username, password, role, email_id, security_ans1, security_ans2]
    );
    res.json({ message: 'User created successfully', userId: results.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM `login_cred`');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific user by username
router.get('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const [results] = await db.query('SELECT * FROM `login_cred` WHERE username = ?', [username]);
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
router.put('/users/:username', async (req, res) => {
  const { username } = req.params;
  const { password, role, email_id, security_ans1, security_ans2 } = req.body;
  try {
    const [results] = await db.query(
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
router.delete('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const [results] = await db.query('DELETE FROM `login_cred` WHERE username = ?', [username]);
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
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [results] = await db.query('SELECT * FROM `login_cred` WHERE username = ? AND password = ?', [username, password]);
    if (results.length > 0) {
      res.json({ message: 'Sign-in successful', user: results[0] });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

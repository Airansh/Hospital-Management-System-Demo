// CONNECTION LAYER
// HOSTING LAYER: host/credentials are read from the environment (see src/config).

import mysql from 'mysql2/promise';
import config from '../config/index.js';

// The pool connects lazily, so the API can start (and report its health)
// even when MySQL is not reachable yet.
export const db = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  queueLimit: 0,
});

export const pingDatabase = async () => {
  const connection = await db.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
};

export default db;

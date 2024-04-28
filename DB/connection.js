// CONNECTION LAYER

import mysql from 'mysql2/promise';

// Replace these with your actual credentials

// HOSTING LAYER: LOCALHOST
const host = 'localhost';
const user = 'root';
const password = '1515';
const database = 'softwarearchitecture';

export const db = mysql.createPool({
  host,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



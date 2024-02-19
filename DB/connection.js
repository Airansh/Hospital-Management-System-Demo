import mysql from 'mysql2';

// Replace these with your actual credentials
const host = 'localhost';
const user = 'root';
const password = '1515';
const database = 'softwarearchitecture';

export const db = mysql.createConnection({
  host,
  user,
  password,
  database,
});

console.log('Connected to user database');

const mysql = require('mysql2');
const createConnection = mysql.createConnection;
const db = createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'login_cred'
    },
    console.log('connected to user database')
)
export default db;
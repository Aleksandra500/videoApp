const mysql = require('mysql2');
const { createConnection } = require('mysql2/promise');
require('dotenv').config();

console.log('Korisnik iz .env:', process.env.DB_USER);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

db.connect(err => {
    if (err) {
        console.error('❌ Nije uspostavljena veza sa bazom:', err);
    } else {
        console.log('✅ Uspesno uspostavljena veza sa bazom 🚀');
    }
})

module.exports = db
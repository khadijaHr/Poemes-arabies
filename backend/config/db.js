const mysql = require('mysql2');
require('dotenv').config();

// Créer un pool de connexions pour de meilleures performances
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// Utiliser les promesses pour une syntaxe async/await
const promisePool = pool.promise();

// Tester la connexion
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données:', err.message);
    return;
  }
  console.log('✅ Connexion à la base de données réussie!');
  connection.release();
});

module.exports = promisePool;

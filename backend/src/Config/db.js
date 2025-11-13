// backend/src/Config/db.js
import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();
const pool = mariadb.createPool({
  host: process.env.DATABASEHOST,
  user: process.env.DATABASEUSER,
  password: process.env.DATABASEPASSWORD,
  database: process.env.DATABASENAME,
  port: process.env.DATABASEPORT || 3306,
  connectionLimit: 5,
  acquireTimeout: 60000,
  timeout: 60000,
  idleTimeout: 600000,
  minimumIdle: 1,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci',
});
(async () => {
  let conn;
  try {

    conn = await pool.getConnection();
    console.log('Conexión a MariaDB exitosa.');
  } catch (error) {
    console.error('Error al conectar a MariaDB:', error);
  } finally {
    if (conn) conn.release();
  }
})();


  export default pool;
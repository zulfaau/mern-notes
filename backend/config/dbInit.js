const mysql = require("mysql2/promise")
require("dotenv").config({})
const fs = require("fs/promises")

async function dbInit() {
    try {
        const connectionConfig = process.env.MYSQL_URL 
            ? {
                uri: process.env.MYSQL_URL,
                ssl: {
                    rejectUnauthorized: false
                }
              }
            : {
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_ROOT_PASSWORD,
                database: process.env.MYSQL_DB,
                port: process.env.MYSQL_PORT,
                ssl: process.env.MYSQL_HOST && process.env.MYSQL_HOST !== 'localhost' && process.env.MYSQL_HOST !== '127.0.0.1' 
                    ? { rejectUnauthorized: false } 
                    : undefined
              };
      // Buat koneksi ke MySQL
        const connection = await mysql.createConnection(connectionConfig);
    
        // Eksekusi SQL inisialisasi tabel secara langsung (inlined) untuk kompatibilitas Vercel
        const initSql = `
            CREATE TABLE IF NOT EXISTS notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                judul VARCHAR(255) NOT NULL,
                tanggal DATETIME NOT NULL,
                isi TEXT NOT NULL,
                tema VARCHAR(20) NOT NULL,
                pinned TINYINT(1) DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await connection.query(initSql);
        
        // Tambah kolom pinned jika tabel sudah ada sebelumnya tanpa kolom pinned
        try {
            await connection.query("ALTER TABLE notes ADD COLUMN pinned TINYINT(1) DEFAULT 0;");
            console.log('Kolom pinned berhasil ditambahkan ke tabel notes');
        } catch (err) {
            // Abaikan error 1060 (Duplicate column name) karena berarti kolom sudah ada
            if (err.errno !== 1060) {
                console.error('Error saat menambahkan kolom pinned:', err);
            }
        }

        console.log('Database and table created successfully');
    
        // Tutup koneksi
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}


module.exports = dbInit
  

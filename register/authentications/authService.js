const bcrypt = require('bcrypt');
const db = require('../db'); // Koneksi ke database

// Fungsi untuk registrasi user
const registerUser = async ({ name, email, password, gender, date_of_birth }) => {
    try {
        // Mengecek apakah email sudah terdaftar
        const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return { success: false, message: 'Email is already registered', code: 400 };
        }

        // Mengecek apakah username sudah terdaftar
        const [usernameRows] = await db.query('SELECT * FROM Users WHERE name = ?', [name]);
        if (usernameRows.length > 0) {
            return { success: false, message: 'Username is already taken', code: 400 };
        }

        // Hash password sebelum disimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Query untuk memasukkan data pengguna ke database
        const query = `
            INSERT INTO Users (name, email, password, gender, date_of_birth)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(query, [name, email, hashedPassword, gender, date_of_birth]);

        return { success: true };
    } catch (err) {
        console.error('Error in service:', err);
        return { success: false, message: 'Registration failed!', code: 500 };
    }
};

module.exports = { registerUser };

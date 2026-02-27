import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function setupAdmin() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Connected to database.');

    const email = 'ludvikremeskework@gmail.com';
    const password = 'admin'; // We will set the password to 'admin'
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await connection.execute(
      'UPDATE users SET password_hash = ? WHERE email = ?',
      [hashedPassword, email]
    );

    // @ts-ignore
    if (result.affectedRows > 0) {
      console.log(`Successfully updated password for ${email}.`);
      console.log(`You can now log in with:`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    } else {
      console.log(`User ${email} not found. Creating new admin user...`);
      
      // Get admin role id
      const [roles] = await connection.execute('SELECT id FROM roles WHERE name = "ADMIN"');
      // @ts-ignore
      if (roles.length > 0) {
        // @ts-ignore
        const roleId = roles[0].id;
        await connection.execute(
          'INSERT INTO users (email, password_hash, first_name, last_name, role_id) VALUES (?, ?, ?, ?, ?)',
          [email, hashedPassword, 'Ludvík', 'Admin', roleId]
        );
        console.log(`Successfully created admin user.`);
        console.log(`You can now log in with:`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
      } else {
        console.log('Error: ADMIN role not found in the database. Did you import databaze.sql?');
      }
    }

    await connection.end();
  } catch (error) {
    console.error('Error setting up admin:', error);
  }
}

setupAdmin();

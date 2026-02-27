import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env.local or .env
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true, // Allow multiple statements in one query
  });

  try {
    console.log('Connected to database.');

    const sqlPath = path.join(__dirname, '../databaze.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL by semicolon, but be careful with semicolons inside strings/comments if complex.
    // For this simple schema, splitting by ';' is mostly fine, but mysql2 supports multipleStatements: true
    // which is safer and easier.

    console.log('Executing SQL schema...');
    await connection.query(sql);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.end();
  }
}

seedDatabase();

import pool from "./lib/db.js";

async function checkSchema() {
  try {
    const [columns] = await pool.query("SHOW COLUMNS FROM users");
    console.log("Users columns:", columns);
  } catch (error) {
    console.error("Error checking schema:", error);
  } finally {
    process.exit();
  }
}

checkSchema();

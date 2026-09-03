require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pool = require("../db/db");

async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, "../db/migrations");
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      if (file.endsWith(".sql")) {
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, "utf8");
        console.log(`Applying migration: ${file}`);
        try {
          await pool.query(sql);
          console.log(`Successfully applied: ${file}`);
        } catch (err) {
          if (err.code === '42P07') {
            console.log(`Skipped ${file}: Relation already exists.`);
          } else {
            throw err;
          }
        }
      }
    }
    console.log("All migrations processing complete.");
  } catch (error) {
    console.error("Migration error:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();

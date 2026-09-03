require("dotenv").config();

const bcrypt = require("bcryptjs");
const pool = require("../db/db");

async function seedAdmin() {
    try {
        const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

        if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
            throw new Error(
                "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env"
            );
        }

        const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

        await pool.query(
            `
      INSERT INTO admins (name, email, password_hash)
      VALUES ($1, $2, $3)
      `,
            [ADMIN_NAME, ADMIN_EMAIL, passwordHash]
        );

        console.log("Admin seeded successfully.");
    } catch (error) {
        console.error("Failed to seed admin:");
        console.error(error.message);
    } finally {
        await pool.end();
    }
}

seedAdmin();
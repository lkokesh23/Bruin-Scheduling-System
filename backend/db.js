/**
 * @file db.js
 * @brief PostgreSQL connection setup for Neon database
 * @details Loads environment variables and sets up a Pool
 * @module db
 */

require('dotenv').config();
const { Pool } = require('pg');

// Validation check that DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error("FATAL ERROR: DATABASE_URL is not defined in .env file.");
}

/**
 * @type {import('pg').Pool}
 * @property {string} connectinoString Database URL, comes from the .env file
 * @property {boolean|object} ssl SSL settings configured for productions deployments
 */
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.NODE_ENV === 'production' 
		? { rejectUnauthorized: false } 
		: false,
});

/**
 * Exports database connection for use in another file
 * @type {import('pg').Pool}
 */
module.exports = pool;

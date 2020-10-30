const { Pool } = require('pg');

let db;
if (process.env.NODE_ENV && process.env.NODE_ENV === "production") { // prod
    db = new Pool({
        connectionString: process.env.DATABASE_URL
    });
} else { // développement
    db = new Pool();
}

module.exports = db;
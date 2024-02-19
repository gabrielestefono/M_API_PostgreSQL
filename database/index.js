const pgp = require('pg-promise')();
const { join } = require('node:path');

const db = pgp('postgres://postgres:eunaosei@localhost:5432/bookings');

// db.query('SELECT 1 + 1 AS result').then((result) => console.log(result));

const filePath = join(__dirname, 'create_tables.sql');
const query = new pgp.QueryFile(filePath, { minify: true });
db.query(query);

module.exports = db;
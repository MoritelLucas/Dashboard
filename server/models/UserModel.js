const {Client} = require('pg');

const pool = new Client({
  host:  "db",
  user: "postgres",
  password: "postgres",
  port: 5432,
  database: "api"
})

pool.connect();

const query = `
CREATE TABLE IF NOT EXISTS users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100)  NOT NULL,
  UNIQUE (email)
);`;

pool
    .query(query)
    .then(res => {
        console.log('Connected to DB dashboard');
    })
    .catch(err => {
        console.error(err);
    })

module.exports = {pool};
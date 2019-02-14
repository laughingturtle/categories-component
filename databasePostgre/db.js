const {
  Pool
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the PostgreSQL db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      clips(
        id INT,
        user_name VARCHAR(100) NOT NULL,
        game_name VARCHAR(150) NOT NULL,
        game_box_art_url VARCHAR(1000) NOT NULL,
        title VARCHAR(150) NOT NULL,
        description VARCHAR(500),
        clipped_by VARCHAR(500),
        url VARCHAR(500) NOT NULL,
        thumbnail_url_1 VARCHAR(500) NOT NULL,
        thumbnail_url_2 VARCHAR(500) NOT NULL,
        thumbnail_url_3 VARCHAR(500) NOT NULL,
        thumbnail_url_4 VARCHAR(500) NOT NULL,
        thumbnail_url_5 VARCHAR(500) NOT NULL,
        user_url VARCHAR(500) NOT NULL,
        game_url VARCHAR(500) NOT NULL,
        duration VARCHAR(9),
        view_count INT,
        created_at INT
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

createTables();
module.exports.pool = pool;
// COPY clips FROM '/Users/apple/george-categories-component/database/clips.txt' DELIMITER ',' CSV HEADER;
CREATE DATABASE categories_module;

USE categories_module;

CREATE TABLE videos (
  video_id INT unsigned NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  game_name VARCHAR(150) NOT NULL,
  game_box_art_url VARCHAR(1000) NOT NULL,
  title VARCHAR(150) NOT NULL,
  description VARCHAR(500),
  clipped_by VARCHAR(500),
  url VARCHAR(500) NOT NULL,
  thumbnail_url_1 VARCHAR(1000) NOT NULL,
  thumbnail_url_2 VARCHAR(1000) NOT NULL,
  thumbnail_url_3 VARCHAR(1000) NOT NULL,
  thumbnail_url_4 VARCHAR(1000) NOT NULL,
  thumbnail_url_5 VARCHAR(1000) NOT NULL,
  user_url VARCHAR(500) NOT NULL,
  game_url VARCHAR(500) NOT NULL,
  duration VARCHAR(9), /* 'HH:MM:SS[.fraction]' */
  view_count INT,
  created_at INT, /* DATE 'YYYY-MM-DD' */
  PRIMARY KEY (video_id)
);

CREATE TABLE clips (
  clip_id INT unsigned NOT NULL AUTO_INCREMENT,
  id INT NOT NULL,
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
  created_at INT,
  PRIMARY KEY (clip_id)
);


/*
N.B.
Execute this file from the command line by typing:
mysql -u root < database/gameDataSchema.sql
to create the database and the tables.

Then, to view the db and tables,
login to mysql from command line by typing:
mysql -u root -p
*/
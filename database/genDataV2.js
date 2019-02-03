// generate CSV file with 10M records
// mySQL data base

// node --max-old-space-size=4096 genData.js
//  mysql -u root -p --local-infile categories_module
// LOAD DATA LOCAL INFILE '/Users/apple/george-categories-component/database/clips.txt' INTO TABLE clips FIELDS TERMINATED BY ','  LINES TERMINATED BY '\n' (user_name,game_name, game_box_art_url, title, description,   clipped_by, url, thumbnail_url_1, thumbnail_url_2, thumbnail_url_3,    thumbnail_url_4, thumbnail_url_5,user_url, game_url, duration, view_count, created_at);

const faker = require('faker');
const fs = require('fs');
const writeStream = fs.createWriteStream('clips.txt', {
  flags: 'w'
});
// header
writeStream.write('user_name, game_name, game_box_art_url, title, description, clipped_by, url, thumbnail_url_1, thumbnail_url_2, thumbnail_url_3, thumbnail_url_4, thumbnail_url_5, user_url, game_url, duration, view_count, created_at\n')


function Object_values(obj) {
  let vals = [];
  for (const prop in obj) {
    vals.push(obj[prop]);
  }
  return vals;
}

writeStream.on('drain', function () {
  writeFun();
});
writeFun();

function writeFun() {
  for (var i = 0; i < 10000000; i++) { // 1Gtimes
    var row = {
      user_name: faker.internet.userName(),
      game_name: faker.random.word(),
      game_box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/Dark%20Souls%20III-40x56.jpg',
      title: faker.random.word() + ' ' + faker.random.word(),
      description: faker.lorem.sentence(),
      clipped_by: faker.internet.userName(),
      url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      // replace with faker function
      thumbnail_url_1: faker.random.image(),
      thumbnail_url_2: faker.random.image(),
      thumbnail_url_3: faker.random.image(),
      thumbnail_url_4: faker.random.image(),
      thumbnail_url_5: faker.random.image(),
      user_url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      game_url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      duration: JSON.stringify(faker.date.recent()).substring(12, 20),
      view_count: Math.floor((Math.random() * 400) + 1),
      created_at: Math.floor((Math.random() * 12) + 1)
    };

    var data = JSON.stringify(Object_values(row)).substring(1);
    data = data.substring(0, data.length - 1);
    writeStream.write(data + '\n');
  }
  writeStream.end();
}
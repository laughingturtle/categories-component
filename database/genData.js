const faker = require('faker');
const db = require('./index.js');
// const gameData = require('./database/gameData.js');
const gameData = require('./gameData.js');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'clips.csv',
  header: [{
      id: 'user_name',
      title: 'user_name'
    },
    {
      id: 'game_name',
      title: 'game_name'
    },
    {
      id: 'game_box_art_url',
      title: 'game_box_art_url'
    },
    {
      id: 'title',
      title: 'title'
    },
    {
      id: 'description',
      title: 'description'
    },
    {
      id: 'clipped_by',
      title: 'clipped_by'
    },
    {
      id: 'url',
      title: 'url'
    },
    {
      id: 'thumbnail_url_1',
      title: 'thumbnail_url_1'
    },
    {
      id: 'thumbnail_url_2',
      title: 'thumbnail_url_2'
    },
    {
      id: 'thumbnail_url_3',
      title: 'thumbnail_url_3'
    },
    {
      id: 'thumbnail_url_4',
      title: 'thumbnail_url_4'
    },
    {
      id: 'thumbnail_url_5',
      title: 'thumbnail_url_5'
    },
    {
      id: 'user_url',
      title: 'user_url'
    },
    {
      id: 'game_url',
      title: 'game_url'
    },
    {
      id: 'duration',
      title: 'duration'
    },
    {
      id: 'view_count',
      title: 'view_count'
    },
    {
      id: 'created_at',
      title: 'created_at'
    },
  ]
});



const genData = (numTimes) => {
  var output = [];
  while (numTimes > 0) {
    var row = {
      user_name: faker.internet.userName(),
      game_name: faker.random.word(),
      game_box_art_url: 'https://static-cdn.jtvnw.net/ttv-boxart/Dark%20Souls%20III-40x56.jpg',
      title: faker.random.word() + ' ' + faker.random.word(),
      description: faker.lorem.sentence(),
      clipped_by: faker.internet.userName(),
      url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      thumbnail_url_1: 'https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/dlc2_20.jpg',
      thumbnail_url_2: 'https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/dlc2_20.jpg',
      thumbnail_url_3: 'https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/dlc2_20.jpg',
      thumbnail_url_4: 'https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/dlc2_20.jpg',
      thumbnail_url_5: 'https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/dlc2_20.jpg',
      user_url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      game_url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      duration: JSON.stringify(faker.date.recent()).substring(12, 20),
      view_count: Math.floor((Math.random() * 400) + 1),
      created_at: Math.floor((Math.random() * 12) + 1)
    };
    output.push(row);
    numTimes--;
  }
  return output;
}



const data = genData(500000);

// console.log(data);

csvWriter
  .writeRecords(data)
  .then(() => console.log('The CSV file was written successfully'));

// node --max-old-space-size=4096 genData.js
//  mysql -u root -p --local-infile categories_module
// LOAD DATA LOCAL INFILE '/Users/apple/george-categories-component/database/clips.csv' INTO TABLE clips FIELDS TERMINATED BY ','  LINES TERMINATED BY '\n' (user_name,game_name, game_box_art_url, title, description,   clipped_by, url, thumbnail_url_1, thumbnail_url_2, thumbnail_url_3,    thumbnail_url_4, thumbnail_url_5,user_url, game_url, duration, view_count, created_at);

// LOAD DATA LOCAL INFILE '/Users/apple/george-categories-component/database/clips.txt' INTO TABLE clips FIELDS TERMINATED BY ','  LINES TERMINATED BY '\n' (user_name,game_name, game_box_art_url, title, description,   clipped_by, url, thumbnail_url_1, thumbnail_url_2, thumbnail_url_3,    thumbnail_url_4, thumbnail_url_5,user_url, game_url, duration, view_count, created_at);
const db = require('./db');
const faker = require('faker');
const uuid = require('uuid');

faker.locale = "en_US";

const seedClips = (numTimes) => {
  faker.seed(123);
  for (let i = 0; i < numTimes; i++) {
    db.CategoriestModel.create({
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
      created_at: faker.date.recent()
    }, (err, data) => {
      if (err) {
        console.log('db error .>>', err)
      }
    });
  }
}

seedClips(1000000);
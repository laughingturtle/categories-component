const faker = require('faker');
const db = require('./index.js');
// const gameData = require('./database/gameData.js');
const gameData = require('./gameData.js');
// const gameData = require('./gameData_webpImages.js');

/*
For faster loading static page, un-comment path to gameData_webpImages.js, above,
and comment-out path to gameData.js.
*/

module.exports = () => {
  new Promise(function (resolve, reject) {
      for (i = 0; i < gameData.videos.length; i++) {
        let video = `INSERT INTO videos
              (user_name,
              game_name,
              game_box_art_url,
              title,
              description,
              clipped_by,
              url,
              thumbnail_url_1,
              thumbnail_url_2,
              thumbnail_url_3,
              thumbnail_url_4,
              thumbnail_url_5,
              user_url,
              game_url,
              duration,
              view_count,
              created_at)
              VALUES
              ('${gameData.videos[i].user_name/* user_name */}',
              '${gameData.videos[i].game_name/* game_name */}',
              '${gameData.videos[i].game_box_art_url/* game_box_art_url */}',
              '${faker.random.word() + ' ' + faker.random.word()/* title */}',
              '${faker.lorem.sentence()/* description */}',
              '${gameData.videos[i].user_name/* clipped_by */}',
              '${"https://www.youtube.com/watch?v=oHg5SJYRHA0"/* url */}',
              '${gameData.videos[i].thumbnail_url_1/* thumbnail_url_1 */}',
              '${gameData.videos[i].thumbnail_url_2/* thumbnail_url_2 */}',
              '${gameData.videos[i].thumbnail_url_3/* thumbnail_url_3 */}',
              '${gameData.videos[i].thumbnail_url_4/* thumbnail_url_3 */}',
              '${gameData.videos[i].thumbnail_url_5/* thumbnail_url_3 */}',
              '${"https://www.youtube.com/watch?v=oHg5SJYRHA0"/* user_url */}',
              '${"https://www.youtube.com/watch?v=oHg5SJYRHA0"/* game_url */}',
              '${JSON.stringify(faker.date.recent()).substring(12, 20)/* duration */}',
              '${Math.floor((Math.random() * 400) + 1)/* view_count */}',
              '${Math.floor((Math.random() * 12) + 1)/* created_at */}')`;
        if (i === gameData.videos.length - 1) {
          db.connection.query(video, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              resolve();
            }
          });
        } else {
          db.connection.query(video);
        }
      };

    })
    .then(function (result) {
      console.log('game videos table seeded');
      return new Promise(function (resolve, reject) {
        for (i = 0; i < gameData.clips.length; i++) {
          let clip = `INSERT INTO clips
          (user_name,
          game_name,
          game_box_art_url,
          title,
          description,
          clipped_by,
          url,
          thumbnail_url_1,
          thumbnail_url_2,
          thumbnail_url_3,
          thumbnail_url_4,
          thumbnail_url_5,
          user_url,
          game_url,
          duration,
          view_count,
          created_at)
          VALUES
          ('${gameData.clips[i].user_name/* user_name */}',
          '${gameData.clips[i].game_name/* game_name */}',
          '${gameData.clips[i].game_box_art_url/* game_box_art_url */}',
          '${faker.random.word() + ' ' + faker.random.word()/* title */}',
          '${faker.lorem.sentence()/* description */}',
          '${faker.internet.userName()/* clipped_by */}',
          '${"https://www.youtube.com/watch?v=oHg5SJYRHA0"/* url */}',
          '${gameData.clips[i].thumbnail_url_1/* thumbnail_url_1 */}',
          '${gameData.clips[i].thumbnail_url_2/* thumbnail_url_2 */}',
          '${gameData.clips[i].thumbnail_url_3/* thumbnail_url_3 */}',
          '${gameData.clips[i].thumbnail_url_4/* thumbnail_url_3 */}',
          '${gameData.clips[i].thumbnail_url_5/* thumbnail_url_3 */}',
          '${"https://www.youtube.com/watch?v=oHg5SJYRHA0"/* user_url */}',
          '${"https://www.youtube.com/watch?v=oHg5SJYRHA0"/* game_url */}',
          '${JSON.stringify(faker.date.recent()).substring(12, 20)/* duration */}',
          '${Math.floor((Math.random() * 400) + 1)/* view_count */}',
          '${Math.floor((Math.random() * 12) + 1)/* created_at */}')`;
          if (i === gameData.clips.length - 1) {
            db.connection.query(clip, (err, res) => {
              if (err) {
                console.log(err);
              } else {
                resolve(console.log('game clips table seeded'));
              }
            });
          } else {
            db.connection.query(clip);
          }
        };
      });
    }).then(result => db.connection.end());
  return 'seed script called';
};

require('make-runnable');
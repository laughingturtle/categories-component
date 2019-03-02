// const nb = require('newrelic');
const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const cors = require('cors');
const responseTime = require('response-time');
const redis = require('redis');
// const db = require('../database'); //mySQL
const db = require('../databaseNoSQL/db'); //mongo
// const db = require('../databasePostgre/db'); //PostgreSQL
const client = redis.createClient();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public`));
app.use(responseTime());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mongo
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const getClips = (req, res) => {
//   db.CategoriesModel.find()
//     // .sort({
//     //   created_at: -1,
//     //   view_count: -1
//     // })
//     .limit(8)
//     .exec((err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(404).end();
//       }
//       // console.log('data>>>', data);
//       const clipsData = JSON.stringify(data[1])
//       client.set('clips', 3, clipsData);
//       res.json(data);
//     })

// }

// const getCache = (req, res) => {
//   //Check the cache data from the server redis
//   client.get('clips', (err, result) => {
//     if (result) {
//       console.log(result)
//       res.send(result);
//     } else {
//       getClips(req, res);
//     }
//   });
// }

app.get('/recent-broadcasts', (req, res) => {
  //db.CategoriesModel.find({}).sort({created_at: -1, view_count: -1}).limit(10)
  db.CategoriesModel.find()
    // .sort({
    //   created_at: -1,
    //   view_count: -1
    // })
    .limit(8)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(404).end();
      }
      console.log(data);
      res.json(data);
    })
});



// app.get('/recent-broadcasts', getCache);

app.get('/recent-highlights', (req, res) => {
  db.CategoriesModel.find({})
    .limit(8)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(404).end();
      }
      res.json(data);
    })
});

app.get('/popular-clips', (req, res) => {
  db.CategoriesModel.find({})
    .limit(8)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(404).end();
      }
      res.json(data);
    })
});
// post => 98 ms
app.post('/popular-clips', (req, res) => {

  let new_clips = new db.CategoriesModel({
    user_name: req.query.user_name,
    game_name: req.query.game_name,
    game_box_art_url: req.query.game_box_art_url,
    title: req.query.title,
    description: req.query.description,
    clipped_by: req.query.clipped_by,
    url: req.query.url,
    // replace with faker function
    thumbnail_url_1: req.query.thumbnail_url_1,
    thumbnail_url_2: req.query.thumbnail_url_2,
    thumbnail_url_3: req.query.thumbnail_url_3,
    thumbnail_url_4: req.query.thumbnail_url_4,
    thumbnail_url_5: req.query.thumbnail_url_5,
    user_url: req.query.user_url,
    game_url: req.query.game_url,
    duration: req.query.duration,
    view_count: req.query.view_count,
    created_at: Math.floor((Math.random() * 12) + 1)
  })

  new_clips.save((err) => {
    if (err) {
      console.log('error saving data, ', err);
      res.status(500).send('error saving data')
    }
    console.log('successfully saved data')
    res.status(201).send('DONE');
  })
});

// update
app.put('/popular-clips', (req, res) => {
  db.CategoriesModel
    .findOneAndUpdate({
        user_name: req.query.user_name
      }, {
        $set: {
          game_name: req.query.game_name
        }
      },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(404).end();
        }
        console.log('updated ', data);
        res.json('OK');
      })
});

// delete
app.delete('/popular-clips', (req, res) => {
  db.CategoriesModel
    .findOneAndDelete({
        user_name: req.query.user_name
      },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(404).end();
        }
        console.log('deleted ', data);
        res.json('OK');
      })
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mySQL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* for static page, comment out all GET routes */
// app.get('/recent-broadcasts', (req, res) => {
//   new Promise(function (resolve, reject) {
//       db.connection.query('SELECT * FROM clips limit 10', (error, results, fields) => {
//         if (error) {
//           res.send(error);
//         } else {
//           console.log('results recent-broadcasts >', results);
//           resolve(results);
//         }
//       });
//     })
//     .then((results) => JSON.parse(JSON.stringify(results)))
//     .then((data) => {
//       //console.log('All Videos -->', data);
//       data.sort((a, b) => {
//         return a.created_at - b.created_at;
//       });
//       let recentBroadcasts = data.slice(0, 8);
//       //console.log('RECENT BROADCASTS =>', recentBroadcasts);
//       return res.send(recentBroadcasts);
//     });
// });

// app.get('/recent-highlights', (req, res) => {
//   new Promise(function (resolve, reject) {
//       // db.connection.query('SELECT * FROM videos', (error, results, fields) => {
//       db.connection.query('SELECT * FROM clips limit 10', (error, results, fields) => {
//         if (error) {
//           res.send(error);
//         } else {
//           console.log('results recent-highlights >', results);
//           resolve(results);
//         }
//       });
//     })
//     .then((results) => JSON.parse(JSON.stringify(results)))
//     .then((data) => {
//       data.sort((a, b) => {
//         return a.created_at - b.created_at;
//       });
//       let temp = data.slice(0, 50);
//       temp.sort((a, b) => {
//         return b.view_count - a.view_count;
//       });
//       let recentHighlights = temp.slice(0, 8);
//       //console.log('RECENT HIGHLIGHTS =>', recentHighlights);
//       return res.send(recentHighlights);
//     });
// });

// app.get('/popular-clips', (req, res) => {
//   new Promise(function (resolve, reject) {
//       db.connection.query('SELECT * FROM clips limit 10', (error, results, fields) => {
//         if (error) {
//           res.send(error);
//         } else {
//           console.log('results popular-clips >', results);
//           resolve(results);
//         }
//       });
//     })
//     .then((results) => JSON.parse(JSON.stringify(results)))
//     .then((data) => {
//       data.sort((a, b) => {
//         return b.view_count - a.view_count;
//       });
//       let popularClips = data.slice(0, 8);
//       //console.log('POPULAR CLIPS =>', popularClips);
//       return res.send(popularClips);
//     });
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mySQL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* for static page, comment out all GET routes */
// app.get('/recent-broadcasts', (req, res) => {
//   new Promise(function (resolve, reject) {
//       db.pool.query('SELECT * FROM clips limit 10', (error, results, fields) => {
//         if (error) {
//           res.send(error);
//         } else {
//           // console.log('results recent-broadcasts >', results);
//           resolve(results);
//         }
//       });
//     })
//     .then((results) => JSON.parse(JSON.stringify(results)))
//     .then((data) => {
//       //console.log('All Videos -->', data);
//       data.rows.sort((a, b) => {
//         return a.created_at - b.created_at;
//       });
//       console.log('THIS IS DATA>>>>>   ', data.rows);
//       let recentBroadcasts = data.rows.slice(0, 8);
//       //console.log('RECENT BROADCASTS =>', recentBroadcasts);
//       return res.send(recentBroadcasts);
//     });
// });

// app.get('/recent-highlights', (req, res) => {
//   new Promise(function (resolve, reject) {
//       // db.connection.query('SELECT * FROM videos', (error, results, fields) => {
//       db.pool.query('SELECT * FROM clips limit 10', (error, results, fields) => {
//         if (error) {
//           res.send(error);
//         } else {
//           console.log('results recent-highlights >', results);
//           resolve(results);
//         }
//       });
//     })
//     .then((results) => JSON.parse(JSON.stringify(results)))
//     .then((data) => {
//       data.rows.sort((a, b) => {
//         return a.created_at - b.created_at;
//       });
//       let temp = data.rows.slice(0, 50);
//       temp.sort((a, b) => {
//         return b.view_count - a.view_count;
//       });
//       let recentHighlights = temp.slice(0, 8);
//       //console.log('RECENT HIGHLIGHTS =>', recentHighlights);
//       return res.send(recentHighlights);
//     });
// });

// app.get('/popular-clips', (req, res) => {
//   new Promise(function (resolve, reject) {
//       db.pool.query('SELECT * FROM clips limit 10', (error, results, fields) => {
//         if (error) {
//           res.send(error);
//         } else {
//           console.log('results popular-clips >', results);
//           resolve(results);
//         }
//       });
//     })
//     .then((results) => JSON.parse(JSON.stringify(results)))
//     .then((data) => {
//       data.rows.sort((a, b) => {
//         return b.view_count - a.view_count;
//       });
//       let popularClips = data.rows.slice(0, 8);
//       //console.log('POPULAR CLIPS =>', popularClips);
//       return res.send(popularClips);
//     });
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// connection
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
});
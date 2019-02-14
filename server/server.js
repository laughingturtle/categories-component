const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const cors = require('cors');
// const db = require('../database'); //mySQL
const db = require('../databaseNoSQL/db'); //mongo
// const db = require('../databasePostgre/db'); //PostgreSQL

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public`));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mongo
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/recent-broadcasts', (req, res) => {
  //db.CategoriesModel.find({}).sort({created_at: -1, view_count: -1}).limit(10)
  db.CategoriesModel.find()
    .sort({
      created_at: -1,
      view_count: -1
    })
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

app.get('/recent-highlights', (req, res) => {
  db.CategoriesModel.find({})
    .sort({
      created_at: -1,
      view_count: -1
    })
    .limit(50)
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
    .sort({
      created_at: -1,
      view_count: -1
    })
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
    title: req.query.game_box_art_url,
    description: req.query.game_box_art_url,
    clipped_by: req.query.game_box_art_url,
    url: req.query.game_box_art_url,
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
    created_at: new Date()
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
  db.CategoriesModel.find({})
    .sort({
      created_at: -1,
      view_count: -1
    })
    .limit(8)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(404).end();
      }
      res.json(data);
    })
});

// delete
app.delete('/popular-clips', (req, res) => {
  db.CategoriesModel.find({})
    .sort({
      created_at: -1,
      view_count: -1
    })
    .limit(8)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(404).end();
      }
      res.json(data);
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
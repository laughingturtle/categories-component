const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const cors = require('cors');
// const db = require('../database'); //mySQL
// const db = require('../databaseNoSQL/db'); //mongo
const db = require('../databasePostgre/db'); //PostgreSQL

///Users/apple/george-categories-component/databaseNoSQL
///Users/apple/george-categories-component/database
///Users/apple/george-categories-component/server/server.js
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public`));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mongo
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.get('/recent-broadcasts', (req, res) => {
//   // console.log(db.CategoriestModel.findById('5c5c7ac2796578153e332cdb'));
//   console.log('this is DB', db.CategoriesModel.find({}));
//   db.CategoriesModels.find({}).then((data) => {
//     // res.send(data);
//     console.log('output from server: ', data);
//     res.json(data);
//   })

// db.CategoriestModel.find().limit(10).exec((err, data) => {
//   if (err) {
//     console.log(err);
//     res.status(404).end();
//   }
//   // res.send(data);
//   console.log(data);
//   res.json(data);
// })
// });

// app.get('/recent-highlights', (req, res) => {
//   db.CategoriestModel.find({}).limit(10).exec((err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(404).end();
//     }
//     // res.send(data);
//     console.log(data);
//     res.send(JSON.parse(JSON.stringify(data)));
//   })
// });

// app.get('/popular-clips', (req, res) => {
//   db.CategoriestModel.find({}).limit(10).exec((err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(404).end();
//     }
//     // res.send(data);
//     console.log(data);
//     res.send(JSON.parse(JSON.stringify(data)));
//   })
// });

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
app.get('/recent-broadcasts', (req, res) => {
  new Promise(function (resolve, reject) {
      db.pool.query('SELECT * FROM clips limit 10', (error, results, fields) => {
        if (error) {
          res.send(error);
        } else {
          // console.log('results recent-broadcasts >', results);
          resolve(results);
        }
      });
    })
    .then((results) => JSON.parse(JSON.stringify(results)))
    .then((data) => {
      //console.log('All Videos -->', data);
      data.rows.sort((a, b) => {
        return a.created_at - b.created_at;
      });
      console.log('THIS IS DATA>>>>>   ', data.rows);
      let recentBroadcasts = data.rows.slice(0, 8);
      //console.log('RECENT BROADCASTS =>', recentBroadcasts);
      return res.send(recentBroadcasts);
    });
});

app.get('/recent-highlights', (req, res) => {
  new Promise(function (resolve, reject) {
      // db.connection.query('SELECT * FROM videos', (error, results, fields) => {
      db.pool.query('SELECT * FROM clips limit 10', (error, results, fields) => {
        if (error) {
          res.send(error);
        } else {
          console.log('results recent-highlights >', results);
          resolve(results);
        }
      });
    })
    .then((results) => JSON.parse(JSON.stringify(results)))
    .then((data) => {
      data.rows.sort((a, b) => {
        return a.created_at - b.created_at;
      });
      let temp = data.rows.slice(0, 50);
      temp.sort((a, b) => {
        return b.view_count - a.view_count;
      });
      let recentHighlights = temp.slice(0, 8);
      //console.log('RECENT HIGHLIGHTS =>', recentHighlights);
      return res.send(recentHighlights);
    });
});

app.get('/popular-clips', (req, res) => {
  new Promise(function (resolve, reject) {
      db.pool.query('SELECT * FROM clips limit 10', (error, results, fields) => {
        if (error) {
          res.send(error);
        } else {
          console.log('results popular-clips >', results);
          resolve(results);
        }
      });
    })
    .then((results) => JSON.parse(JSON.stringify(results)))
    .then((data) => {
      data.rows.sort((a, b) => {
        return b.view_count - a.view_count;
      });
      let popularClips = data.rows.slice(0, 8);
      //console.log('POPULAR CLIPS =>', popularClips);
      return res.send(popularClips);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// connection
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
});
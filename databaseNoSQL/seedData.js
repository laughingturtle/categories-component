const fs = require('fs');
const csv = require('fast-csv');
const db = require('./db');
var async = require('async');
// const split = require('split');
// const async = require('asyncawait/async');
// const await = require('asyncawait/await');

const stream = fs.createReadStream('../database/clips.txt');

var parser = csv
  .fromStream(stream, {
    headers: true
  })
  .on("data", function (data) {
    // console.log(data);
    // return new Promise((resolve, reject) => {
    //   db.CategoriestModel.create(data, (err, dbData) => {
    //     if (err) {
    //       reject(err);
    //     }
    //     console.log(dbData);
    //     resolve(dbData);
    //   })
    // })
    db.CategoriestModel.create(data, (err, dbData) => {
      if (err) {
        console.log(err);
      }
    })
  }).on("end", function () {
    console.log("done");
  })

// mongoimport --db CategoriestModel --collection CategoriestModel --type csv --headerline --file /Users/apple/george-categories-component/database/clips.txt





// mongoimport --db CategoriestModel --collection clips --type csv --headerline --file /Users/apple/george-categories-component/database/clips.txt
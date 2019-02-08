var mongoose = require('mongoose'),
  Admin = mongoose.mongo.Admin;

const mongoDB = 'mongodb://127.0.0.1/categories_db';
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('connected Database!')
  // new Admin(db.db).listDatabases(function (err, result) {
  //   console.log('listDatabases succeeded');
  //   // database list stored in result.databases
  //   var allDatabases = result.databases;
  //   // console.log(allDatabases);
  //   console.log('result>> ', result);
  // });
});

const CategoriesSchema = new mongoose.Schema({
  user_name: String,
  game_name: String,
  game_box_art_url: String,
  title: String,
  description: String,
  clipped_by: String,
  url: String,
  thumbnail_url_1: String,
  thumbnail_url_2: String,
  thumbnail_url_3: String,
  thumbnail_url_4: String,
  thumbnail_url_5: String,
  user_url: String,
  game_url: String,
  duration: String,
  view_count: Number,
  created_at: {
    type: Date,
    default: Date.now()
  },
});

const CategoriesModel = mongoose.model('CategoriesModel', CategoriesSchema);
module.exports.CategoriesModel = CategoriesModel;

//// mongoimport --db categories_db --collection CategoriesModel --type csv --headerline --file /Users/apple/george-categories-component/database/clips.txt
// mongoimport -d categories_db -c CategoriesModel --type csv --file /Users/apple/george-categories-component/database/clips.txt --headerline;
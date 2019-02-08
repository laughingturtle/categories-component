const mysql = require('mysql');

const connection = mysql.createConnection({

  /* for local hosting or creating static bundle.js */
  host: 'localhost',
  user: 'student',
  password: 'student', // fill out
  database: 'categories_module'

  /* for Elastic Beanstalk hosting connected to seeded RDS MySQL database */
  // host: process.env.RDS_HOSTNAME,
  // user: process.env.RDS_USERNAME,
  // password: process.env.RDS_PASSWORD,
  // port: process.env.RDS_PORT,
  // database: 'categories_module'
});

connection.connect((err) => {

  /* for local hosting or creating static bundle.js */
  if (err) {
    console.log(`ERROR: ${err.message}`);
  } else {
    console.log('database connected');
  }

  /* for Elastic Beanstalk hosting connected to seeded RDS MySQL database */
  // if (err) {
  //   process.env['msg'] = 'Unable to connect to RDS - ' + err;
  // } else {
  //   process.env['msg'] = 'Success! Connected to RDS via ' + process.env.RDS_HOSTNAME;
  // }
});

module.exports.connection = connection;
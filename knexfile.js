const tableNames = require('./src/constants/tableNames');

// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {

    client: 'mysql',
    connection: {
      database: process.env.MYSQL_DB,
      user:     process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  test: {

    client: 'mysql',
    connection: {
      database: process.env.MYSQL_TEST_DB,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

};

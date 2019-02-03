// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    },
    debug: false,
    useNullAsDefault: true
  },

  // Can be used to test from the remote database
  staging: {
    client: 'pg',
    connection: {
      database: process.env.PSQL_DEV_DB,
      host: process.env.PSQL_HOST_URL,
      user: process.env.PSQL_USER_LOGIN,
      password: process.env.PSQL_AUTH_KEY
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  // cannot be access from remote connection
  // only the server can manage the production part
  production: {
    client: 'pg',
    connection: {
      database: process.env.PSQL_PROD_DB,
      host: process.env.PSQL_HOST_URL,
      user: process.env.PSQL_USER_LOGIN,
      password: process.env.PSQL_AUTH_KEY
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

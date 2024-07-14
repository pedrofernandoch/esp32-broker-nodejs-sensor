const { db } = require('./env.js')
const config = {
  client: 'pg',
  connection: db,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

const knex = require('knex')(config)

module.exports = knex
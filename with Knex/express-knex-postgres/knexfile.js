module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${ __dirname }/data/migrations`
    },
    seeds: {
      directory: `${ __dirname }/data/seeds`
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,

    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

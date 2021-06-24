module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
       'src/app/modules/entities/*.ts',
    ],
    migrations: [
       'src/migration/**/*.ts',
    ],
    subscribers: [
       'src/subscriber/**/*.ts',
    ],
    cli: {
       entitiesDir: 'src/app/models',
       migrationsDir: 'src/migration',
       subscribersDir: 'src/subscriber',
    },
 };
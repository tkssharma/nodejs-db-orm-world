import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: true,
    logging: true,
    entities: [
       'src/entities/*.ts',
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
import {IDatabase} from './interface';
const config : { [key: string]: IDatabase }  = {
  development: {
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
  production: {
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
  stage: {
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
  test: {
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
  uat: {
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
};
export default config;

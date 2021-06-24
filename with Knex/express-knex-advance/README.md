# express-knex-postgres-boilerplate

Boilerplate code for quick setup for CRUD applications using express/knex/postgres/jest/supertest

##Setup - Detailed Instructions Below

1. Git clone the repo ```git clone [url]``` and remove origin ```git remote remove origin```
2. npm install
3. setup postgres backend
4. Modify .env file to suit your backend and migrate/seed db
  1. migrate tables ```npx knex migrate:latest```
  2. run seeds ```npx knex seed:run```
5. npm run server
6. npm run test
7. modify code to suit your needs

## Setup PostgreSQL

### Homebrew (for macOS users)

If you dont have postgres follow this link (Follow directions until you're able to get into psql utility): https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

#### Create dev and test database (Mac)

In terminal run the following commands:

1. ```psql``` -- To get into postgreSQL utility
2. ```CREATE DATABASE db-name;``` -- Creates development server
3. ```CREATE DATABASE db-name-test;``` -- Creates testing server
4. ```\q```
5. CD into your repo

### Windows

If you dont have postgres follow this link: https://www.2ndquadrant.com/en/blog/pginstaller-install-postgresql/

#### Create dev and test databases (Windows)

Set up Postgres and create databases for both the development server (db-name) and testing server (db-name-test)

1. Open pgAdmin, sign in with your master password created during the set up of postgres.
2. Create a server if needed, if already created, turn server on by right clicking and pressing "Connect Server"
3. Once connected, look for the drop down for databases and right click to Create a database
4. Create a database called 'db-name' for the development connection & (db-name-test) for the testing connection

## Environmental Variables at Runtime

Create a ".env" file at the root of your project and add the following for both DEV and TEST databases

```
    POSTGRES_DEV_HOST=localhost
    POSTGRES_DEV_PORT=5432
    POSTGRES_DEV_USER=postgres
    POSTGRES_DEV_PASSWORD= \_Insert your postgres password here*
    POSTGRES_DEV_DATABASE=db-name
```

```
    POSTGRES_TEST_HOST=localhost
    POSTGRES_TEST_PORT=5432
    POSTGRES_TEST_USER=postgres
    POSTGRES_TEST_PASSWORD= \_Insert your postgres password here*
    POSTGRES_TEST_DATABASE=db-name-test
```

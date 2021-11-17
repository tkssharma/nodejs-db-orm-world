
Boilerplate Repository
----------------------

#### Stacks
- Node
- Express
- Prisma
- Typescript

How to setup
------------

#### Create a PostgreSQL database
- download and setup postgres locally or use a remote database
- create a new database or connect to an existing one
- crate an example table

#### Setup repo
- clone this repository
- `cd` into this clone folder and run `npm install` to install all dependencies
- create a `.dotenv` file inside `./prisma/`
- update you `.dotenv` file with the DATABASE_URL
- run `npx prisma introspect` to enable prisma introspect your database schemas
- run `npx prisma generate` to generate a prisma client, you can learn more [here](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-sql-typescript-postgres)
- start the server with `npm run dev` for dev mode or `npm run start` from production mode

Reference
---------
- [Prisma](https://www.prisma.io)
- [TypeScript](https://www.typescriptlang.org)
- [Setup TypeScript with node](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
- [Express](https://expressjs.com/)
- [Node](https://nodejs.org/en/)


Licence
----------
- MIT
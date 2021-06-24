# express-knex

1. Install dependencies.

    `yarn install`

2. Create a postgres database for the project.

    ```Bash
    % psql postgres -U your_username_here
    postgres=> CREATE DATABASE name_of_db;
    postgres=> GRANT ALL PRIVILEGES ON DATABASE name_of_db TO your_username_here;
    postgres=> \q
    ```

    > You could change the default database, but Knex's .returning() method will only work for PostgreSQL, MSSQL, and Oracle databases. Modifications will be needed for other databases to meet the todo-backend spec.

3. Add Postgres credentials into server/.env to allow Knex to connect to the database.
4. Install Knex globally.

    `npm install knex -g`

5. Set up the database using Knex migrations.

    `cd server && knex migrate:latest`

6. Start the server on [http://localhost:5000](http://localhost:5000).

    `yarn server`

7. Test it against the spec at [Todo-Backend Specs](http://todobackend.com/specs/index.html?http://localhost:5000/)

## Bonus Features

- Run tests locally using either.

    `yarn test`

    `yarn test:watch`

    >The second command requires watchman  
    >`brew install watchman`

- Install create-react-app frontend starting at root directory:

    `cd client && yarn install`

- Run backend and frontend simultaneously from root directory.

    `yarn dev`

    > Note: The proxied connection will only work locally.
    > You'll need the server to serve the frontend build if
    > you want to host the entire project somewhere.

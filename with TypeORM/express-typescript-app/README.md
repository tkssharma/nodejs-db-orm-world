# api-express-template
my base repo for any new service [Typescript + Strong typing + TypeORM + Docker ]

# Componenet Used in Template 

- express
- typeorm
- mysql
- mocha testing (with nock mock library & chai)


# Application setup
copy example.env to .env

```bash
ENV=development
PORT=3000
DB_USER=root
DB_PASS=root
DB_NAME=test
DB_HOST=mysql
DB_PORT=3306
DB_DIALECT=mysql
DB_CHARSET=utf8mb4
DB_COLLATE=utf8mb4_unicode_ci
LOG_LEVEL=info
```
## Start Application using Docker-compose

docker-compose up 

```bash
mysql_1  | Version: '5.7.28'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)
node_1   | info: undefined {"0":"database connected successfully","timestamp":"2020-05-22 05:06:19"}
node_1   | info: undefined {"0":"Sample app listening on {\"address\":\"::\",\"family\":\"IPv6\",\"port\":3000}","timestamp":"2020-05-22 05:06:19"}
```

## Initilize DB with Tables using Sync

- Connect to docker container 

```bash
docker exec -it container-name /bin/sh
root@c3feba84278d:/usr/src/app# npm run db:sync

```

It will create table with defined columns in Entity and Migration will just seed as Table already created using sync.
db:sync may create problem as it scans whole database and crate i something new added
db:migrate can be used to add new column, table or seeding data.

```bash
root@c3feba84278d:/usr/src/app# npm run db:sync

> scooty-apis@1.0.0 db:sync /usr/src/app
> npm run typeorm:cli schema:sync && npm run db:migrate


> scooty-apis@1.0.0 typeorm:cli /usr/src/app
> ts-node ./node_modules/typeorm/cli -f ./ormconfig.ts "schema:sync"

query: START TRANSACTION
query: SELECT DATABASE() AS `db_name`
query: SELECT * FROM `INFORMATION_SCHEMA`.`TABLES` WHERE (`TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'user')
query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE (`TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'user')
query: SELECT * FROM `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` WHERE `CONSTRAINT_NAME` = 'PRIMARY' AND ((`TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'user'))
query: SELECT `SCHEMA_NAME`, `DEFAULT_CHARACTER_SET_NAME` as `CHARSET`, `DEFAULT_COLLATION_NAME` AS `COLLATION` FROM `INFORMATION_SCHEMA`.`SCHEMATA`
query: SELECT `s`.* FROM `INFORMATION_SCHEMA`.`STATISTICS` `s` LEFT JOIN `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS` `rc` ON `s`.`INDEX_NAME` = `rc`.`CONSTRAINT_NAME` WHERE ((`s`.`TABLE_SCHEMA` = 'test' AND `s`.`TABLE_NAME` = 'user')) AND `s`.`INDEX_NAME` != 'PRIMARY' AND `rc`.`CONSTRAINT_NAME` IS NULL
query: SELECT `kcu`.`TABLE_SCHEMA`, `kcu`.`TABLE_NAME`, `kcu`.`CONSTRAINT_NAME`, `kcu`.`COLUMN_NAME`, `kcu`.`REFERENCED_TABLE_SCHEMA`, `kcu`.`REFERENCED_TABLE_NAME`, `kcu`.`REFERENCED_COLUMN_NAME`, `rc`.`DELETE_RULE` `ON_DELETE`, `rc`.`UPDATE_RULE` `ON_UPDATE` FROM `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu` INNER JOIN `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS` `rc` ON `rc`.`constraint_name` = `kcu`.`constraint_name` WHERE (`kcu`.`TABLE_SCHEMA` = 'test' AND `kcu`.`TABLE_NAME` = 'user')
query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'typeorm_metadata'
creating a new table: user
query: CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB
query: COMMIT
Schema syncronization finished successfully.

> scooty-apis@1.0.0 db:migrate /usr/src/app
> npm run typeorm:cli migration:run


> scooty-apis@1.0.0 typeorm:cli /usr/src/app
> ts-node ./node_modules/typeorm/cli -f ./ormconfig.ts "migration:run"

query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'migrations'
query: CREATE TABLE `test`.`migrations` (`id` int NOT NULL AUTO_INCREMENT, `timestamp` bigint NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: SELECT * FROM `test`.`migrations` `migrations` ORDER BY `id` DESC
0 migrations are already loaded in the database.
1 migrations were found in the source code.
1 migrations are new migrations that needs to be executed.
query: START TRANSACTION
query: START TRANSACTION
query: INSERT INTO `user`(`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES (DEFAULT, ?, ?, ?, ?, DEFAULT, DEFAULT) -- PARAMETERS: ["admin","admin","$2a$08$oeyyXnIyIP0GEV9GHLo6vOerQxQq7h6awDITXzQXBcpAyMQ2OLdma","ADMIN"]
query: SELECT `User`.`id` AS `User_id`, `User`.`createdAt` AS `User_createdAt`, `User`.`updatedAt` AS `User_updatedAt` FROM `user` `User` WHERE `User`.`id` = ? -- PARAMETERS: [1]
query: COMMIT
query: INSERT INTO `test`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1547919837483,"CreateAdminUser1547919837483"]
Migration CreateAdminUser1547919837483 has been executed successfully.
query: COMMIT
```
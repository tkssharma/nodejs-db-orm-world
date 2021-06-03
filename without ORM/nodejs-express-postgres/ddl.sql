CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT uuid_generate_v4();

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4 (),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

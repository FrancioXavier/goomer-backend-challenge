CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS restarants(
    uuid uuid DEFAULT uuid_generate_v4(),
    restaurantPhoto VARCHAR NOT NULL,
    restaurantName VARCHAR NOT NULL,
    restaurantAdress VARCHAR NOT NULL,
    restaurantOperationTime VARCHAR NOT NULL
)
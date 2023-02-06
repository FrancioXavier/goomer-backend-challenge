CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS restaurants(
    uuid uuid DEFAULT uuid_generate_v4(),
    restaurantPhoto VARCHAR NOT NULL,
    restaurantName VARCHAR NOT NULL,
    restaurantAdress VARCHAR NOT NULL,
    restaurantOperationTime VARCHAR NOT NULL
)

INSERT INTO restaurants(restaurantPhoto, restaurantName, restaurantAdress, restaurantOperationTime)
VALUES ('linkdaimagem.com', 'Nome do restaurante', 'Endereço 121', 'de 00 as 23:59')
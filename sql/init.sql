CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS restaurants_final(
    uuid uuid DEFAULT uuid_generate_v4(),
    Photo VARCHAR NOT NULL,
    restaurantName VARCHAR NOT NULL,
    Adress VARCHAR NOT NULL,
    weekdaysworkinghours_open TIME NOT NULL,
    weekdaysworkinghours_end TIME NOT NULL,
    WeekendWorkingHours_open TIME NOT NULL,
    WeekendWorkingHours_end TIME NOT NULL
)

INSERT INTO restaurants(restaurantPhoto, restaurantName, restaurantAdress, restaurantOperationTime)
VALUES ('linkdaimagem.com', 'Nome do restaurante', 'Endereço 121', 'de 00 as 23:59')    
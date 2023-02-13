CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS restaurantsFinal(
    uuid uuid DEFAULT uuid_generate_v4(),
    Photo VARCHAR NOT NULL,
    restaurantName VARCHAR NOT NULL,
    Adress VARCHAR NOT NULL,
    weekdaysworkinghours_open TIME NOT NULL,
    weekdaysworkinghours_end TIME NOT NULL,
    WeekendWorkingHours_open TIME NOT NULL,
    WeekendWorkingHours_end TIME NOT NULL,
    PRIMARY KEY(uuid)
)

INSERT INTO restaurantsFinal(Photo, restaurantName, Adress, weekdaysworkinghours_open, weekdaysworkinghours_end, WeekendWorkingHours_open, WeekendWorkingHours_end)
VALUES ('linkdaimagem.com', 'Nome do restaurante', 'Endereço 121', '08:00', '18:00', '10:00', '17:00')

CREATE TABLE IF NOT EXISTS products_4(
    product_uuid uuid DEFAULT uuid_generate_v4(),
    uuid_restaurant uuid,
    productPhoto VARCHAR NOT NULL,
    productName VARCHAR NOT NULL,
    productPrice FLOAT NOT NULL,
    category VARCHAR NOT NULL,
    isinpromotion BOOLEAN NOT NULL,
    promotionDescription VARCHAR NOT NULL,
    promotionalPrice FLOAT NOT NULL,
    promotionDay_open VARCHAR NOT NULL,
    promotionDay_end VARCHAR NOT NULL,
    promotionHours_open VARCHAR NOT NULL,
    promotionHours_end VARCHAR NOT NULL,
    PRIMARY KEY(uuid),
    CONSTRAINT fk_restaurantID FOREIGN KEY(uuid_restaurant) REFERENCES restaurantsFinal(uuid)
)

INSERT INTO products_4(productPhoto, productName, productPrice, category, isinpromotion, promotionalPrice, promotionDescription, promotionDay_open, promotionDay_end, promotionHours_open, promotionHours_end, uuid_restaurant)
VALUES('linkdoproduto.com', 'Nome do produto', 0.00 ,'categoria do produto', FALSE, 0.00, 'descrição', 'Segunda', 'sexta', '08:00', '18:00', '2dd46ff1-5545-4384-80b1-937a21d10351')

SELECT * 
FROM restaurantsFinal as R
JOIN products_3 as P ON R.uuid = P.uuid_restaurant
WHERE uuid =  

SELECT R.uuid, P.productphoto, P.productname, P.productprice, P.category, P.isinpromotion, P.uuid_restaurant
FROM restaurantsFinal as R JOIN products_4 as P 
ON R.uuid = P.uuid_restaurant 
WHERE uuid = '2dd46ff1-5545-4384-80b1-937a21d10351'

SELECT 
    R.uuid, 
    P.productphoto, 
    P.productname, 
    P.productprice, 
    P.category, 
    P.uuid_restaurant,
    P.isinpromotion,
    P.promotionDescription,
    P.promotionalPrice,
    P.promotionDay_open,
    P.promotionDay_end,
    P.promotionHours_open,
    P.promotionHours_end
FROM restaurantsFinal as R JOIN products_4 as P 
ON R.uuid = P.uuid_restaurant 
WHERE uuid = '2dd46ff1-5545-4384-80b1-937a21d10351'
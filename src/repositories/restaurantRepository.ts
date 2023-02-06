import db from "../db";
import Restaurant from "../models/Restaurant_model";


class RestaurantRepository{

    async findAllRestaurants(): Promise<Restaurant[]> {
        const query = `
        SELECT 
            restaurantPhoto, 
            restaurantName, 
            restaurantAdress, 
            restaurantOperationTime 
        FROM restaurants
        `;

        const { rows } = await  db.query<Restaurant>(query);
        return rows || [];
    }

    async findById(uuid:string): Promise<Restaurant> {
        const query = `
            SELECT 
                restaurantPhoto, 
                restaurantName, 
                restaurantAdress, 
                restaurantOperationTime 
            FROM restaurants WHERE uuid = $1
        `;

        const values = [uuid];
        const { rows } = await db.query<Restaurant>(query, values);
        const [ username ] = rows;

        return username;
    }

    async addRestaurant(restaurant:Restaurant): Promise<string>{

        const script = `
            INSERT INTO restaurants(
                restaurantPhoto, 
                restaurantName, 
                restaurantAdress, 
                restaurantOperationTime
            ) VALUES (
                $1, $2, $3, $4
            ) RETURNING uuid
        `;
        
        const values = [restaurant.photo, 
                        restaurant.name,
                        restaurant.adress,
                        restaurant.operationTime
        ];

        const { rows } = await db.query<{uuid:string}>(script, values);
        const [ newRestaurant ] = rows;

        return newRestaurant.uuid;
    }

    async updateRestaurant(restaurant:Restaurant): Promise<void>{
        const query = `
            UPDATE restaurants
            SET
                restaurantPhoto = $1,
                restaurantName = $2,
                restaurantAdress = $3,
                restaurantOperationTime = $4
            WHERE uuid = $5
        `;

        const values = [
            restaurant.photo, 
            restaurant.name, 
            restaurant.adress, 
            restaurant.operationTime, 
            restaurant.uuid
        ];

        await db.query(query, values);
    }

    async deleteRestaurant(uuid:string): Promise<void>{
        const query = `
            DELETE FROM restaurants
            WHERE uuid = $1
        `;

        const values = [uuid];
        await db.query(query, values);
    };
}

export default new RestaurantRepository();
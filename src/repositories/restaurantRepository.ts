import db from "../db";
import Restaurant from "../models/Restaurant_model";


class RestaurantRepository{

    async findAllRestaurants(): Promise<Restaurant[]> {
        const query = `
        SELECT 
            Photo, 
            restaurantName, 
            Adress,
            weekdaysworkinghours_open,
            weekdaysworkinghours_end,
            WeekendWorkingHours_open,
            WeekendWorkingHours_end 
        FROM restaurants_final
        `;

        const { rows } = await  db.query<Restaurant>(query);
        
        return rows || [];
    }

    async findById(uuid:string): Promise<Restaurant> {
        const query = `
            SELECT 
                Photo, 
                restaurantName, 
                Adress,
                weekdaysworkinghours_open,
                weekdaysworkinghours_end,
                WeekendWorkingHours_open,
                WeekendWorkingHours_end  
            FROM restaurants_final WHERE uuid = $1
        `;

        const values = [uuid];
        const { rows } = await db.query<Restaurant>(query, values);
        const [ restaurant ] = rows;

        return restaurant;
    }

    async addRestaurant(restaurant:Restaurant): Promise<string>{

        const script = `
            INSERT INTO restaurants_final(
                Photo, 
                restaurantName, 
                Adress,
                weekdaysworkinghours_open,
                weekdaysworkinghours_end,
                WeekendWorkingHours_open,
                WeekendWorkingHours_end 
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7
            ) RETURNING uuid
        `;
        
        const values = [restaurant.photo, 
                        restaurant.restaurantname,
                        restaurant.adress,
                        restaurant.weekdaysworkinghours_open,
                        restaurant.weekdaysworkinghours_end,
                        restaurant.weekendworkinghours_open,
                        restaurant.weekendworkinghours_end
        ];

        const { rows } = await db.query<{uuid:string}>(script, values);
        const [ newRestaurant ] = rows;

        return newRestaurant.uuid;
    }

    async updateRestaurant(restaurant:Restaurant): Promise<void>{
        const query = `
            UPDATE restaurants_final
            SET
                Photo = $1,
                restaurantName = $2,
                Adress = $3,
                weekdaysworkinghours_open = $4,
                weekdaysworkinghours_end = $5,
                WeekendWorkingHours_open = $6,
                WeekendWorkingHours_end = $7
            WHERE uuid = $8
        `;

        const values = [
                        restaurant.photo, 
                        restaurant.restaurantname,
                        restaurant.adress,
                        restaurant.weekdaysworkinghours_open,
                        restaurant.weekdaysworkinghours_end,
                        restaurant.weekendworkinghours_open,
                        restaurant.weekendworkinghours_end,
                        restaurant.uuid
        ];

        await db.query(query, values);
    }

    async deleteRestaurant(uuid:string): Promise<void>{
        const query = `
            DELETE FROM restaurants_final
            WHERE uuid = $1
        `;

        const values = [uuid];
        await db.query(query, values);
    };
}

export default new RestaurantRepository();
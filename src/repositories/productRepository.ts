import db from "../db";
import Restaurant from "../models/Restaurant_model";

class ProductRepository{
    async findAllProductsFromRestaurant(uuid: string): Promise<Restaurant[]>{
        const query = `
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
        WHERE uuid = $1   
        `;

        const values = [uuid]
        const { rows } =  await db.query<Restaurant>(query, values);
        console.log(rows);

        return rows || [];
    }

    async updateProduct(uuid: string){
        const query = `
            
        `
    };
}

export default new ProductRepository();
import db from "../db";
import Product from "../models/Product_model";
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

    async insertProduct(product: Product): Promise<string>{
        const query = `
                INSERT INTO products_4(
                    uuid_restaurant,
                    productphoto,
                    productname,
                    productprice,
                    category,
                    isinpromotion,
                    promotionDescription,
                    promotionalPrice,
                    promotionDay_open,
                    promotionDay_end,
                    promotionHours_open,
                    promotionHours_end
                )VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING product_uuid
        `

        const values = [
            product.uuid_restaurant,
            product.productphoto,
            product.productname,
            product.productprice,
            product.category,
            product.isinpromotion,
            product.promotiondescription,
            product.promotionalprice,
            product.promotionday_open,
            product.promotionday_end,
            product.promotionhours_open,
            product.promotionhours_end
        ]

        const { rows } = await db.query<{uuid: string}>(query, values);
        const [ newProduct ] = rows;

        return newProduct.uuid
    };

    async updateProduct(product:Product): Promise<void>{
        const query = `
            UPDATE products_4
            SET
                productphoto = $1,
                productname = $2,
                productprice = $3,
                category = $4,
                isinpromotion = $5,
                promotiondescription = $6,
                promotionalprice = $7,
                promotionday_open = $8,
                promotionday_end = $9,
                promotionhours_open = $10,
                promotionhours_end = $11
            WHERE product_uuid = $12
        `;

        const values = [
            product.productphoto,
            product.productname,
            product.productprice,
            product.category,
            product.isinpromotion,
            product.promotiondescription,
            product.promotionalprice,
            product.promotionday_open,
            product.promotionday_end,
            product.promotionhours_open,
            product.promotionhours_end,
            product.product_uuid
        ]

        await db.query(query, values);
    }

    async deleteUser(uuid:string): Promise<void>{
        const query = `
            DELETE FROM products_4
            WHERE product_uuid = $1
        ` 
        const values = [uuid]

        await db.query(query, values)
    }
}

export default new ProductRepository();
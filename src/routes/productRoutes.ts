import { Router, Request, Response, NextFunction } from 'express';
import productRepository from '../repositories/productRepository';
const productRoute = Router();

productRoute.get('/:uuid', async (req:Request, res:Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const findProducts = await productRepository.findAllProductsFromRestaurant(uuid);
    const final_result = findProducts.map( product => {
        if(product.isinpromotion){
            const promo_obj = {
                photo: product.productphoto,
                name: product.productname,
                price: product.promotionalPrice,
                category: product.category,
                promotionDescription: product.promotionDescription,
                promotionDay_open: product.promotionDay_open,
                promotionDay_end: product.promotionDay_end,
                promotionHours_open: product.promotionHours_open,
                promotionHours_end: product.promotionHours_end
            }

            return promo_obj
        } else{
            const norm_obj = {
                photo: product.productphoto,
                name: product.productname,
                price: product.productprice,
                category: product.category,
            }

            return norm_obj;
        }
    });
    res.status(200).send(final_result);
});

export default productRoute;
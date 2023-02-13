import { Router, Request, Response, NextFunction } from 'express';
import productRepository from '../repositories/productRepository';
const productRoute = Router();

productRoute.get('/:uuid', async (req:Request, res:Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const findProducts = await productRepository.findAllProductsFromRestaurant(uuid);
    const final_result: object[] = []
    findProducts.map( product => {
        if(product.isinpromotion == true){
            const promo_obj = {
                photo: product.productphoto,
                name: product.productname,
                price: product.productprice,
                promotional_price: product.promotionalprice,
                category: product.category,
                promotionDescription: product.promotionDescription,
                promotionDay_open: product.promotionday_open,
                promotionDay_end: product.promotionday_end,
                promotionHours_open: product.promotionhours_open,
                promotionHours_end: product.promotionhours_end
            }

            final_result.push(promo_obj)
        } else if(product.isinpromotion == false){
            const norm_obj = {
                photo: product.productphoto,
                name: product.productname,
                price: product.productprice,
                category: product.category,
            }

            final_result.push(norm_obj);
        }
    });
    res.status(200).send(final_result);
});

productRoute.post('/', async (req:Request, res:Response, next: NextFunction) => {
    const newProduct = req.body;
    const final_result = await productRepository.insertProduct(newProduct);
    res.status(201).send(final_result);
})

export default productRoute;
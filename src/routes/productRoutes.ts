import { Router, Request, Response, NextFunction } from 'express';
import productRepository from '../repositories/productRepository';
import Error_handler from '../errors/errors';
import Product from '../models/Product_model';
import textFormatter from '../controllers/textFormatter';
import productController from '../controllers/productController';
const productRoute = Router();

productRoute.get('/:uuid', async (req:Request, res:Response, next: NextFunction) => {
    productController.findAllProductsFromRestaurant(req, res, next);
});

productRoute.post('/:uuid', async (req:Request, res:Response, next: NextFunction) => {
    productController.addProductForRestaurant(req, res, next);
});

productRoute.put('/:uuid', async (req:Request, res:Response, next: NextFunction) =>{
    productController.updateProduct(req, res, next);
});

productRoute.delete('/:uuid', async (req:Request, res:Response, next: NextFunction) =>{
    productController.deleteProduct(req, res, next);
})

export default productRoute;
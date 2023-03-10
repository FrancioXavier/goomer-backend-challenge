import { NextFunction, Request, Response } from 'express';
import textFormatter from '../controllers/textFormatter';
import Error_handler from '../errors/errors';
import productRepository from '../repositories/productRepository';

class productController{
    async findAllProductsFromRestaurant(req: Request, res: Response, next: NextFunction){
        const uuid = req.params.uuid
        const findProducts = await productRepository.findAllProductsFromRestaurant(uuid);
        const final_result = textFormatter.promotionValidator(findProducts);
        res.status(200).send(final_result);
    }

    async addProductForRestaurant(req: Request, res: Response, next: NextFunction){
        const uuid_restaurant = req.params.uuid
        const newProduct = req.body;
        newProduct.uuid_restaurant = uuid_restaurant;
        const hours: string[] = [
            newProduct.promotionhours_open,
            newProduct.promotionhours_end
        ]
        const errors:object[] = []
        Error_handler.hourFormatter(hours, errors);

        if(errors.length === 0){
            const final_result = await productRepository.insertProduct(newProduct);
            res.status(201).send(final_result);
        } else {
            res.status(400).send(errors);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction){
        const uuid = req.params.uuid;
        const updatedProduct = req.body;
        updatedProduct.product_uuid = uuid;
        await productRepository.updateProduct(updatedProduct);
    
        res.status(200).json({message: `${updatedProduct.productname} atualizado com sucesso`});
    };

    async deleteProduct(req: Request, res: Response, next: NextFunction){
        const uuid = req.params.uuid;
        await productRepository.deleteProduct(uuid);

        res.status(200).json({message: 'Produto deletado com sucesso'});
    }

}

export default new productController();
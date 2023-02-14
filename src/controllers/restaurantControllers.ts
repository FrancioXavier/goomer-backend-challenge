import { NextFunction, Request, Response } from 'express';
import textFormatter from '../controllers/textFormatter';
import Error_handler from '../errors/errors';
import restaurantRepository from '../repositories/restaurantRepository';

class RestaurantController{
    async findAllRestaurants(req: Request, res: Response, next: NextFunction){
        const findRestaurants = await restaurantRepository.findAllRestaurants();
        const final_result = findRestaurants.map(restaurant => {
        const time = [
            restaurant.weekdaysworkinghours_open.split(':'),
            restaurant.weekdaysworkinghours_end.split(':'),
            restaurant.weekendworkinghours_open.split(':'),
            restaurant.weekendworkinghours_end.split(':')
        ]
        const res_obj = {
            name: restaurant.restaurantname,
            Photo: restaurant.photo,
            Adress: restaurant.adress,
            Working_Hours: `${textFormatter.hourTextResponse(time, true)}`
        };

        return res_obj;
        })
        res.status(200).send(final_result);
    }

    async findOneRestaurant(req: Request, res: Response, next: NextFunction){
        const uuid = req.params.uuid
        const findOneRestaurant = await restaurantRepository.findById(uuid);
        const time = [
            findOneRestaurant.weekdaysworkinghours_open.split(':'),
            findOneRestaurant.weekdaysworkinghours_end.split(':'),
            findOneRestaurant.weekendworkinghours_open.split(':'),
            findOneRestaurant.weekendworkinghours_end.split(':')
        ]
        const final_result = {
            Name: findOneRestaurant.restaurantname,
            Photo: findOneRestaurant.photo,
            Adress: findOneRestaurant.adress,
            Working_Hours: `${textFormatter.hourTextResponse(time, true)}`
        };

        res.status(200).send(final_result);
    }

    async inserRestaurant(req: Request, res: Response, next: NextFunction){
        const allRestaurants = await restaurantRepository.findAllRestaurants()
        const newRestaurant = req.body;
        const hours:string[] = [
            newRestaurant.weekdaysworkinghours_open,
            newRestaurant.weekdaysworkinghours_end,
            newRestaurant.weekendworkinghours_open,
            newRestaurant.weekendworkinghours_end
        ]

        const errors:object[] = []
        Error_handler.hourFormatter(hours, errors)
        Error_handler.adressValidation(allRestaurants, newRestaurant, errors);

        if(errors.length == 0){
            const newRestaurantID = await restaurantRepository.addRestaurant(newRestaurant);
            res.status(200).send(newRestaurantID);
        } else{
            res.status(400).send(errors)
        }
    }

    async updateRestaurant(req: Request, res: Response, next: NextFunction) {
        const uuid = req.params.uuid;
        const allRestaurants = await restaurantRepository.findAllRestaurants()
        const modifiedRestaurant = req.body;
        modifiedRestaurant.uuid = uuid;

        const hours:string[] = [
            modifiedRestaurant.weekdaysworkinghours_open,
            modifiedRestaurant.weekdaysworkinghours_end,
            modifiedRestaurant.weekendworkinghours_open,
            modifiedRestaurant.weekendworkinghours_end
        ]

        const errors:object[] = []
        Error_handler.hourFormatter(hours, errors)
        Error_handler.adressValidation(allRestaurants, modifiedRestaurant, errors);

        if(errors.length == 0){
            await restaurantRepository.updateRestaurant(modifiedRestaurant);
            res.sendStatus(200);
        } else{
            res.status(400).send(errors);
        }
    }

    async deleteRestaurant(req: Request, res: Response, next: NextFunction){
        const uuid = req.params.uuid;
        await restaurantRepository.deleteRestaurant(uuid);

        res.sendStatus(200);
    }
}

export default new RestaurantController();

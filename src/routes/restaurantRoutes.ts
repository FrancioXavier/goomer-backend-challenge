import { NextFunction, Request, Response, Router } from 'express';
import textFormatter from '../controllers/textFormatter';
import Error_handler from '../errors/errors';
import restaurantRepository from '../repositories/restaurantRepository';

const restaurantRoute = Router();

restaurantRoute.get('/', async (req:Request, res:Response, next: NextFunction) => {
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
});

restaurantRoute.get('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
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

});

restaurantRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
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
    
    
    
});

restaurantRoute.put('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedRestaurant = req.body;
    modifiedRestaurant.uuid = uuid;

    await restaurantRepository.updateRestaurant(modifiedRestaurant);

    res.sendStatus(200);
});

restaurantRoute.delete('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await restaurantRepository.deleteRestaurant(uuid);

    res.sendStatus(200);
});
export default restaurantRoute;
import { Router, Request, Response, NextFunction } from 'express';
import restaurantRepository from '../repositories/restaurantRepository';

const restaurantRoute = Router();

restaurantRoute.get('/', async (req:Request, res:Response, next: NextFunction) => {
    const findRestaurants = await restaurantRepository.findAllRestaurants();
    res.status(200).send(findRestaurants);
});

restaurantRoute.get('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const findOneRestaurant = await restaurantRepository.findById(uuid);
    res.status(200).send(findOneRestaurant);

});

restaurantRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const newRestaurant = req.body;
    const newRestaurantID = await restaurantRepository.addRestaurant(newRestaurant);
    res.status(200).send(newRestaurantID);
});

restaurantRoute.put('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedRestaurant = req.body;
    modifiedRestaurant.uuid = uuid;

    await restaurantRepository.updateRestaurant(modifiedRestaurant);

    res.sendStatus(200);
    // res.redirect(`/restaurants/${uuid}`);
});

restaurantRoute.delete('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await restaurantRepository.deleteRestaurant(uuid);

    res.sendStatus(200);
});
export default restaurantRoute;
import { NextFunction, Request, Response, Router } from 'express';
import restaurantControllers from '../controllers/restaurantControllers';

const restaurantRoute = Router();

restaurantRoute.get('/', (req: Request, res: Response, next: NextFunction) => {
    restaurantControllers.findAllRestaurants(req, res, next);
});

restaurantRoute.get('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    restaurantControllers.findOneRestaurant(req, res, next);

});

restaurantRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
    restaurantControllers.inserRestaurant(req, res, next);
});

restaurantRoute.put('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    restaurantControllers.updateRestaurant(req, res, next);
});

restaurantRoute.delete('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    restaurantControllers.deleteRestaurant(req, res, next);
});
export default restaurantRoute;
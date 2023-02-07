import { Router, Request, Response, NextFunction } from 'express';
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
            Working_Hours: `De segunda à sexta das ${time[0][0]}:${time[0][1]} as ${time[1][0]}:${time[1][1]} e de sábado à domingo de ${time[2][0]}:${time[2][1]} as ${time[3][0]}:${time[3][1]}`
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
        Working_Hours: `De segunda à sexta das ${time[0][0]}:${time[0][1]} as ${time[1][0]}:${time[1][1]} e de sábado à domingo de ${time[2][0]}:${time[2][1]} as ${time[3][0]}:${time[3][1]}`
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
    const hour_list: number[] = []
    const min_list: number[] = []
    hours.map(time => {
        console.log(`${time} - ${typeof time}`)
        let hour_min = time.split(':');
        let hour = hour_min[0]
        let min = hour_min[1];

        if(hour_min.length != 2) {
            errors.push({message: "Valores além de hora e minutos foram digitados"})
        }else if(hour.length != 2 || min.length != 2){
            errors.push({message: "Numero de caracteres de hora ou minutos maiores que o normal"})
        } else if (Number(hour) > 23 || Number(hour) < 0 && Number(min) > 59 || Number(min) < 0){
            errors.push({message: "Horário ou minuto fora do comum"})
        } else{
            hour_list.push(Number(hour))
            min_list.push(Number(min))
        }
    })
    if(hour_list[0] > hour_list[1] || hour_list[2] > hour_list[3]){
        errors.push({message: "Horário de inicio depois do horário de término"})
    }
    if(
        hour_list[0] == hour_list[1] && 
        min_list[1] - min_list[0] < 15 || 
        hour_list[2] == hour_list[3] && 
        min_list[3] - min_list[2] < 15
    ){
        errors.push({message: "Diferença entre horário de inicio e de termino deve ser maior que 15 minutos"})
    }
    allRestaurants.map(restaurant => {
        if(newRestaurant.adress === restaurant.adress){
            errors.push({message: "Endereço já existe"});
        }
    });
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
import Restaurant from "../models/Restaurant_model";

class Error_handler{
    hourFormatter(hours: string[], errors: object[]){
        const hour_list: number[] = [];
        const min_list: number[] = [];
        const response: any[] = []
        
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
        if(
            hour_list[0] == hour_list[1] && 
            min_list[1] - min_list[0] < 15 || 
            hour_list[2] == hour_list[3] && 
            min_list[3] - min_list[2] < 15
        ){
            errors.push({message: "Diferença entre horário de inicio e de termino deve ser maior que 15 minutos"})
        } if(hours.length === 4){
            if(hour_list[0] > hour_list[1] || hour_list[2] > hour_list[3]){
                errors.push({message: "Horário de inicio depois do horário de término"})
            }
        }
    
        response.push(errors);
        response.push(hour_list);
        response.push(min_list);
    
        return response;
    }

    adressValidation(allRestaurants: Restaurant[], newRestaurant: Restaurant, errors: object[]){
        allRestaurants.map(restaurant => {
            if(newRestaurant.adress === restaurant.adress){
                errors.push({message: "Endereço já existe"});
            }
        });
    }
}

export default new Error_handler();
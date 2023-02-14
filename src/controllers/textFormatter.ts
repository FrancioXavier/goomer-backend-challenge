import Restaurant from "../models/Restaurant_model";

class Text_Formatter{
    hourTextResponse(time: string[][], isRestaurant: boolean, days?: string[]): string{
        if(isRestaurant){
            return `De segunda à sexta das ${time[0][0]}:${time[0][1]} as ${time[1][0]}:${time[1][1]} e de sábado à domingo de ${time[2][0]}:${time[2][1]} as ${time[3][0]}:${time[3][1]}`
        } else if(days) {
            return `De ${days[0]} à ${days[1]}, começando ${time[0][0]}:${time[0][1]} de ${days[0]} e terminando ${days[1]} as ${time[1][0]}:${time[1][1]}`
        } else{
            return `ERRO AO DEFINIR HORÁRIO`
        }
        
    }

    promotionValidator(allProducts: Restaurant[]){
        const final_result: object[] = []
        allProducts.map( product => {
            if(product.isinpromotion == true){
                const time: string[][] = [
                    product.promotionhours_open.split(':'),
                    product.promotionhours_end.split(':')
                    
                ]
                const days: string[] = [
                    product.promotionday_open,
                    product.promotionday_end
                ]
                const promo_obj = {
                    photo: product.productphoto,
                    name: product.productname,
                    price: product.productprice,
                    promotional_price: product.promotionalprice,
                    category: product.category,
                    promotionDescription: product.promotionDescription,
                    promotionValidation: `${this.hourTextResponse(time, false, days)}`
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

        return final_result;
    }
}

export default new Text_Formatter();
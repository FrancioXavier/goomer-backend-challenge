type Restaurant = {
    uuid?: string;
    photo: string;
    restaurantname: string;
    adress: string;
    weekdaysworkinghours_open: string;
    weekdaysworkinghours_end: string;
    weekendworkinghours_open: string;
    weekendworkinghours_end: string;
    product_uuid?: string;
    productphoto: string;
    productname: string;
    productprice: string;
    category: string;
    isinpromotion: boolean;
    promotionDescription: string;
    promotionalPrice: string;
    promotionDay_open: string;
    promotionDay_end: string;
    promotionHours_open: string;
    promotionHours_end: string;
}

export default Restaurant;
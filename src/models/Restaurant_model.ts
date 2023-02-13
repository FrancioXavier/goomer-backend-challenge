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
    promotionalprice: string;
    promotionday_open: string;
    promotionday_end: string;
    promotionhours_open: string;
    promotionhours_end: string;
}

export default Restaurant;
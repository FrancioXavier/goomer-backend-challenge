type Product = {
    product_uuid?: string;
    uuid_restaurant: string;
    productphoto: string;
    productname: string;
    productprice: string;
    category: string;
    isinpromotion: boolean;
    promotiondescription: string;
    promotionalprice: string;
    promotionday_open: string;
    promotionday_end: string;
    promotionhours_open: string;
    promotionhours_end: string;
}

export default Product;
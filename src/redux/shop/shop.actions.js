import ShopActionTypes from './shop.types'; 

export const updateShop = (collectionMap) => ({
    type: ShopActionTypes.UPDATE_SHOP_DATA, 
    payload: collectionMap
}); 
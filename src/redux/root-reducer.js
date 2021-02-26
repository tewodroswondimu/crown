import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage object
// alternatively sessionStorage 

import cartReducer from './cart/cart.reducer';
import userReducer from './user/user-reducer'; 
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root', 
    storage, 
    whitelist: ['cart', 'directory', 'shop'] // an array of string names of reduces we want to store
}

const rootReducer = combineReducers({
    user: userReducer, 
    cart: cartReducer, 
    directory: directoryReducer, 
    shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer);

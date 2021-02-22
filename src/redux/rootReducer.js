import {combineReducers} from 'redux';

import shopReducer from './shop/shopReducer.js';
import platformReducer from './platform/platformReducer';
import cartReducer from './cart/cartReducer';
import userReducer from './user/userReducer';


export default combineReducers({
    platform: platformReducer,
    shop: shopReducer,
    cart: cartReducer,
    user: userReducer,
});

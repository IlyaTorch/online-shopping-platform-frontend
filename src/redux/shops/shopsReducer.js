import {ShopsActionTypes} from "./shopsTypes";


const INITIAL_STATE = []


const shopsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopsActionTypes.UPDATE_SHOPS_LIST:
            return action.payload;

        default:
            return state;
    }
}


export default shopsReducer;

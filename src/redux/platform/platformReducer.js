import {PlatformActionTypes} from './platformTypes';


const INITIAL_STATE = {
    shops: null,
    isFetching: false,
    errorMessage: undefined,
};


const platformReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
    case PlatformActionTypes.FETCH_SHOPS_START:
        return {
            ...state,
            isFetching: true,
        };
    case PlatformActionTypes.FETCH_SHOPS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            shops: action.payload,
        };
    case PlatformActionTypes.FETCH_SHOPS_FAILURE:
        return {
            ...state,
            isFetching: false,
            errorMessage: action.payload,
        };
    default:
        return state;
    }
};


export default platformReducer;

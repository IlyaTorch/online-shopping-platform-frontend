import {UserActionTypes} from './userTypes';


const INITIAL_STATE = {
    currentUser: null,
    loginError: false,
    errorMessage: undefined,
};

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
        return {
            ...state,
            currentUser: action.payload,
        };
    case UserActionTypes.SHOW_LOGIN_ERROR:
        return {
            ...state,
            loginError: true,
            errorMessage: action.payload,
        };
    case UserActionTypes.HIDE_LOGIN_ERROR:
        return {
            ...state,
            loginError: false,
            errorMessage: undefined,
        };

    default:
        return state;
    }
};


export default userReducer;

import {UserActionTypes} from './userTypes';


export const setCurrentUser = (user) => (
    {
        type: UserActionTypes.SET_CURRENT_USER,
        payload: user,
    }
);

export const showLoginError = (errorMessage) => {
    return (dispatch) => {
        dispatch({
            type: UserActionTypes.SHOW_LOGIN_ERROR,
            payload: errorMessage,
        });

        setTimeout(() => {
            dispatch(hideLoginError());
        }, 3000);
    };
};

export const hideLoginError = () => ({
    type: UserActionTypes.HIDE_LOGIN_ERROR,
});

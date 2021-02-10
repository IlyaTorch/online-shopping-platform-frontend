import {PlatformActionTypes} from './platformTypes';

import {API_SHOPS_URL} from '../../url-data/urlData';


export const fetchShopsStart = () => ({
    type: PlatformActionTypes.FETCH_SHOPS_START,
});

export const fetchShopsSuccess = (shops) => ({
    type: PlatformActionTypes.FETCH_SHOPS_SUCCESS,
    payload: shops,
});

export const fetchShopsFailure = (errorMessage) => ({
    type: PlatformActionTypes.FETCH_SHOPS_FAILURE,
    payload: errorMessage,
});

export const fetchShopsStartAsync = () => {
    return (dispatch) => {
        dispatch(fetchShopsStart());

        fetch(`${API_SHOPS_URL}/`)
            .then((response) => response.json())
            .then((shops) => dispatch(fetchShopsSuccess(shops)))
            .catch((error) => dispatch(fetchShopsFailure(error.message)));
    };
};

import {createSelector} from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser,
);

export const selectLoginErrorStatus = createSelector(
    [selectUser],
    (user) => user.loginError,
);

export const selectLoginErrorMessage = createSelector(
    [selectUser],
    (user) => user.errorMessage,
);

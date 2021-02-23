/* this function is return the object where it's in function the type must be same as the same type in user-reducer */
import {UserActionTypes} from "./user.types";

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});
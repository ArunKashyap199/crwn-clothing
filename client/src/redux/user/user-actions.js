/* this function is return the object where it's in function the type must be same as the same type in user-reducer */
import UserActionTypes from "./user.types";
import {userSagas} from "./user.sagas";

// Saga Actions For Google Sign In
export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});
export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});
export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

// Saga Actions For EMAIL Sign In
export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

// for checking the user is into the session or not
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION,
});

// for sign out
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
});
export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

// for sign up
// userCredentials for user, email and password and for display name after so we're passing instead of those props
export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});
export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
});
export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;

    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}});

export const getAuthUser = () => {
    return async (dispatch) => {
        const data = await authAPI.getAuthUser();
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
};

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(getAuthUser());
        } else {
            let loginError = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('Login', {_error: loginError}));
        }
    }
};

export const logout = () => {
    return async (dispatch) => {
        const data = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;
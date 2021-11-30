import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;

    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
const getCaptchaURL = (captchaURL) => ({type: GET_CAPTCHA_URL, payload: {captchaURL}});

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
            if (data.resultCode === 10) {
                dispatch(getCaptcha());
            }
            let loginError = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('Login', {_error: loginError}));
        }
    }
};

export const getCaptcha = () => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptcha();
        dispatch(getCaptchaURL(data.url));
    }
};

export const logout = () => {
    return async (dispatch) => {
        const data = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
};

export default authReducer;
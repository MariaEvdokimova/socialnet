import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

const initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false as boolean,
    captchaURL: null as null | string
}

export type InitialStateType = typeof initialState;

type ActionType = {
    type: string,
    payload?: Object
}

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;

    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
};

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
};

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type GetCaptchaURLActionPayloadType = {
    captchaURL: string | null
};

type GetCaptchaURLActionType = {
    type: typeof GET_CAPTCHA_URL,
    payload: GetCaptchaURLActionPayloadType
};

const getCaptchaURL = (captchaURL: string): GetCaptchaURLActionType => ({type: GET_CAPTCHA_URL, payload: {captchaURL}});

export const getAuthUser = () => {
    return async (dispatch: any) => {
        const data: any = await authAPI.getAuthUser();
        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string) => {
    return async (dispatch: any) => {
        const data: any = await authAPI.login(email, password, rememberMe, captcha);
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
    return async (dispatch: any) => {
        const data: any = await securityAPI.getCaptcha();
        dispatch(getCaptchaURL(data.url));
    }
};

export const logout = () => {
    return async (dispatch: any) => {
        const data: any = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
};

export default authReducer;
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaURL: null as null | string
}

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaURL: (captchaURL: string) => ({
        type: 'SN/AUTH/GET_CAPTCHA_URL',
        payload: {captchaURL}
    } as const)
}

export const getAuthUser = (): ThunkActionType => {
    return async (dispatch) => {
        const data = await authAPI.getAuthUser();
        if (data.resultCode === ResultCodeEnum.Success) {
            const {id, email, login} = data.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string): ThunkActionType => {
    return async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUser());
        } else {
            if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptcha());
            }
            let loginError = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('Login', {_error: loginError}));
        }
    }
};

export const getCaptcha = (): ThunkActionType => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptcha();
        dispatch(actions.getCaptchaURL(data.url));
    }
};

export const logout = (): ThunkActionType => {
    return async (dispatch) => {
        const data = await authAPI.logout();
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
};

export default authReducer;

//types
export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;
type ThunkActionType = BaseThunkType<ActionType | FormAction>;
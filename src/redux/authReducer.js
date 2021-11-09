import {authAPI, loginAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;

    }
}

export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login}});

export const getAuthUser = () => {
    return (dispatch) => {
        authAPI.getAuthUser().then(data => {
            if(data.resultCode === 0) {
                const {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        })
    }
};

export const loginUser = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        loginAPI.login(email, password, rememberMe, captcha).then(data => {
            console.log(data)
        })
    }
}

export default authReducer;
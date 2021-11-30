import {getAuthUser} from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const GET_UNHANDLED_ERROR_MESSAGE = 'GET_UNHANDLED_ERROR_MESSAGE';

const initialState = {
    initialized: false,
    errorMessage: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case GET_UNHANDLED_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state;

    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
const getUnhandledErrorMessage = (errorMessage) => ({type: GET_UNHANDLED_ERROR_MESSAGE, errorMessage});

export const initializeApp = () => {
    return (dispatch) => {
        dispatch(getAuthUser())
            .then(() => {
                dispatch(initializedSuccess())
            });
    }
}

export const catchError = (errorMessage) => {
    return (dispatch) => {
        dispatch(getUnhandledErrorMessage(errorMessage))
        setTimeout(() => dispatch(getUnhandledErrorMessage(null)), 2000);
    }
}

export default appReducer;
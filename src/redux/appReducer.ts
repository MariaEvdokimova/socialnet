import {getAuthUser} from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const GET_UNHANDLED_ERROR_MESSAGE = 'GET_UNHANDLED_ERROR_MESSAGE';

const initialState = {
    initialized: false,
    errorMessage: null as string | null
};

export type InitialStateType = typeof initialState;

type ActionType = {
    type: string,
    errorMessage: string
}

const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

type GetUnhandledErrorMessageActionType = {
    type: typeof GET_UNHANDLED_ERROR_MESSAGE,
    errorMessage: string | null
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});
const getUnhandledErrorMessage = (errorMessage: string | null): GetUnhandledErrorMessageActionType => ({type: GET_UNHANDLED_ERROR_MESSAGE, errorMessage});

export const initializeApp = () => {
    return (dispatch: Function) => {
        dispatch(getAuthUser())
            .then(() => {
                dispatch(initializedSuccess())
            });
    }
}

export const catchError = (errorMessage: string) => {
    return (dispatch: Function) => {
        dispatch(getUnhandledErrorMessage(errorMessage))
        setTimeout(() => dispatch(getUnhandledErrorMessage(null)), 2000);
    }
}

export default appReducer;
import {getAuthUser} from "./authReducer";
import {BaseThunkType, InferActionsTypes} from "./store";

const initialState = {
    initialized: false,
    errorMessage: null as string | null
};

const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        case 'SN/APP/GET_UNHANDLED_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state;

    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const),
    getUnhandledErrorMessage: (errorMessage: string | null) => ({
        type: 'SN/APP/GET_UNHANDLED_ERROR_MESSAGE',
        errorMessage
    } as const)
}

export const initializeApp = (): ThunkActionType => {
    return (dispatch: Function) => {
        dispatch(getAuthUser())
            .then(() => {
                dispatch(actions.initializedSuccess())
            });
    }
}

export const catchError = (errorMessage: string): ThunkActionType => {
    return (dispatch: Function) => {
        dispatch(actions.getUnhandledErrorMessage(errorMessage))
        setTimeout(() => dispatch(actions.getUnhandledErrorMessage(null)), 2000);
    }
}

export default appReducer;

//types
export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;
type ThunkActionType = BaseThunkType<ActionType, void>;

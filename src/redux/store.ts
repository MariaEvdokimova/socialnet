import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from './usersReducer';
import authReducer from "./authReducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./appReducer";

const RootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

});

type RootReducersType = typeof RootReducers;
export type AppStateType = ReturnType<RootReducersType>;

type PropertiesType<T> = T extends {[key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//For Redux Dev Tools Chrome
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

//const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
export default store;
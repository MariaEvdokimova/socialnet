import React, {PropsWithChildren} from 'react';
import {Redirect} from "react-router-dom";
import {connect, DispatchProp, Matching} from "react-redux";
import {AppStateType} from "../redux/store";
import {AnyAction} from "redux";

const mapStateToProps = (state: AppStateType) => (
    {
        isAuth: state.auth.isAuth
    }
);

type MapPropsType = {
    isAuth: boolean
};
type DispatchPropsType = {};

export function withAuthRedirect <CP> (WrappedComponent: React.ComponentType<CP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props;
        if(!isAuth) return <Redirect to='/login' />
        return <WrappedComponent {...restProps as CP} />
    }

    return connect<MapPropsType, DispatchPropsType, CP, AppStateType>(mapStateToProps)(RedirectComponent);
}

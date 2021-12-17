import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type MapDispatchToPropsType = {
    logout: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => (
    {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
);

export default connect(mapStateToProps, {logout})(HeaderContainer);
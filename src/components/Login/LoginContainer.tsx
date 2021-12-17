import {connect} from "react-redux";
import Login from "./Login";
import {login} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    isAuth: boolean,
    captchaURL: null | string
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: null | string) => void
}

type OwnPropsType={};

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, {login})(Login);
import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from './../common/FormControls/FormControl.module.css';

const LoginForm = ({handleSubmit, error, captchaURL}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('email', [required], Input, 'email')}
            {createField('password', [required], Input, 'password', {type: 'password'})}
            {createField('rememberMe', null, Input, null, {type: 'checkbox'}, 'remember me')}

            { captchaURL &&
            <div>
                {createField('captcha', [required], Input, 'Add captcha')}
                <img src={captchaURL} alt='captcha' width='200'/>
            </div>}

            <div>
                {error &&
                <div className={styles.form__common_error}>
                    {error}
                </div>
                }
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'Login'})(LoginForm);

const Login = ({captchaURL, login, isAuth, captcha}) => {

    const onSubmit = (value) => {
        login(value.email, value.password, value.rememberMe, value.captcha);
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL}/>
        </div>
    )
}

export default Login;
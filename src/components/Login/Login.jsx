import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from './../common/FormControls/FormControl.module.css';

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('email', [required], Input, 'email')}
            {createField('password', [required], Input, 'password', {type: 'password'})}
            {createField('rememberMe', null, Input, null, {type: 'checkbox'}, 'remember me')}

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

const Login = (props) => {
    const onSubmit = (value) => {
        props.login(value.email, value.password, value.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login;
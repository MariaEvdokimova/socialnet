import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from './../common/FormControls/FormControl.module.css';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name={'email'}
                           validate={[required]}
                           component={Input}
                           placeholder={'email'}/>
                </div>
                <div>
                    <Field name={'password'}
                           validate={[required]}
                           component={Input}
                           type={'password'}
                           placeholder={'password'}/>
                </div>
                <div>
                    <Field name={'rememberMe'} type={'checkbox'} component={Input}/> remember me
                </div>
                { props.error &&
                    <div className={styles.form__common_error}>
                        {props.error}
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
        props.login(value.email, value.password,value.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login;
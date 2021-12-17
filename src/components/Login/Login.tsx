import React, {FC, FormEvent} from 'react';
import {InjectedFormProps, reduxForm, SubmitHandler} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from './../common/FormControls/FormControl.module.css';

type LoginFormOwnProps = {
    captchaURL: null | string
};

const LoginForm: FC<InjectedFormProps<FormDataType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaURL}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<FormDataTypeKeys>('email', [required], Input, 'email')}
            {createField<FormDataTypeKeys>('password', [required], Input, 'password', {type: 'password'})}
            {createField<FormDataTypeKeys>('rememberMe', null, Input, undefined, {type: 'checkbox'}, 'remember me')}

            { captchaURL &&
            <div>
                {createField<FormDataTypeKeys>('captcha', [required], Input, 'Add captcha')}
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

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnProps>({form: 'Login'})(LoginForm);

type PropsType = {
    isAuth: boolean,
    captchaURL: null | string,
    login: (email: string, password: string, rememberMe: boolean, captcha: null | string) => void
};

type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
};

type FormDataTypeKeys = Extract<keyof FormDataType, string>;

const Login: FC<PropsType> = ({captchaURL, login, isAuth}) => {

    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha);
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
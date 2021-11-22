import React from 'react';
import styles from './FormControl.module.css';
import {required} from "../../../utils/validators/validators";
import {Field} from "redux-form";

const FormControl = ({input, meta, FormElement, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.form__control + ' ' + (hasError ? styles.error : '')}>
            <div>
                <FormElement {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};

export const Textarea = (props) => {
    return <FormControl {...props} FormElement='textarea'/>
};

export const Input = (props) => {
    return <FormControl {...props} FormElement='input'/>
};

export const createField = (name, validates, component, placeholder, props={}, text='') => {
    return <div>
        <Field name={name}
               validate={validates}
               component={component}
               placeholder={placeholder}
               type={props.type}
        />{text}
    </div>
};

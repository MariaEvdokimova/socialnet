import React, {FC} from 'react';
import styles from './FormControl.module.css';
import {FieldValidatorType, required} from "../../../utils/validators/validators";
import {Field, WrappedFieldProps} from "redux-form";

type FormElementType = {
    FormElement: string | any
};

const FormControl: FC<WrappedFieldProps & FormElementType> = ({input, meta, FormElement, ...props}) => {

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

export const Textarea: FC<WrappedFieldProps> = (props) => {
    return <FormControl {...props} FormElement='textarea'/>
};

export const Input: FC<WrappedFieldProps> = (props) => {
    return <FormControl {...props} FormElement='input'/>
};

export const createField = <TypeKey extends string> (name: TypeKey,
                            validates: Array<FieldValidatorType> | null,
                            component: FC<WrappedFieldProps>,
                            placeholder: string | undefined,
                            props={},
                            text='') => {
    return <div>
        <Field name={name}
               validate={validates}
               component={component}
               placeholder={placeholder}
               {...props}
        />{text}
    </div>
};

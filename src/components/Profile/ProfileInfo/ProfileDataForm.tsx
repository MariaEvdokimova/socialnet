import React, {FC} from 'react';
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../../common/FormControls/FormControl.module.css";
import {ProfileType} from "../../../types/types";

type ProfileFormType = {
    profile: ProfileType
}
export type FormDataType = ProfileType;

const ProfileForm: FC<InjectedFormProps<FormDataType, ProfileFormType> & ProfileFormType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>Fullname: {createField('fullName', [], Input, 'Add full name')}</div>
        <div>Looking for a job {createField('lookingForAJob', [], Input, '', {type: 'checkbox'})}</div>
        <div>Looking for a job description: {createField('lookingForAJobDescription', [], Textarea, 'Add text')}</div>
        <div>About me: {createField('aboutMe', [], Textarea, 'Add text')}</div>
        <div>Contacts: {
            Object.keys(profile.contacts).map(key => {
                return <div key={key}>{key}: {createField('contacts.'+key, [], Input, key)}</div>
            })
        }</div>
        <div>
            {error &&
            <div className={styles.form__common_error}>
                {error}
            </div>
            }
        </div>
        <button>Save</button>
    </form>
};

const ProfileDataForm = reduxForm<FormDataType, ProfileFormType>({form: 'ProfileForm'})(ProfileForm);

export default ProfileDataForm;
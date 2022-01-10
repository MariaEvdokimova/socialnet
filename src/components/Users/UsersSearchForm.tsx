import React from 'react';
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../redux/usersReducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
const userSearchFormValidate = (values: any) => {
    const errors = {};
    return errors
};

export const UsersSearchForm: React.FC<PropsType> = ({onFilterChanged}) => {

    const submit = (values: FilterType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void }) => {
        onFilterChanged(values);
        setSubmitting(false);
    }

    return <div>
        <Formik
            initialValues={{ term: '', friend: null}}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Users followed</option>
                        <option value="false">Users unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    </div>
};
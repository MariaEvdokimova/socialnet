import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import {Field, reduxForm} from "redux-form";

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newMessageText'} placeholder={'Enter your text'}/>
            </div>
            <button>Add message</button>
        </form>
    )
}

const DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm);

export const Dialogs = (props) => {

    const addNewMessage = (value) => {
        props.sendMessage(value.newMessageText);
    }

    return (
        <div className={classes.dialogs}>
            <ul className={classes.dialogs__users}>
                <DialogItem dialogs={props.dialogs}/>
            </ul>
            <div>
                <Messages messages={props.messages} />
            </div>
            <DialogsReduxForm onSubmit={addNewMessage} />
        </div>
    )
}
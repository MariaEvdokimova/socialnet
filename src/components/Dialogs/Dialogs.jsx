import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import {reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, Textarea} from "../common/FormControls/FormControls";

const maxLength = maxLengthCreator(30);

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField('newMessageText', [required, maxLength], Textarea, 'Enter your text')}
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
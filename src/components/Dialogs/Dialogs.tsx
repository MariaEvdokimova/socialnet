import React, {FC} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, Textarea} from "../common/FormControls/FormControls";
import {DialogsType, MessageType} from "../../types/types";

const maxLength = maxLengthCreator(30);

const DialogsForm: FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<FormDataKey>('newMessageText', [required, maxLength], Textarea, 'Enter your text')}
            <button>Add message</button>
        </form>
    )
}

const DialogsReduxForm = reduxForm<FormDataType>({form: 'dialogs'})(DialogsForm);

type DialogsPropsType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessageType>,
    sendMessage: (messageText: string) => void
};

type FormDataType = {
    newMessageText: string
};

type FormDataKey = Extract<keyof FormDataType, string>;

export const Dialogs = (props: DialogsPropsType) => {

    const addNewMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageText);
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
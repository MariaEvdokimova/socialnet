import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {actions} from "../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/store";
import {DialogsType, MessageType} from "../../types/types";
import React from "react";

type MapStateToPropsType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessageType>
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
};

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {sendMessage: actions.sendMessage})
)(Dialogs);

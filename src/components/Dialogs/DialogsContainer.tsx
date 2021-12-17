import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {actions} from "../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/store";
import {DialogsType, MessageType} from "../../types/types";

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

const sendMessage = actions.sendMessage;

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {sendMessage})
)(Dialogs);

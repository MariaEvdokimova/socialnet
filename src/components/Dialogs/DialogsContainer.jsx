import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {sendMessage} from "../../redux/dialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {sendMessage})
)(Dialogs);

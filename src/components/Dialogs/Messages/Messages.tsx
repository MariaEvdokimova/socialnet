import React, {FC} from "react";
import {MessageType} from "../../../types/types";

type MessagesType = {
    messages: Array<MessageType>
};

const Messages = (props: MessagesType) => {
    return <div>
        {props.messages.map((message) => <div key={message.id}>{message.text}</div>)}
    </div>
};

export default Messages;
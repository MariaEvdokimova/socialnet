import React from "react";

const Messages = (props) => {
    return props.messages.map( (message) => <div key={ message.id }>{message.text}</div>)
};

export default Messages;
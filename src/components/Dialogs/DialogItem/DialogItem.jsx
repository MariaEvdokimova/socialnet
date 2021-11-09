import {NavLink} from "react-router-dom";
import React from "react";

const DialogItem = (props) => {
    return props.dialogs.map((dialog) => {
        let path = "/dialogs/" + dialog.id;

        return (
            <li key={ dialog.id }>
                <NavLink to={path}>{dialog.name}</NavLink>
            </li>
        )
    }
)};

export default DialogItem;
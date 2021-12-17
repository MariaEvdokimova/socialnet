import {NavLink} from "react-router-dom";
import React from "react";
import {DialogsType} from "../../../types/types";

type DialogItemType = {
    dialogs: Array<DialogsType>
}

const DialogItem = (props: DialogItemType) => {
    return <div> {
        props.dialogs.map((dialog) => {
                let path = "/dialogs/" + dialog.id;

                return (
                    <li key={dialog.id}>
                        <NavLink to={path}>{dialog.name}</NavLink>
                    </li>
                )
            }
        )
    }
    </div>
};

export default DialogItem;
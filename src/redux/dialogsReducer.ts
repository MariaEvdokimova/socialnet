import {DialogsType, MessageType} from "../types/types";
import {InferActionsTypes} from "./store";

const initialState = {
    dialogs: [
        {id: 1, name: 'Den'},
        {id: 2, name: 'Ann'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, text: 'hello'},
        {id: 2, text: 'How are you'}
    ] as Array<MessageType>
};

const dialogsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD_MESSAGE_TEXT':
            let newMessages: any = {id: 6, text: action.newMessageText};
            return {
                ...state,
                messages: [...state.messages, newMessages],
            }
        default:
            return state;
    }
};

export const actions = {
    sendMessage: (newMessageText: string) => ({
        type: 'SN/DIALOGS/ADD_MESSAGE_TEXT',
        newMessageText
    } as const)
}

export default dialogsReducer;

//types
export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;

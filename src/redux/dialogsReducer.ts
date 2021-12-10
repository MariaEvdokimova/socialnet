const ADD_MESSAGE_TEXT = 'ADD_MESSAGE_TEXT';

type DialogsType = {
    id: number,
    name: string
};

type MessageType = {
    id: number,
    text: string
};

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

export type InitialStateType = typeof initialState;

type ActionType = {
    type: string,
    newMessageText?: string
};

const dialogsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE_TEXT:
            let newMessages: any = {id: 6, text: action.newMessageText};
            return {
                ...state,
                messages: [...state.messages, newMessages],
            }
        default:
            return state;
    }
};

type SendMessageActionType = {
    type: typeof ADD_MESSAGE_TEXT,
    newMessageText: string
};

export const sendMessage = (newMessageText: string): SendMessageActionType => ({type: ADD_MESSAGE_TEXT, newMessageText});

export default dialogsReducer;
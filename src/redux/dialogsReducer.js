const ADD_MESSAGE_TEXT = 'ADD_MESSAGE_TEXT';

const initialState = {
    dialogs: [
        {id: 1, name: 'Den'},
        {id: 2, name: 'Ann'}
    ],
    messages: [
        {id: 1, text: 'hello'},
        {id: 2, text: 'How are you'}
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE_TEXT:
            let newMessages = {id: 6, text: action.newMessageText};
            return {
                ...state,
                messages: [...state.messages, newMessages],
            }
        default:
            return state;
    }
};

export const sendMessage = (newMessageText) => ({type: ADD_MESSAGE_TEXT, newMessageText});

export default dialogsReducer;
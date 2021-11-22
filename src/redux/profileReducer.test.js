import avatar from "../assets/images/avatar_snoopy.png";
import profileReducer, {addPostText} from "./profileReducer";

const state = {
    posts:[
        {id: 1, text: 'Hello', likesCount: 0, avatar: avatar},
        {id: 2, text: 'yoyo', likesCount: 0, avatar: avatar}
    ],
};

test('renders learn react link', () => {
    const action = addPostText('test text');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});
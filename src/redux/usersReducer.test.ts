import usersReducer, {actions, InitialStateType} from './usersReducer';

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {id: 0, followed: false, name: 'User 0', photos: {small: null, large: null}, status: 'Status 0'},
            {id: 1, followed: false, name: 'User 1', photos: {small: null, large: null}, status: 'Status 1'},
            {id: 2, followed: true, name: 'User 2', photos: {small: null, large: null}, status: 'Status 2'},
            {id: 3, followed: true, name: 'User 3', photos: {small: null, large: null}, status: 'Status 3'}
        ],
        totalUsers: 0,
        currentPage: 1,
        pageSize: 10,
        portionSize: 10,
        isFetching: false,
        usersFollowInProgress: []
    };
})

test('follow success', () => {
    let newState = usersReducer(state, actions.toggleFollowed(1));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test('unfollow success', () => {
    let newState = usersReducer(state, actions.toggleFollowed(2));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeFalsy();
})
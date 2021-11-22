import {userAPI} from "../api/api";

const TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS = 'SET_TOTAL_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_USERS_FOLLOWING_PROGRESS = 'TOGGLE_USERS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    totalUsers: 0,
    currentPage: 1,
    pageSize: 10,
    portionSize: 10,
    isFetching: false,
    usersFollowInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case TOGGLE_FOLLOWED:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: !user.followed};
                    }
                    return user;
                })
            }
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsers: action.countUsers
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_USERS_FOLLOWING_PROGRESS:
            return {
                ...state,
                usersFollowInProgress: action.isFetching
                    ? [...state.usersFollowInProgress, action.userId]
                    : state.usersFollowInProgress.filter(userId => userId !== action.userId)
            }
        default:
            return state;
    }
}

export const toggleFollowed = (userId) => ({type: TOGGLE_FOLLOWED, userId: userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setTotalUsers = (countUsers) => ({type: SET_TOTAL_USERS, countUsers});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleUsersFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_USERS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));

        const data = await userAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsers(data.totalCount));
    }
};

const followUnfollowFlow = async (dispatch, userId, apiMethod) => {
    dispatch(toggleUsersFollowingProgress(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(toggleFollowed(userId));
    }
    dispatch(toggleUsersFollowingProgress(false, userId));

};

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI));
    }
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI));
    }
};

export default usersReducer;
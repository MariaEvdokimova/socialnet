import {userAPI} from "../api/api";
import {UsersType} from "../types/types";

const TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS = 'SET_TOTAL_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_USERS_FOLLOWING_PROGRESS = 'TOGGLE_USERS_FOLLOWING_PROGRESS';

const initialState = {
    users: [] as Array<UsersType>,
    totalUsers: 0 as number,
    currentPage: 1 as number,
    pageSize: 10 as number,
    portionSize: 10 as number,
    isFetching: false as boolean,
    usersFollowInProgress: [] as Array<number> // array of users ids
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
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

type ToggleFollowedActionType = {
    type: typeof TOGGLE_FOLLOWED,
    userId: number
}
export const toggleFollowed = (userId: number): ToggleFollowedActionType => ({type: TOGGLE_FOLLOWED, userId: userId});
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, users});
type SetTotalUsersActionType = {
    type: typeof SET_TOTAL_USERS,
    countUsers: number
}
export const setTotalUsers = (countUsers: number): SetTotalUsersActionType => ({type: SET_TOTAL_USERS, countUsers});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
type ToggleUsersFollowingProgressActionType = {
    type: typeof TOGGLE_USERS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toggleUsersFollowingProgress = (isFetching: boolean, userId: number): ToggleUsersFollowingProgressActionType => ({
    type: TOGGLE_USERS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));

        const data: any = await userAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsers(data.totalCount));
    }
};

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: Function) => {
    dispatch(toggleUsersFollowingProgress(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(toggleFollowed(userId));
    }
    dispatch(toggleUsersFollowingProgress(false, userId));

};

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI));
    }
};

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI));
    }
};

export default usersReducer;
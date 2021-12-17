import {ResultCodeEnum} from "../api/api";
import {UsersType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import { Dispatch } from "redux";
import {userAPI} from "../api/users-api";

const initialState = {
    users: [] as Array<UsersType>,
    totalUsers: 0,
    currentPage: 1,
    pageSize: 10,
    portionSize: 10,
    isFetching: false,
    usersFollowInProgress: [] as Array<number> // array of users ids
};

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }
        case 'SN/USERS/TOGGLE_FOLLOWED':
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: !user.followed};
                    }
                    return user;
                })
            }
        case 'SN/USERS/SET_TOTAL_USERS':
            return {
                ...state,
                totalUsers: action.countUsers
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SN/USERS/TOGGLE_USERS_FOLLOWING_PROGRESS':
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

export const actions = {
    toggleFollowed: (userId: number) => ({type: 'SN/USERS/TOGGLE_FOLLOWED', userId: userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setTotalUsers: (countUsers: number) => ({type: 'SN/USERS/SET_TOTAL_USERS', countUsers} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleUsersFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_USERS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
};

export const requestUsers = (page: number, pageSize: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.toggleIsFetching(true));

        const data = await userAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsers(data.totalCount));
    }
};

const followUnfollowFlow = async (dispatch: Dispatch<ActionType>, userId: number, apiMethod: any) => {
    dispatch(actions.toggleUsersFollowingProgress(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.toggleFollowed(userId));
    }
    dispatch(actions.toggleUsersFollowingProgress(false, userId));

};

export const follow = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI));
    }
};

export const unfollow = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI));
    }
};

export default usersReducer;

//types
export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;
type ThunkActionType = BaseThunkType<ActionType>;
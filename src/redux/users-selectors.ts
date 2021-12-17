import {AppStateType} from "./store";

export const getUsers = (state: AppStateType) => state.usersPage.users;
export const getTotalUsers = (state: AppStateType) => state.usersPage.totalUsers;
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage;
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching;
export const getUsersFollowInProgress = (state: AppStateType) => state.usersPage.usersFollowInProgress;
export const getportionSize = (state: AppStateType) => state.usersPage.portionSize;
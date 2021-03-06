import {UsersType} from "../types/types";
import {instance, APIResponseType} from "./api";

type GetUsersType = {
    items: Array<UsersType>,
    totalCount: number,
    error: string
};

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    }
}
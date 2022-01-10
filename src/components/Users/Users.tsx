import React, {FC} from 'react';
import Pagination from "../common/Pagination/Pagination";
import User from "./User";
import {UsersType} from "../../types/types";
import { UsersSearchForm } from './UsersSearchForm';
import {FilterType} from "../../redux/usersReducer";

type PropsType = {
    totalUsers: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (pageNumber: number) => void,
    usersFollowInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    portionSize: number,
    users: Array<UsersType>,
    onFilterChanged: (filter: FilterType) => void
};

const Users: FC<PropsType> = ({totalUsers, pageSize, currentPage, onPageChange, usersFollowInProgress, unfollow, follow, portionSize, ...props}) => {

    return <div>

        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

        <Pagination totalItems={totalUsers} pageSize={pageSize} currentPage={currentPage} portionSize={portionSize} onPageChange={onPageChange}/>
        <div>
            {
                props.users.map((user) => <User key={user.id}
                    user={user}
                    usersFollowInProgress={usersFollowInProgress}
                    unfollow={unfollow}
                    follow={follow}
                />)
            }
        </div>
    </div>
}

export default Users;
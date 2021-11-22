import React from 'react';
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

const Users = ({totalUsers, pageSize, currentPage, onPageChange, usersFollowInProgress, unfollow, follow, portionSize, ...props}) => {

    return <div>
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
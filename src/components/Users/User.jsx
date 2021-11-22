import React from 'react';
import avatar from '../../assets/images/snoopy_avatar.jpg';
import {NavLink} from "react-router-dom";

const User = ({user, usersFollowInProgress, unfollow, follow}) => {
    return <div>
        <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small ? user.photos.small : avatar} alt='avatar' width='50'/>
        </NavLink>
        <div>
            {
                user.followed
                    ? <button disabled={usersFollowInProgress.some(userId => userId === user.id)}
                              onClick={() => unfollow(user.id)}>
                        Unfollow</button>
                    : <button disabled={usersFollowInProgress.some(userId => userId === user.id)}
                              onClick={() => follow(user.id)}>
                        Follow</button>
            }
        </div>
        <div>
            {user.name}
            {user.status}
        </div>
        {/* <div>
                    {user.location.city}
                    {user.location.country}
                </div>*/}
    </div>

}
export default User;
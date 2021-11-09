import React from 'react';
import avatar from '../../assets/images/snoopy_avatar.jpg';
import styles from './Users.module.css';
import {NavLink} from "react-router-dom";

const Users = (props) => {

    let countPages = Math.ceil(props.totalUsers / props.pageSize);
    let pages = [];

    for(let i=1; i <= countPages; i++) {
        pages.push(i);
    }

    return <div>
    <div>
        {
            pages.map((page) => {
                return <span
                    className={props.currentPage === page && styles.users_page__selected}
                    onClick={ () => {props.onPageChange(page)} } >
                    {page}
                </span>
            })
        }
    </div>
    <ul>
        {
            props.users.map((user) => <li key={user.id}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small ? user.photos.small : avatar} alt='avatar' width='50'/>
                </NavLink>

                <div>
                    {
                        user.followed
                            ? <button disabled={props.usersFollowInProgress.some(userId => userId === user.id)}
                                      onClick={() => props.unfollow(user.id)}>
                                Unfollow</button>
                            : <button disabled={props.usersFollowInProgress.some(userId => userId === user.id)}
                                      onClick={() => props.follow(user.id)}>
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
            </li>)
        }
    </ul>
    </div>
}
export default Users;
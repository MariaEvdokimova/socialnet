import React from 'react';
import classes from './Navbar.module.css'
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <div className={classes.navbar__wrapper}>
            <ul className={classes.navbar__list}>
                <li><Link to={"/profile"}>Profile</Link></li>
                <li><Link to={'/dialogs'}>Dialogs</Link></li>
                <li><Link to={'/users'}>Users</Link></li>
            </ul>
        </div>
    )
};
import React from 'react';
import classes from './Header.module.css'
import logo from '../../assets/images/pngegg.png';
import {NavLink} from "react-router-dom";

export const Header = (props) => {
    return (
        <header className={classes.header__wrapper}>
            <img alt='logo' src={logo} className={classes.header__logo}/>
            <div>
                { props.isAuth ? props.login
                    : <NavLink to='/login' className={classes.header__login}>Login</NavLink> }
            </div>
        </header>
    )
};

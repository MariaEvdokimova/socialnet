import React from 'react';
import classes from './Header.module.css'
import logo from '../../assets/images/pngegg.png';
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean,
    login: string | null,
    logout: () => void
}

export const Header = (props: PropsType) => {
    return (
        <header className={classes.header__wrapper}>
            <img alt='logo' src={logo} className={classes.header__logo}/>
            <div>
                { props.isAuth
                    ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to='/login' className={classes.header__login}>Login</NavLink> }
            </div>
        </header>
    )
};

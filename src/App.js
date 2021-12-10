import React, {Suspense} from 'react';
import classes from './App.module.css';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect, Provider} from 'react-redux';
import {compose} from "redux";
import {catchError, initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/store";
import Error from "./components/common/Error/Error";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {

    catchAllUnhandledErrors = (event) => {
        this.props.catchError(event.reason);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div>
                {this.props.errorMessage && <Error errorMessage={this.props.errorMessage}/>}

                <HeaderContainer/>
                <div className={classes.main__wrapper}>
                    <Navbar/>
                    <div>
                        <Switch>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <LoginContainer/>}/>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    <Redirect exact from="/" to="/profile"/>
                                    <Redirect exact from="/socialnet" to="/profile"/>
                                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                                    <Route path='*' render={() => <div>404 PAGE NOT FOUND</div>}/>
                                </Switch>
                            </Suspense>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    errorMessage: state.app.errorMessage
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp, catchError})
)(App);

const SocialnetApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};

export default SocialnetApp;

import React, {Suspense} from 'react';
import classes from'./App.module.css';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect, Provider} from 'react-redux';
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/store";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(()=>import("./components/Profile/ProfileContainer")) ;

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div>
                <HeaderContainer/>
                <div className={classes.main__wrapper}>
                    <Navbar/>
                    <div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route path='/profile/:userId?' render={()=><ProfileContainer/>}/>
                            <Route path='/dialogs' render={()=><DialogsContainer/>}/>
                        </Suspense>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const SocialnetApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};

export default SocialnetApp;

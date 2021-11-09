import React from 'react';
import classes from'./App.module.css';
import {Route} from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = () => {
  return (
      <div>
          <HeaderContainer />
          <div className={classes.main__wrapper}>
              <Navbar />
              <div>
                  <Route path='/profile/:userId?' render={()=> <ProfileContainer />} />
                  <Route path='/dialogs' render={()=><DialogsContainer />} />
                  <Route path='/users' render={()=><UsersContainer />} />
                  <Route path='/login' render={()=><Login />} />
              </div>
          </div>
      </div>
  );
}

export default App;

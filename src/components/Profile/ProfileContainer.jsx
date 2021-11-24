import React from 'react';
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {getProfile, getUserStatus, savePhoto, updateUserStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        isOwner={!this.props.match.params.userId}
                        status={this.props.status}
                        updateUserStatus={this.props.updateUserStatus}
                        savePhoto={this.props.savePhoto}
        />
    }
}

const mapStateToProps = (state) => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.userId
    }
);

export default compose(
    connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus, savePhoto}),
    withRouter
)(ProfileContainer);

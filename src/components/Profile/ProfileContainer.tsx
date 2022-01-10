import React, {ReactNode} from 'react';
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {getProfile, getUserStatus, savePhoto, saveProfileData, updateUserStatus} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    profile: ProfileType | null,
    status: string,
    isProfileUpdateSuccess: string,
    authUserId: number | null,
    error: string | null
}

type MapDispatchToPropsType = {
    getProfile: (userId: number | null) => void,
    getUserStatus: (userId: number) => void,
    updateUserStatus: (status: string) => void,
    savePhoto: (photo: File) => void,
    saveProfileData: (profile: ProfileType) => void
}

type RouteInfo = {
    userId: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<RouteInfo>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getProfile(userId);
        this.props.getUserStatus(userId as number);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
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
                        saveProfileData={this.props.saveProfileData}
                        isProfileUpdateSuccess={this.props.isProfileUpdateSuccess}
                        error={this.props.error}
        />
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isProfileUpdateSuccess: state.profilePage.isProfileUpdateSuccess,
        authUserId: state.auth.userId,
        error: state.profilePage.error
    }
);

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus, savePhoto, saveProfileData}),
    withRouter
)(ProfileContainer);

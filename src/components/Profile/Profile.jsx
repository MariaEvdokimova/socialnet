import React from 'react';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export const Profile = (props) => {
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         saveProfileData={props.saveProfileData}
                         isProfileUpdateSuccess={props.isProfileUpdateSuccess}
                         error={props.error}
            />
            <PostsContainer />
        </div>
    )
};

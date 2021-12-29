import React, {FC} from 'react';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType,
    status: string,
    isProfileUpdateSuccess: string,
    error: string | null,
    isOwner: boolean
    updateUserStatus: (status: string) => void,
    savePhoto: (photo: File) => void,
    saveProfileData: (profile: ProfileType) => void
}

export const Profile: FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         isProfileUpdateSuccess={props.isProfileUpdateSuccess}
                         error={props.error}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         updateUserStatus={props.updateUserStatus}
                         saveProfileData={props.saveProfileData}
                         />
            <PostsContainer />
        </div>
    )
};

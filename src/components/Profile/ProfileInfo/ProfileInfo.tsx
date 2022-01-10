import React, {ChangeEvent, useEffect, useState} from 'react';
import classes from "./ProfileInfo.module.css";
import pic from "../../../assets/images/pic.jpg";
import Preloader from "../../common/Preloader/Preloader";
import avatar from '../../../assets/images/snoopy_avatar.jpg'
import ProfileStatus from "./ProfileStatus";
import ProfileData from "./ProfileData";
import {ProfileType} from "../../../types/types";
import ProfileDataForm, {FormDataType} from './ProfileDataForm';

type PropsType = {
    isOwner: boolean,
    profile: ProfileType | null,
    status: string,
    isProfileUpdateSuccess: string,
    error: string | null,
    updateUserStatus: (newStatus: string) => void,
    saveProfileData: (profile: ProfileType) => void,
    savePhoto: (photo: File) => void
}

const ProfileInfo: React.FC<PropsType> = ({savePhoto, isOwner, profile, status, updateUserStatus, saveProfileData, isProfileUpdateSuccess, error}) => {

    const [editMode, changeEditMode] = useState(false);

    useEffect(()=>{
        if (isProfileUpdateSuccess === 'success') {
            changeEditMode(false)
        }
    },[isProfileUpdateSuccess]);

    const onSubmit = (formData: FormDataType) => {
        saveProfileData(formData);
    }

    if (!profile) {
        return <Preloader />
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    };

    return (
        <div>
            <div className={classes.profile__pic}>
                <img src={pic} alt='picture' width='1000' height='437'/>
            </div>
            <div className={classes.profile__wrapper}>
                <div className={classes.profile__avatar_wrapper}>
                    <img className={classes.profile__avatar}
                          src={profile.photos?.large || avatar}
                          alt='avatar'/>
                    <ProfileStatus status={status} updateUserStatus={updateUserStatus} error={error}/>
                    {isOwner && <input type='file' onChange={onPhotoSelected}/>}
                </div>
                { editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} onEditMode={ ()=> changeEditMode(true) }/>
                }
            </div>
        </div>
    )
};

export default ProfileInfo;
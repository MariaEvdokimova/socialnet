import React from 'react';
import classes from "./ProfileInfo.module.css";
import pic from "../../../assets/images/pic.jpg";
import Preloader from "../../common/Preloader/Preloader";
import avatar from '../../../assets/images/snoopy_avatar.jpg'
import ProfileInfoContacts from "./ProfileInfoContacts/ProfileInfoContacts";
import lookingJob from '../../../assets/images/looking-for-a-job.png';
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({savePhoto, isOwner, profile, status, updateUserStatus}) => {

    if (!profile) {
        return <Preloader />
    }

    const onPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };

    return (
        <div>
            <div className={classes.profile__pic}>
                <img src={pic} alt='picture' width='1000' height='437'/>
            </div>
            <div className={classes.profile__wrapper}>
                <div><img className={classes.profile__avatar}
                          src={profile.photos.large || avatar}
                          alt='avatar'/>
                    {isOwner && <input type='file' onChange={onPhotoSelected}/>}
                </div>
                <div className={classes.profile__desc}>
                    <div className={classes.profile__name}>{profile.fullName}</div>
                    <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
                    <div className={classes.profile__about}>{profile.aboutMe}</div>
                    <ProfileInfoContacts contacts={profile.contacts}/>
                    { profile.lookingForAJob && <div>
                        <img src={lookingJob} alt='looking For A Job' width='20px'/>
                        <span>{profile.lookingForAJobDescription}</span>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default ProfileInfo;
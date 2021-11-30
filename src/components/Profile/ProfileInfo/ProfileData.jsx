import React from 'react';
import classes from "./ProfileInfo.module.css";
import ProfileInfoContacts from "./ProfileInfoContacts/ProfileInfoContacts";

const ProfileData = ({isOwner, profile, onEditMode}) => {

    return (
        <div className={classes.profile__desc}>
            {
                isOwner && <button onClick={onEditMode}>Edit profile</button>
            }
            <div className={classes.profile__name}>{profile.fullName}</div>
            <div className={classes.profile__about}>{profile.aboutMe}</div>
            <ProfileInfoContacts contacts={profile.contacts}/>

            {profile.lookingForAJob && <div>
                <b>Looking for a job</b>:
                <div className={classes.profile__job_desc}>{profile.lookingForAJobDescription}</div>
            </div>
            }

        </div>
    )


};

export default ProfileData;
import React from 'react';
import classes from "./ProfileInfo.module.css";
import pic from "../../../assets/images/pic.jpg";
import Preloader from "../../common/Preloader/Preloader";
import avatar from '../../../assets/images/snoopy_avatar.jpg'
import ProfileInfoContacts from "./ProfileInfoContacts/ProfileInfoContacts";
import lookingJob from '../../../assets/images/looking-for-a-job.png';
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={classes.profile__pic}>
                <img src={pic} alt='picture' width='1000' height='437'/>
            </div>
            <div className={classes.profile__wrapper}>
                <div><img className={classes.profile__avatar}
                          src={props.profile.photos.large ? props.profile.photos.large : avatar}
                          alt='avatar'/>
                </div>
                <div className={classes.profile__desc}>
                    <div className={classes.profile__name}>{props.profile.fullName}</div>
                    <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
                    <div className={classes.profile__about}>{props.profile.aboutMe}</div>
                    <ProfileInfoContacts contacts={props.profile.contacts}/>
                    { props.profile.lookingForAJob && <div>
                        <img src={lookingJob} alt='looking For A Job' width='20px'/>
                        <span>{props.profile.lookingForAJobDescription}</span>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default ProfileInfo;
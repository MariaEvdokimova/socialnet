import React from 'react';
import vk from '../../../../assets/images/VK.png';
import facebook from '../../../../assets/images/Facebook.png';
import website from '../../../../assets/images/website.png';
import twitter from '../../../../assets/images/Twitter.png';
import youtube from '../../../../assets/images/YouTube.png';
import instagram from '../../../../assets/images/Instagram.png';
import github from '../../../../assets/images/github.png';
import mainLink from '../../../../assets/images/main link.png';
import {ContactsType} from "../../../../types/types";

type PropsType = {
    contacts: ContactsType
}

const ProfileInfoContacts: React.FC<PropsType> = ({contacts}) => {

    const linksImg = {facebook, website, vk, twitter, instagram, youtube, github, mainLink};

    return <div>
        { contacts &&
        Object.keys(contacts).map(key => {
            return <a key={key} href={contacts[key as keyof ContactsType]}>
                {
                    contacts[key as keyof ContactsType] &&
                    <img src={linksImg[key as keyof ContactsType]} alt='link' width='30px'/>
                }
            </a>
        })
    }
    </div>
}

export default ProfileInfoContacts;
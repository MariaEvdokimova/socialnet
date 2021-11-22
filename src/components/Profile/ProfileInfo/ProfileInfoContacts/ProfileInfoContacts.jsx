import React from 'react';
import vk from '../../../../assets/images/VK.png';
import facebook from '../../../../assets/images/Facebook.png';
import website from '../../../../assets/images/website.png';
import twitter from '../../../../assets/images/Twitter.png';
import youtube from '../../../../assets/images/YouTube.png';
import instagram from '../../../../assets/images/Instagram.png';
import github from '../../../../assets/images/github.png';
import mainLink from '../../../../assets/images/main link.png';

const ProfileInfoContacts = (props) => {

    const links = {facebook, website, vk, twitter, instagram, youtube, github, mainLink};
    const contacts = props.contacts;
    let counter = 1;

    return Object.keys(contacts).map(key => {
        counter++;
        return <a key={counter} href={contacts[key]}>
            {
                contacts[key] && <img src={links[key]} alt='link' width='30px'/>
            }
        </a>
    })
}

export default ProfileInfoContacts;
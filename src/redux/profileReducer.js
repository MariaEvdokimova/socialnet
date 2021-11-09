import avatar from '../assets/images/avatar_snoopy.png';
import {profileAPI, userAPI} from "../api/api";

const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_PROFILE_INFO = 'SET_PROFILE_INFO'
const SET_STATUS = 'SET_STATUS';

const initialState = {
    posts:[
        {id: 1, text: 'Hello', likesCount: 0, avatar: avatar},
        {id: 2, text: 'yoyo', likesCount: 0, avatar: avatar}
    ],
    newPostText: '',
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POST_TEXT:
            return  {
                ...state,
                newPostText: action.newText
            }
        case ADD_NEW_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 3, text: state.newPostText, likesCount: 0, avatar: avatar}],
                newPostText: ''
            }
        case SET_PROFILE_INFO:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
};

export const updatePostText = (text) => ({type: UPDATE_POST_TEXT, newText: text});
export const addPostText = () => ({type: ADD_NEW_POST});
export const setProfileInfo = (profile) => ({type: SET_PROFILE_INFO, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getProfile = (userId) => {
    return (dispatch) => {
        userAPI.getProfile(userId).then(data => {
            dispatch(setProfileInfo(data));
        });
    }
};

export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(data => {
            dispatch(setStatus(data))
        })
    }
};

export const updateUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.setStatus(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
};

export default profileReducer;
import avatar from '../assets/images/avatar_snoopy.png';
import {profileAPI, userAPI} from "../api/api";

const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_PROFILE_INFO = 'SET_PROFILE_INFO'
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS';

const initialState = {
    posts:[
        {id: 1, text: 'Hello', likesCount: 0, avatar: avatar},
        {id: 2, text: 'yoyo', likesCount: 0, avatar: avatar}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 3, text: action.newPostText, likesCount: 0, avatar: avatar}],
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
        case SET_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
};

export const addPostText = (newPostText) => ({type: ADD_NEW_POST, newPostText});
export const setProfileInfo = (profile) => ({type: SET_PROFILE_INFO, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
const setPhotoSuccess = (photos) => ({type: SET_PHOTO_SUCCESS, photos});

export const getProfile = (userId) => {
    return async (dispatch) => {
        const data = await userAPI.getProfile(userId);
        dispatch(setProfileInfo(data));
    }
};

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        const data = await profileAPI.getStatus(userId);
        dispatch(setStatus(data))
    }
};

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        const data = await profileAPI.setStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
};

export const savePhoto = (photo) => {
    return async(dispatch) => {
        const data = await profileAPI.savePhoto(photo);
        if (data.resultCode === 0) {
            dispatch(setPhotoSuccess(data.data.photos));
        }
    }
}

export default profileReducer;
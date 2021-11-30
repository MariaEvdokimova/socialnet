import avatar from '../assets/images/avatar_snoopy.png';
import {profileAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_PROFILE_INFO = 'SET_PROFILE_INFO'
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS';
const SET_PROFILE_UPDATE_STATUS = 'SET_PROFILE_UPDATE_STATUS';
const SET_ERROR = 'SET_ERROR';

const initialState = {
    posts: [
        {id: 1, text: 'Hello', likesCount: 0, avatar: avatar},
        {id: 2, text: 'yoyo', likesCount: 0, avatar: avatar}
    ],
    profile: null,
    isProfileUpdateSuccess: '',
    status: '',
    error: null
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
        case SET_PROFILE_UPDATE_STATUS:
            return {
                ...state,
                isProfileUpdateSuccess: action.status
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};

export const addPostText = (newPostText) => ({type: ADD_NEW_POST, newPostText});
export const setProfileInfo = (profile) => ({type: SET_PROFILE_INFO, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
const setPhotoSuccess = (photos) => ({type: SET_PHOTO_SUCCESS, photos});
const setProfileUpdateStatus = (status) => ({type: SET_PROFILE_UPDATE_STATUS, status});
const setError = (error) => ({type: SET_ERROR, error});

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
        try {
            const data = await profileAPI.setStatus(status);
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (e) {
            dispatch(setError(e.message));
            setTimeout(()=>dispatch(setError(null)), 2000);
        }
    }
};

export const savePhoto = (photo) => {
    return async (dispatch) => {
        const data = await profileAPI.savePhoto(photo);
        if (data.resultCode === 0) {
            dispatch(setPhotoSuccess(data.data.photos));
        }
    }
}

const profileErrors = (messages) => {
    const keyMessages = messages.map((message) => {
        const key = message.match(/Contacts->(\w+)/)[1].toLowerCase();
        return {[key]: message};
    });

    return  Object.assign({}, ...keyMessages);
};

export const saveProfileData = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile);
        dispatch(setProfileUpdateStatus(''));
        if (data.resultCode === 0) {
            dispatch(getProfile(userId));
            dispatch(setProfileUpdateStatus('success'));
        } else {
            //let profileSaveError = data.messages.length > 0 ? data.messages[0] : 'Some error';
            //dispatch(stopSubmit('ProfileForm', {_error: profileSaveError}));

            dispatch(stopSubmit('ProfileForm', {contacts: profileErrors(data.messages)}));
            dispatch(setProfileUpdateStatus('error'));
        }
    }
}

export default profileReducer;
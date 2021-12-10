import avatar from '../assets/images/avatar_snoopy.png';
import {profileAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PostsType, ProfileType} from "../types/types";

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
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    isProfileUpdateSuccess: '' as string,
    status: '' as string,
    error: null as string | null
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
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

type AddPostTextActionType = {
    type: typeof ADD_NEW_POST,
    newPostText: string
};

export const addPostText = (newPostText: string): AddPostTextActionType => ({type: ADD_NEW_POST, newPostText});

type SetProfileInfoActionType = {
    type: typeof SET_PROFILE_INFO,
    profile: ProfileType
};

export const setProfileInfo = (profile: ProfileType): SetProfileInfoActionType => ({type: SET_PROFILE_INFO, profile});

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
};

export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type SetPhotoSuccessActionType = {
    type: typeof SET_PHOTO_SUCCESS,
    photos: string
};

const setPhotoSuccess = (photos: string): SetPhotoSuccessActionType => ({type: SET_PHOTO_SUCCESS, photos});

type SetProfileUpdateStatusActionType = {
    type: typeof SET_PROFILE_UPDATE_STATUS,
    status: string
};

const setProfileUpdateStatus = (status: string): SetProfileUpdateStatusActionType => ({type: SET_PROFILE_UPDATE_STATUS, status});

type SetErrorActionType = {
    type: typeof SET_ERROR,
    error: string | null
};

const setError = (error: string | null): SetErrorActionType => ({type: SET_ERROR, error});

export const getProfile = (userId: number) => {
    return async (dispatch: any) => {
        const data: any = await userAPI.getProfile(userId);
        dispatch(setProfileInfo(data));
    }
};

export const getUserStatus = (userId: number) => {
    return async (dispatch: any) => {
        const data: any = await profileAPI.getStatus(userId);
        dispatch(setStatus(data))
    }
};

export const updateUserStatus = (status: string) => {
    return async (dispatch: any) => {
        try {
            const data: any = await profileAPI.setStatus(status);
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (e: any) {
            dispatch(setError(e.message));
            setTimeout(()=>dispatch(setError(null)), 2000);
        }
    }
};

export const savePhoto = (photo: string) => {
    return async (dispatch: any) => {
        const data: any = await profileAPI.savePhoto(photo);
        if (data.resultCode === 0) {
            dispatch(setPhotoSuccess(data.data.photos));
        }
    }
}

const profileErrors = (messages: any) => {
    const keyMessages = messages.map((message: any) => {
        const key = message.match(/Contacts->(\w+)/)[1].toLowerCase();
        return {[key]: message};
    });

    return  Object.assign({}, ...keyMessages);
};

export const saveProfileData = (profile: ProfileType) => {
    return async (dispatch: any, getState: Function) => {
        const userId = getState().auth.userId;
        const data: any = await profileAPI.saveProfile(profile);
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
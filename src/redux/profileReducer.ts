import avatar from '../assets/images/avatar_snoopy.png';
import {ResultCodeEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {profileAPI} from "../api/profile-api";

const initialState = {
    posts: [
        {id: 1, text: 'Hello', likesCount: 0, avatar: avatar},
        {id: 2, text: 'yoyo', likesCount: 0, avatar: avatar}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    isProfileUpdateSuccess: '',
    status: '',
    error: null as string | null
};

const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_NEW_POST':
            return {
                ...state,
                posts: [...state.posts, {id: 3, text: action.newPostText, likesCount: 0, avatar: avatar}],
            }
        case 'SN/PROFILE/SET_PROFILE_INFO':
            return {
                ...state,
                profile: action.profile
            }
        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SN/PROFILE/SET_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case 'SN/PROFILE/SET_PROFILE_UPDATE_STATUS':
            return {
                ...state,
                isProfileUpdateSuccess: action.status
            }
        case 'SN/PROFILE/SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};

export const actions = {
    addPostText: (newPostText: string) => ({type: 'SN/PROFILE/ADD_NEW_POST', newPostText} as const),
    setProfileInfo: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_PROFILE_INFO', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    setPhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SET_PHOTO_SUCCESS', photos} as const),
    setProfileUpdateStatus: (status: string) => ({type: 'SN/PROFILE/SET_PROFILE_UPDATE_STATUS', status} as const),
    setError: (error: string | null) => ({type: 'SN/PROFILE/SET_ERROR', error} as const)
}

export const getProfile = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId);
        dispatch(actions.setProfileInfo(data));
    }
};

export const getUserStatus = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        const data = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(data))
    }
};

export const updateUserStatus = (status: string): ThunkActionType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.setStatus(status);
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.setStatus(status))
            }
        } catch (e: any) {
            dispatch(actions.setError(e.message));
            setTimeout(()=>dispatch(actions.setError(null)), 2000);
        }
    }
};

export const savePhoto = (photo: File): ThunkActionType => {
    return async (dispatch) => {
        const data = await profileAPI.savePhoto(photo);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setPhotoSuccess(data.data.photos));
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

export const saveProfileData = (profile: ProfileType): ThunkActionType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile);
        dispatch(actions.setProfileUpdateStatus(''));
        if (data.resultCode === ResultCodeEnum.Success) {
            if(userId !== null) {
                dispatch(getProfile(userId));
            } else {
                throw new Error('userId can\'t be null');
            }
            dispatch(actions.setProfileUpdateStatus('success'));
        } else {
            //let profileSaveError = data.messages.length > 0 ? data.messages[0] : 'Some error';
            //dispatch(stopSubmit('ProfileForm', {_error: profileSaveError}));

            dispatch(stopSubmit('ProfileForm', {contacts: profileErrors(data.messages)}));
            dispatch(actions.setProfileUpdateStatus('error'));
        }
    }
}

export default profileReducer;

//types
export type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;
type ThunkActionType = BaseThunkType<ActionType | FormAction>;
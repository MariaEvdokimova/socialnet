import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type SavePhotoType = {
    photos: PhotosType
};

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data)
    },
    setStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
            .then(response => response.data)
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put<APIResponseType<SavePhotoType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
            .then(response => response.data)
    }
}
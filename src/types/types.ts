export type PostsType = {
    id: number,
    text: string,
    likesCount: number,
    avatar: string
};
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
};
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    photos: PhotosType
    contacts: ContactsType
};
export type UsersType = {
    id: number,
    name: string,
    photos: PhotosType,
    status: string | null,
    followed: boolean
};
export type DialogsType = {
    id: number,
    name: string
};
export type MessageType = {
    id: number,
    text: string
};


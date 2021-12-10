export type PostsType = {
    id: number,
    text: string,
    likesCount: number,
    avatar: string
};
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
};
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    userId?: number
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    photos?: PhotosType
    contacts?: ContactsType
};
export type UsersType = {
    name?: string,
    id?: number,
    photos?: PhotosType,
    status?: string | null,
    followed?: boolean
};

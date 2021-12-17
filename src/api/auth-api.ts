import {instance, ResultCodeEnum, ResultCodeForCaptchaEnum, APIResponseType} from "./api";

type GetAuthUserType = {
    id: number,
    email: string,
    login: string
};
export const authAPI = {
    getAuthUser() {
        return instance.get<APIResponseType<GetAuthUserType>>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<{userId: number}, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`)
            .then(response => response.data)
    }
};
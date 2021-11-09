import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "016496e9-ef6f-4e66-9508-3feaa3930e46"
    }
});

export const userAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
    },
    unfollow (id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    follow (id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    getProfile (userId) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus (userId) {
        return instance.get(`/profile/status/` + userId)
            .then(response => response.data)
    },
    setStatus (status) {
        return instance.put(`/profile/status`, {status: status})
            .then(response => response.data)
    }
}

export const authAPI = {
    getAuthUser () {
        return instance.get('auth/me')
                .then(response => response.data)
    }
}

export const loginAPI = {
    login (email, password, rememberMe = false, captcha) {
        return instance.post(`auth/login`,{email, password, rememberMe, captcha})
            .then(response => response.data)
    }
}
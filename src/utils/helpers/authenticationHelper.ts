import { AUTHORIZATION_TOKEN } from "@/utils/constants/application"

export const isAuthenticated = () => {
    if (localStorage.getItem(AUTHORIZATION_TOKEN) == null || sessionStorage.getItem(AUTHORIZATION_TOKEN) == null) {
        return false
    }
    return true
}

export const saveToken = (jwt:any) => {
    if (jwt) {
        localStorage.setItem(AUTHORIZATION_TOKEN, jwt)
        sessionStorage.setItem(AUTHORIZATION_TOKEN, jwt)
    }
}

export const clearToken = () => {
    if (localStorage.getItem(AUTHORIZATION_TOKEN) !== null)
        localStorage.removeItem(AUTHORIZATION_TOKEN)

    if (sessionStorage.getItem(AUTHORIZATION_TOKEN) !== null)
        sessionStorage.removeItem(AUTHORIZATION_TOKEN)
}

export const getToken = () => {
    const token = localStorage.getItem(AUTHORIZATION_TOKEN) || sessionStorage.getItem(AUTHORIZATION_TOKEN) || ''
    return token
}
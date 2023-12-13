import { LOGIN, LOGOUT } from "../constant"

export const login = (data) => {
    return {type: LOGIN, data}
}

export const logout = () => {
    return {type: LOGOUT, data:{}}
}
import * as request from "./request"
import * as Type from "../type/type"

const host = "https://localhost:44331/" // 本地api

// 注册
export const signUp = (register: Type.IRegister) => request.post<string>(host + "api/userSginUp", register)
// 登录
export const signin = (login: Type.ILogin) => request.post<string>(host + "api/User/Login", login)
// 获取用户信息
export const getUserInfo = ()=> request.get<Type.IGetUserInfo>(host + "api/User/showUserInfo")
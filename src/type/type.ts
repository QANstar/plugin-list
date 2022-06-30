
export interface IUser{
    token:string
    userName:string
    email:string
}

// 导航类型
export type NavType = "horizontal" | "vertical"

// 导航项
export interface INavItem {
    name: string
    path: string
}

// 登录
export interface ILogin{
    email:string
    password:string
}

// 注册
export interface IRegister{
    userName:string
    password:string
    email:string
}

// 获取用户信息
export interface IGetUserInfo{
    userName:string
    email:string
}

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

// 获取技术列表
export interface ITechnology{
    id: number,
    technologyName: string,
}

// 新增技术
export interface IAddTechnology{
    technologyName: string
}

// 插件
export interface IPlugin{
    id: number,
    pluginName: string,
    introduce: string,
    instruction: string,
    webUrl: string,
}

// 添加插件
export interface IAddPlugin{
    pluginName: string,
    introduce: string,
    instruction: string,
    webUrl: string,
    parTechnologyId: number
}
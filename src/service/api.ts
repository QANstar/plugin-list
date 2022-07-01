import * as request from "./request"
import * as Type from "../type/type"

const host = "https://localhost:44331/" // 本地api

// 注册
export const signUp = (register: Type.IRegister) => request.post<string>(`${host}api/userSginUp`,register)
// 登录
export const signin = (login: Type.ILogin) => request.post<string>(`${host}api/User/Login`, login)
// 获取用户信息
export const getUserInfo = ()=> request.get<Type.IGetUserInfo>(`${host}api/User/showUserInfo`)
// 获取技术列表
export const getTechnologyList = ()=>request.get<Array<Type.ITechnology>>(`${host}api/Technology/getTechnology`)
// 新增技术
export const addTechnology = (data:Type.IAddTechnology)=> request.post(`${host}api/Technology/addTechnology`,data)
// 编辑技术
export const editTechnology = (data:Type.ITechnology) => request.put(`${host}api/Technology/editTechnology`,data)
// 删除技术
export const deleteTechnology = (id:number) => request.deleteRequest(`${host}api/Technology/deleteTechnology?technologyId=${id}`)
// 获取插件
export const getPluginList = (technologyId:number)=>request.get<Array<Type.IPlugin>>(`${host}api/Plugin/getPlugin?technologyId=${technologyId}`)
// 添加插件
export const addPlugin = (data:Type.IAddPlugin) => request.post(`${host}api/Plugin/addPlugin`,data)
// 编辑插件
export const editPlugin = (data:Type.IPlugin) => request.put(`${host}api/Plugin/editPlugin`,data)
// 删除插件
export const deletePlugin = (id:number) => request.deleteRequest(`${host}api/Plugin/deletePlugin?pluginId=${id}`)
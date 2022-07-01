import axios, { AxiosResponse } from "axios";

// get封装
export const get = async <T>(url:string) =>{
    return axios.get(url)
        .then((res:AxiosResponse<T>) => {
            return res;
        })
}
// post封装
export const post = async <T>(url:string,data?:any) =>{
    return axios.post(url, data)
        .then((res:AxiosResponse<T>) => {
            return res;
        })
}
// put封装
export const put = async <T>(url:string,data?:any) =>{
    return axios.put(url, data)
        .then((res:AxiosResponse<T>) => {
            return res;
        })
}
// delete封装
export const deleteRequest = async <T>(url:string) =>{
    return axios.delete(url)
        .then((res:AxiosResponse<T>) => {
            return res;
        })
}

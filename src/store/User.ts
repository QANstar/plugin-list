import {action, makeAutoObservable } from 'mobx';
import { IUser } from '../type/type';
class User implements IUser {
    token: string = ""
    userName:string = ""
    email:string =""

    constructor(){
        makeAutoObservable(this)
        let localData = localStorage.getItem("user");
        if(localData != null){
            let userData: IUser = JSON.parse(localData);
            this.setUser(userData)
        }
    }
    @action setUser(data:IUser){
        this.token = data.token
        this.userName = data.userName
        this.email = data.email
        this.saveLocation()
    }
    @action init(){
        this.token = ""
        this.userName = ""
        this.email =""
        this.saveLocation()
    }
    saveLocation(){
        localStorage.setItem("user", JSON.stringify(this));
    }
    @action setToken(token:string){
        this.token = token;
        this.saveLocation()
    }
}

export default User
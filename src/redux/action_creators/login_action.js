import {SAVE_USER_INFO,DELETE_USER_INFO} from "../action_types";

export const createSaveUserInfoAction = (value)=> {
    /*
    *
    *{_id: '61fd0eba072c2f24d4f8ccd0',
    *  username: 'admin',
    *  password: '21232f297a57a5a743894a0e4a801fc3',
    *  create_time: 1643974330439,
    *  __v: 0, …}
    *
    * */
    localStorage.setItem('user',JSON.stringify(value))
    localStorage.setItem('token',value.password)
    localStorage.setItem('isLogin',true)

    return {type:SAVE_USER_INFO, data:value}
}
// save userInfo at here

export const createDeleteUserInfoAction = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('isLogin')
    return {type:DELETE_USER_INFO}
}

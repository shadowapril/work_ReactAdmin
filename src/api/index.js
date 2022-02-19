import myAxios from "./myAxios";
import jsonp from "jsonp"
import {ADCODE, BASE_URL, WEATHER_AK} from "../config";
import {message} from "antd";

// Login
export const reqLogin = (username,password)=> (myAxios.post(`${BASE_URL}/login`,{username,password}))

// Request Category List
export const reqCategoryList = ()=> (myAxios.get(`${BASE_URL}/manage/category/list`))

// Request City Weather
export const reqWeather = ()=> {
    return new Promise((resolve,reject)=>{
        jsonp(`https://restapi.amap.com/v3/weather/weatherInfo?city=${ADCODE}&key=${WEATHER_AK}`,(err,data)=>{
            if(err){
                message.error('Request weather failed! Please contact administrator')
                return new Promise(()=>{})
            }else {
                const {weather,temperature} = data.lives[0]
                let weatherObj = {weather,temperature}
                resolve(weatherObj)
            }
        })
    })

    /*
*   adcode: "520502"
    city: "七星关区"
    humidity: "92"
    province: "贵州"
    reporttime: "2022-02-09 20:33:39"
    temperature: "2"
    weather: "阴"
    winddirection: "东南"
    windpower: "≤3"
*
* */
}

// Add new category
export const reqAddCategory = ({categoryName})=> (myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName}))

// Update category
export const reqUpdateCategory = ({categoryName,categoryId})=> (myAxios.post(`${BASE_URL}/manage/category/update`,{categoryName,categoryId}))

// Request Product List paged
export const reqProductList = (pageNum,pageSize)=> (myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}}))

// Update Product Status
export const reqUpdateProdStatus = (productId,status)=> (myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status}))

// Request Product List paged
export const reqSearchProduct = (pageNum,pageSize,searchType,keyWord)=> (myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}}))

// Request Product Info by id
export const reqProductById = (productId)=> (myAxios.get(`${BASE_URL}/manage/product/info`,{params:{categoryId:productId}}))

// Delete Product image
export const reqDeletePicture = (name)=> (myAxios.post(`${BASE_URL}/manage/img/delete`,{name}))

// Request Add Product
export const reqAddProduct = (productObj)=> (myAxios.post(`${BASE_URL}/manage/product/add`,{...productObj}))

// Request Update Product
export const reqUpdateProduct = (productObj)=> (myAxios.post(`${BASE_URL}/manage/product/update`,{...productObj}))

// Request Role List
export const reqRoleList = ()=> (myAxios.get(`${BASE_URL}/manage/role/list`,))

// Request Add Role
export const reqAddRole = ({roleName})=> (myAxios.post(`${BASE_URL}/manage/role/add`,{roleName}))

// Request Update Role
export const reqAuthRole = (roleObj)=> (myAxios.post(`${BASE_URL}/manage/role/update`,{...roleObj,auth_time:Date.now()}))

// Request User List
export const reqUserList = ()=> (myAxios.get(`${BASE_URL}/manage/user/list`,))

// Request Add User
export const reqAddUser = (userObj)=> (myAxios.post(`${BASE_URL}/manage/user/add`,{...userObj}))
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



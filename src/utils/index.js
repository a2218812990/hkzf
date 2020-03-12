// 全局共用的工具封装
import {getCityInfo} from '../utils/API/city'

// 封装一个本地存储方法
export const getItem=(city)=>{
   return localStorage.getItem(city)
}
export const setItem=(city,data)=>{
   return localStorage.setItem(city,data)
}
export const removeItem=(city)=>{
   return localStorage.removeItem(city)
}

// 定位当前城市公共方法
export const getCityPlace=()=>{
    let PositionCity = JSON.parse(getItem('city'))
    
  if(!PositionCity)  {
        return new Promise((resolve)=>{
        let myCity = new window.BMap.LocalCity();
        myCity.get( async (result)=>{
            let cityName = result.name;               
            let res =await getCityInfo(cityName)
            // 返回数据前先存上一份
            setItem('city', JSON.stringify(res.data))
            resolve(res.data)
        }); 
    })
    }else{
        //  如果有的话直接将有的数据返回
         return Promise.resolve(PositionCity )
                                      }
}

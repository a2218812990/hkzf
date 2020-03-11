import request from '../request'

// 获取城市信息
export const getCityInfo=(name)=>request.get('/area/info',{params:{name}})
// 获取城市列表
export const getCityList=()=>request.get('/area/city',{params:{level:1}})
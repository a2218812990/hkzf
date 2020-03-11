import request from '../request'

export const getCityInfo=(name)=>request.get('/area/info',{params:{name}})


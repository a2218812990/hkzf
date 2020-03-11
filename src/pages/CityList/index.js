import React, { Component } from 'react'

import {getCityList} from '../../utils/API/city'

export default class index extends Component {
    state={
        cityList:{},
        cityIndex:[]
    }

componentDidMount(){
    this.GetCityList()
}

//  获取城市列表信息 
 
 GetCityList=async ()=>{
     let res=await getCityList()
     console.log(res);
     this.workInData(res.data)
 }
// 处理后台返回的城市列表数据 
 workInData=(data)=>{
   let cityList = {}, cityIndex;
   data.forEach((item)=>{
       let first= item.short.slice(0,1)
       if(!cityList[first]){
        cityList[first]=[item]
       }else{
        cityList[first].push(item)
       }
   })
   cityIndex = Object.keys(cityList).sort()
   return {
    cityList,
    cityIndex
   }
 }
    render() {
        return (
            <div>
                我是城市列表
            </div>
        )
    }
}

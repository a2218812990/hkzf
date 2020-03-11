import React, { Component } from 'react'
import {NavBar,Icon} from 'antd-mobile'

import './index.css'


export default class index extends Component {


    componentDidMount(){
       this.getMap()
    }
    // 地图初始化
    getMap=()=>{
        // 创建地图实例
        let map = new window.BMap.Map("container")
        // 地图中心点设置
        let point = new window.BMap.Point(116.331398,39.897445); 
        map.centerAndZoom(point, 15);  
    }

    render() {
        return (
        <div className='mapBox'>
            {/* 返回导航栏 */}
            <NavBar
              mode="light"
             icon={<Icon type="left" />}
             onLeftClick={() => {
               this.props.history.goBack()
            }}
            >
           地图找房
          </NavBar>

            {/* 百度地图显示 */}
            <div id="container">
            </div> 
         </div>
        )
    }
}

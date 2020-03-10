import React, { Component } from 'react'
import { Carousel,Flex} from 'antd-mobile'; 

import {BASE_URL} from '../../../utils/request'
import {getSwiper} from '../../../utils/API/home'

import './index.scss'
// 栏目导航数据引入
import navs from '../../../utils/navlist'

 class Default extends Component {
    state = {
        data: [],
        imgHeight: 212,
        autoplay:false
      }

      componentDidMount() {
        this.getSwiper()
      }
    //   轮播图组件
    Swipers(){
        return(
            this.state.data.map(val => (
                <a
                  key={val.id}
                  href="http://www.ithema.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`${BASE_URL}${val.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))
        )
    }
    //  获取轮播图
    getSwiper=async ()=>{
        let res= await getSwiper()
        if(res.status===200){
             this.setState({
                data:res.data
             },()=>{
                this.setState({
                    autoplay:true
                 })
             })
        }
    }
    //  栏目导航组件
    NavList(){
        return(
            navs.map((item)=>{
                return(   
                    <Flex.Item onClick={() =>this.props.history.push(item.path)} key={item.id}>
                    <img src={item.img} />
                    <p>{item.title}</p>
                  </Flex.Item>
                  )}
            )
        )
    }

    render() {
        return (
        <div>
            {/* 轮播图 */}
             <Carousel
              autoplay={this.state.autoplay}
              infinite
              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              afterChange={index => console.log('slide to', index)}
            >
              {this.Swipers()}
         </Carousel>
            {/* 栏目导航 */}
             <Flex className="nav">
       	     {this.NavList()}
            </Flex>
            {/* 租房小组 */}
            <div className="group">
              <Flex className="group-title" justify="between">
               <h3>租房小组</h3>
               <span>更多</span>
             </Flex>      
           </div>
        </div>
        )
    }
}
export default Default
import React, { Component } from 'react'
import { Carousel} from 'antd-mobile'; 

import {BASE_URL} from '../../../utils/request'
import {getSwiper} from '../../../utils/API/home'
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
        console.log(res);
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

    render() {
        return (
         
            <Carousel
              autoplay={this.state.autoplay}
              infinite
              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              afterChange={index => console.log('slide to', index)}
            >
              {this.Swipers()}
            </Carousel>
          
        )
    }
}
export default Default
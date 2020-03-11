import React, { Component } from 'react'
import { Carousel,Flex,Grid,WingBlank,SearchBar} from 'antd-mobile'; 

import {BASE_URL} from '../../../utils/request'
import {getSwiper,getGridList,getNewInfo} from '../../../utils/API/home'
import {getCityInfo} from '../../../utils/API/city'

import './index.scss'
// 栏目导航数据引入
import navs from '../../../utils/navlist'

 class Default extends Component {
    state = {
        data: [],
        imgHeight: 212,
        autoplay:false,
        groups:[],
        news:[],
        keyword:'',
        cityInfo:{
          label:'--',
          value:''
        }
      }
  // 封装所有请求
    getAllData=async ()=>{
       let res=await Promise.all([getSwiper(),getGridList(),getNewInfo()])
        this.setState({
          data: res[0].data,
          groups:res[1].data,
          news:res[2].data
        },()=>{
          this.setState({
              autoplay:true
           })
       })
    }
    componentDidMount() {
        this.getAllData()
        this.getCityInfo()
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
    
    // 租房小组标题宫格组件
    renderGroup(){
      return(
                    // {/* 租房小组标题 */}
                 <div>
                    <div className="group">
                    <Flex className="group-title" justify="between">
                     <h3>租房小组</h3>
                     <span>更多</span>
                   </Flex>      
                 </div>
                  {/* 租房小组宫格 */}
                  <Grid data={this.state.groups}
                    columnNum={2}
                    square={false}
                    hasLine={false}
                    renderItem={item => {
                   return( 
                           <Flex className="grid-item" justify="between">
                            <div className="desc">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            </div>
                            <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                           </Flex>
                         )
                    }}
                />
              </div>   
      )
    }
    
    // 最新资讯组件
    renderNews(){
      return(
          this.state.news.map(item=>(
            <div className="news-item" key={item.id}>
              <div className="imgwrap">
                <img
                  className="img"
                  src={`${BASE_URL}${item.imgSrc}`}
                  alt=""
                />
              </div>
              <Flex className="content" direction="column" justify="between">
                <h3 className="title">{item.title}</h3>
                <Flex className="info" justify="between">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </div>
          )
          )
      )
    }
    // 顶部导航渲染
    topSearchBar=()=>{
     const { push } = this.props.history;
     return(
      <Flex justify="around" className="topNav">
      <div className="searchBox">
        <div className="city" onClick={() => push('/cityList')}>
          {this.state.cityInfo.label}<i className="iconfont icon-arrow" />
        </div>
        <SearchBar
          value={this.state.keyword}
          onChange={(v) => this.setState({ keyword: v })}
          placeholder="请输入小区或地址"
        />
      </div>
      <div className="map">
        <i key="0" className="iconfont icon-map" onClick={() => push('/map')} />
      </div>
    </Flex>
     )
    }
    // 获取当前城市信息
    getCityInfo=()=>{
           // 定位
           let myCity = new window.BMap.LocalCity();
           myCity.get( async (result)=>{
               let cityName = result.name;               
               let res =await getCityInfo(cityName)
               this.setState({
                   cityInfo:res.data
               })
           }); 
    }

    render() {
        return (
        <div>
            {/* 顶部导航 */}
            {this.topSearchBar()}
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
            {this.renderGroup()}
            {/* 最新资讯 */}
            <div className="news">
              <h3 className="group-title">最新资讯</h3>
              <WingBlank size="md">{this.renderNews()}</WingBlank>
           </div>
       </div>

        )  
    }
}
export default Default
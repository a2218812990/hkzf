import React, { Component } from 'react'

import {getCityList,getHotCity} from '../../utils/API/city'
import {getCityPlace} from '../../utils/index'
import {setItem} from '../../utils/index'
// 引入list列表
import {List,AutoSizer} from 'react-virtualized'
import {NavBar,Icon, Toast} from 'antd-mobile'

import './index.scss'

export default class CityList extends Component {
   
    state= {
        cityIndex:[],
        cityList:{}
    }

componentDidMount(){
    this.GetCityList()
}

//  获取城市列表信息 
 
 GetCityList=async ()=>{
     let res=await getCityList()
     let { cityList , cityIndex }=this.workInData(res.data)
    //  热门城市
     let re=await getHotCity()  
     cityIndex.unshift('hot')
     cityList['hot']=re.data
    //  当前定位城市
     let cy=await getCityPlace()
     cityIndex.unshift('#')
     cityList['#']=[cy]
     this.setState({
        cityIndex,
        cityList
      })    
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


//   动态获取行高
//  动态获取列表行高
 getRowHeight = ({index}) => {
    const { cityIndex, cityList } = this.state;
    const key = cityIndex[index];
    return  36 + 50 * cityList[key].length;
  }
  // 格式化字母
  formatLetter(letter,first) {
    switch (letter) {
      case 'hot':
        return first ? '热':'热门城市';
      case '#':
        return first ? '当': '当前城市';
      default:
        return letter.toUpperCase();
    }
  }
  // 右边字母导航的渲染
 renderIndex=()=>{
   const {cityIndex} =this.state
   return(
    cityIndex.map((item,index)=>{
      return (
        <li
          key={item}
          className="city-index-item"
        >
          <span className={0 === index ? 'index-active' : ''}>
            {this.formatLetter(item, true)}
          </span>
        </li>
      )
    })
   )
 }
// 切换城市
changeCity=(city)=>{
  const hasData = ['北京', '上海', '广州', '深圳'];
  if(hasData.includes(city.label)){
     setItem('city',JSON.stringify(city))
     this.props.history.goBack()
  }else{
      Toast.info('该城市暂无房源数据！')
  }
}
  // 列表组件
rowRenderer=({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  })=>{
    const { cityIndex, cityList } = this.state;
    const letter = cityIndex[index];
    return (
      <div key={key} style={style} className="city">
        <div className="title">{this.formatLetter(letter)}</div>
        {
          cityList[letter].map((item) => <div onClick={()=>{this.changeCity(item)}} key={item.value} className="name">{item.label}</div>)
        }
      </div>
    )  
  }
    render() {
        return (
            <div className='citylist'>
                 <NavBar
                  mode="dark"
                  icon={<Icon type="left" />}
                  onLeftClick={() => this.props.history.goBack()}
                 >
	            城市选择
                </NavBar>

                {/* 列表 */}
                <AutoSizer>
                {({ height, width }) => (
                    <List
                    height={height}
                    rowCount={this.state.cityIndex.length}
                    rowHeight={this.getRowHeight}
                    rowRenderer={this.rowRenderer}
                    width={width}
                    />
                    )}
                </AutoSizer>
                {/* 右边字母渲染 */}
                <ul className="city-index">
                  {this.renderIndex()}
                  </ul>  
            </div>
        )
    }
}

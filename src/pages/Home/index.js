import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Index from './Default/index'
import House from './House/index'
import Profile from './Profile/index'

// 底部导航栏样式引入
import './index.css'
// ant引入
import { TabBar } from 'antd-mobile'

// TabBar 数据引入
import TabItems from '../../utils/tabBar'

 class Home extends Component {

    state = {
        selectedTab:this.props.location.pathname,
      }
    // 导航显示
    showNav(){
        return(
            TabItems.map((item)=>{
                return (<TabBar.Item
                title={item.title}
                key={item.title}
                icon={ <i className={`iconfont ${item.icon}`} /> }
                selectedIcon={ <i className={`iconfont ${item.icon}`} />}
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                  this.props.history.push(item.path)
                  this.setState({
                    selectedTab: item.path,
                  });
                }}
              >
             
              </TabBar.Item>
              )    
            })
        )
    }

    render() {
        return (
           
            <div>
               {/* <Link to='/home'>首页</Link>
               <br/>
               <Link to='/home/house'>找房</Link>
               <br/>
               <Link to='/home/profile'>我的</Link> */}

               <Route exact path="/home" component={Index}/>
               <Route path='/home/house' component={House}/>
               <Route path='/home/profile' component={Profile}/>
               {/* TabBar */}
               <div className="barBox">
                <TabBar
                  unselectedTintColor="#949494"
                  tintColor="#33A3F4"
                  barTintColor="white"
                >
                {this.showNav()}
               </TabBar>
      </div>

            </div>
        )
    }
}
export default Home
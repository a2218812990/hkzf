import React, { Component } from 'react'
import {Route,Link} from 'react-router-dom'
import Index from './Default/index'
import House from './House/index'
import Profile from './Profile/index'

 class Home extends Component {
    render() {
        return (
           
            <div>
               <Link to='/home'>默认首页</Link>
               <br/>
               <Link to='/home/house'>房子</Link>
               <br/>
               <Link to='/home/profile'>个人中心</Link>

               <Route exact path="/home" component={Index}/>
               <Route path='/home/house' component={House}/>
               <Route path='/home/profile' component={Profile}/>
            </div>
        )
    }
}
export default Home
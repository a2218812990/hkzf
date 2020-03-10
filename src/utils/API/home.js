// 主页模块封装请求方法
import request from '../request'
// 获取轮播图
export  const getSwiper= ()=> request.get('/home/swiper')
// 租房小组宫格数据
export  const getGridList= ()=> request.get('/home/groups',{params:{area:'AREA|88cff55c-aaa4-e2e0'}})
// 最新资讯封装
export const getNewInfo=()=> request.get('/home/news',{params:{area:'AREA|88cff55c-aaa4-e2e0'}})


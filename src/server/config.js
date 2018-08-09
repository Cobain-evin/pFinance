import Axios from 'axios'
import queryString from 'querystring'
import { Indicator } from 'mint-ui';
import environment from '@/server/environment'

let HTTP = Axios.create({
  baseURL: environment.url,
  responseType: 'json',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cache-Control": "no-cache"
  },
  transformRequest: [function(data){

    //请求发出之后调用等待提示框
    Indicator.open()

    //为每次的请求参数中添加EMP_SID
    if((data.actorno && data.createSession && data.wb_task_id) || data.EMP_SID){
      /**
       * 两种情况下参数中不添加EMP_SID:
       * 前一种情况是待办列表页面领取任务的时候，如果是需要虚户操作的情况，获取临时EMP_SID的请求
       * 后一种情况是虚户登录使用临时EMP_SID走流程审批
       */
    }
    else{
      data.EMP_SID = localStorage.getItem('EMP_SID')
    }

    return queryString.stringify(data)
  }],
  transformResponse: [function(data){

    //数据返回之后隐藏等待提示框
    setTimeout(() => {
      Indicator.close()
    }, 300)

    return data
  }]
})

//拦截发送请求
HTTP.interceptors.request.use(function(config){
  return config
}, function(error){
  return Promise.reject(error)
})

//拦截数据返回
HTTP.interceptors.response.use(function(config){
  return config.data
}, function(error){
  return Promise.reject(error)
})

export default HTTP

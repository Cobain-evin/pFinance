import HTTP from '@/server/config'

export default {
  
  /*获取项目列表*/
  getProjectList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrjList.do',
      data: param
    })
  },

  /*获取项目信息*/
  getProjectDetail(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrjInfo.do',
      data: param
    })
  },

  /*获取全流程列表*/
  getFlowList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrjProcessList.do',
      data: param
    })
  },

  /*刷新全流程*/
  refreshFlow(param){
    return HTTP({
      method: 'post',
      url: '/wxRefreshPrjProcess.do',
      data: param
    })
  },

  /*获取方案信息*/
  getPlanInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrjPlanInfolist.do',
      data: param
    })
  }
  
}
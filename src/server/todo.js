import HTTP from '@/server/config'

export default {
  
  /*刷新待办列表*/
  refreshTaskList(){
    return HTTP({
      method: 'post',
      url: '/wxRefreshPubWbTask.do',
      data: {}
    })
  },

  /*查询待办事项列表*/
  getTaskList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPubWbTasklist.do',
      data: param
    })
  },

  /*虚户模拟登录接口--获取临时EMP_SID*/
  getTempEMPSID(param){
    return HTTP({
      method: 'post',
      url: '/wfUserSignOn.do',
      data: param
    })
  },

  /*领取流程任务*/
  acceptTask(param){
    return HTTP({
      method: 'post',
      url: '/checkPubWbItemRecord.do',
      data: param
    })
  },

  /*查询审批通知列表*/
  getNoticeList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryApprovalNoticeList.do',
      data: param
    })
  }
  
}
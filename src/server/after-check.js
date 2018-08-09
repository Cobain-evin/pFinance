import HTTP from '@/server/config'

export default {
  
  /*保后定期检查列表查询*/
  getAfterCheckList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPspCkTaskList.do',
      data: param
    })
  },

  /*保后检查任务详情*/
  getAfterCheckTaskInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPspCkTaskInfo.do',
      data: param
    })
  },

  /*保后查询放款信息列表*/
  getAfterCheckLendingInfoList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPspCkTaskAccList.do',
      data: param
    })
  },

  /*保后检查内容列表查询*/
  getAfterCheckContentList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPspBcCoInfoList.do',
      data: param
    })
  },

  /*决议中明确的检查内容查询*/
  getDecsContentList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryDecsContentList.do',
      data: param
    })
  },

  /*检查结果登记查询*/
  getResultRegisterInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPspCkTaskRegister.do',
      data: param
    })
  },

  /*更新保后检查结果信息*/
  updateAfterCheckContentList(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdatePspBcCoInfo.do',
      data: param
    })
  },

  /*更新保后检查决议中明确的检查内容信息*/
  updateDecsContentList(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateDecsContent.do',
      data: param
    })
  },

  /*更新保后检查检查结果信息*/
  updateResultRegisterInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdatePspCkTask.do',
      data: param
    })
  },

  
}
import HTTP from '@/server/config'

export default {

  /*获取流程类型*/
  getApplType(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrdInfo.do',
      data: param
    })
  },
  
  /*流程第一个接口-检查是否执行风险拦截*/
  checkProcRiskInspect(param){
    return HTTP({
      method: 'post',
      url: '/checkProcRiskInspect.do',
      data: param
    })
  },

  /*流程第二个接口-执行风险拦截*/
  doProcRiskInspect(param){
    // return HTTP({
    //   method: 'post',
    //   url: '/initiateWF.do',
    //   data: param
    // })
  },

  /*流程第三个接口-流程开始提交*/
  doInitiateWF(param){
    return HTTP({
      method: 'post',
      url: '/initiateWF.do',
      data: param
    })
  },

  /*流程第四个接口-选择节点和人*/
  // getNodeAndHandler(param){
  //   return HTTP({
  //     method: 'post',
  //     url: '/getSelectNextNodePage.do',
  //     data: param
  //   })
  // },
  getNodeAndHandler(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryWfNextNodeUser.do',
      data: param
    })
  },

  /*流程第五个接口-流程提交前检查*/
  checkBeforeWfSubmit(param){
    return HTTP({
      method: 'post',
      url: '/checkBusinessBeforeWfiSubmit.do',
      data: param
    })
  },

  /*流程第六个接口-提交流程*/
  submitWorkflow(param){
    return HTTP({
      method: 'post',
      url: '/submitWorkFlow.do',
      data: param
    })
  },

  /*被打回人逐级提交*/
  submitWorkflow4Cb(param){
    return HTTP({
      method: 'post',
      url: '/jumpWorkFlow4CallBack.do',
      data: param
    })
  },

  /*被打回人直接提交给我*/
  submitCbWorkflow(param){
    return HTTP({
      method: 'post',
      url: '/callBackWorkFlow.do',
      data: param
    })
  },

  /*获取流程信息*/
  getInstanceInfo(param){
    return HTTP({
      method: 'post',
      url: '/getInstanceInfo.do',
      data: param
    })
  },

  /*流程否决*/
  disagreeWorkFlow(param){
    return HTTP({
      method: 'post',
      url: '/customDisagreeWorkFlow.do',
      data: param
    })
  },

  /*评审会项目审批意见*/
  getVoteInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryWfiSignVoteInfo.do',
      data: param
    })
  },

  /*评审会投票意见信息列表*/
  getVoteList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryWfiSignVoteList.do',
      data: param
    })
  },

  /*评审会投票意见信息更新*/
  updateVoteInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateWfiSignVote.do',
      data: param
    })
  },
  /*获取用信基本信息*/
  getCreditBaseInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrjCreditBranchAppList.do',
      data: param
    })
  },
  /*获取决议变更基本信息*/
  getProjectChangeBaseInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrjChgInfo.do',
      data: param
    })
  },
  /*获取代偿基本信息*/
  getCompensatoryBaseInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryArpCompstAppInfo.do',
      data: param
    })
  }
    
}
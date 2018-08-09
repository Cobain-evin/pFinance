import HTTP from '@/server/config'

export default {
  
  /*获取放款申请列表*/
  getLendingApplyList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryLoanApplyList.do',
      data: param
    })
  },

  /*获取放款申请详情*/
  getLendingApplyDetail(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryLoanApplyInfo.do',
      data: param
    })
  },

  /*获取放款申请详情*/
  addLendingApply(param){
    return HTTP({
      method: 'post',
      url: '/wxAddPvpLoanApply.do',
      data: param
    })
  },

  /*放款收费信息列表*/
  getLendingApplyFeeList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPvpFeePlanList.do',
      data: param
    })
  },

  /*放款申请相关登记信息*/
  getLendingApplyRegInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryBusiDetailList.do',
      data: param
    })
  },

  /*放款申请更新和提交校验*/
  updateLendingApplyInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdatePvpLoanApply.do',
      data: param
    })
  }
  
}
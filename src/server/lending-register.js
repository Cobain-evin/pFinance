import HTTP from '@/server/config'

export default {
  
  /*获取放款登记列表*/
  getLendingRegisterList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryLoanInputList.do',
      data: param
    })
  },

  /*获取放款登记信息*/
  getLendingRegisterInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryLoanInputInfo.do',
      data: param
    })
  },
   /*放款登记保存*/
  updateLendingRegisterDetail(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdatePvpLoanInput.do',
      data: param
    })
  },
  /*放款登记提交*/
  submitPvpLoanInput(param){
    return HTTP({
      method: 'post',
      url: '/wxSubmitPvpLoanInput.do',
      data: param
    })
  }

}
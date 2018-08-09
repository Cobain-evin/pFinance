import HTTP from '@/server/config'

export default {
  
  /*还款登记列表*/
  getRepayRegisterList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryReturnRegList.do',
      data: param
    })
  },

  /*还款登记详情信息*/
  getRepayRegisterDetail(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryReturnRegInfo.do',
      data: param
    })
  },

  /*是否可以进行还款登记*/
  canRepayRegisterVali(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryValidBillSyn.do',
      data: param
    })
  },

  /*更新还款登记信息*/
  updateRepayRegisterInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateArpReturnReg.do',
      data: param
    })
  },
  // 还款登记回款期数信息
  getRepayRegisterEditReturned(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryReturnRegPlanList.do',
      data: param
    })
  },
   // 更新还款登记回款期数信息
   updateRepayRegisterEditReturned(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateArpNomGuarantRefund.do',
      data: param
    })
  },
  // 提交前处理
  preCommitRepayRegisterEditReturned(param){
    return HTTP({
      method: 'post',
      url: '/wxSubCheckArpReturnReg.do',
      data: param
    })
  },

 
  
}
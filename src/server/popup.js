import HTTP from '@/server/config'

export default {

  /*客户列表*/
  getAllCustomerList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCusBaseListPop.do',
      data: param
    })
  },

  /*精确查询客户列表，用于查询法人、股东、实际控制人*/
  getExactCustomerList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryGetCusBasePop.do',
      data: param
    })
  },

  /*渠道列表*/
  getChannelList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCcmCcInfoListPop.do',
      data: param
    })
  },

  /*员工列表*/
  getEmployeeList(param){
    return HTTP({
      method: 'post',
      url: '/wxQuerySuserListPop.do',
      data: param
    })
  },

  /*银行列表*/
  getBankList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCcmBankInfoListPop.do',
      data: param
    })
  },

  /*树图列表*/
  getTreeDicList(param){
    return HTTP({
      method: 'post',
      url: '/wxQuerySTreeDic.do',
      data: param
    })
  },
  
  /*产品列表*/
  getProductList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrdBasicPop.do',
      data: param
    })
  },

  /*机构列表*/
  getOrgList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryFncLicenceAllPop.do',
      data: param
    })
  },

  /*项目列表*/
  getProjectList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrjInfoPop.do',
      data: param
    })
  },

  /*方案列表*/
  getPlanList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryPrjPlanPop.do',
      data: param
    })
  },

  /*合同列表*/
  getContractList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryLoanContList.do',
      data: param
    })
  }

}
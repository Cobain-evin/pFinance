import HTTP from '@/server/config'

export default {
  
  /*获取用户列表*/
  getCustomerList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCusList.do',
      data: param
    })
  },

  /*查询个人客户基本信息*/
  getCusIndiBasicInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCusIndivBaseInfo.do',
      data: param
    })
  },

  /*获取客户账户信息*/
  getCusAccountInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCusAccInfoList.do',
      data: param
    })
  },

  /*获取对公客户基本信息*/
  getCusCorpBasicInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCcbInfo.do',
      data: param
    })
  },

  /*获取对公客户联系信息*/
  getCusCorpContactInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCcbRelatInfo.do',
      data: param
    })
  },

  /*获取对公客户股权信息*/
  getCusCorpStockInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCcbStockInfo.do',
      data: param
    })
  },

  /*客户建档*/
  createCustomer(param){
    return HTTP({
      method: 'post',
      url: '/wxAddCusBase.do',
      data: param
    })
  },

  /*更新个人客户基本信息*/
  updateCusIndiBaseInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateCusIndivBase.do',
      data: param
    })
  },

  /*新增客户账户信息*/
  addAccountInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxAddCusSetAcc.do',
      data: param
    })
  },

  /*更新客户账户信息*/
  updateAccountInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateCusSetAcc.do',
      data: param
    })
  },

  /*更新对公客户基本信息*/
  updateCusCorpBaseInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateCusComBase.do',
      data: param
    })
  },

  /*新增对公客户股权信息*/
  addStockInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxAddCusEquityInfo.do',
      data: param
    })
  },

  /*更新客户股权信息*/
  updateStockInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateCusEquityInfo.do',
      data: param
    })
  },

  /*删除对公客户股权信息*/
  deleteCusCorpStockInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxDeleteCusEquityInfo.do',
      data: param
    })
  },

  /*删除对公客户股权信息*/
  deleteCusAccountInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxDeleteCusSetAcc.do',
      data: param
    })
  },

  /*情报系统身份证认证*/
  validateIdCode(param){
    return HTTP({
      method: 'post',
      url: '/wxCusIdentityAuth.do',
      data: param
    })
  },

  /*查询对公客户资质信息*/
  getCusQuaInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCusQuaInfoList.do',
      data: param
    })
  },

  /*删除企业资质信息*/
  deleteCusQuaInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxDeleteCusQuaInfo.do',
      data: param
    })
  },

  /*新增企业资质信息*/
  addCusQuaInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxAddCusQuaInfo.do',
      data: param
    })
  },

  /*中征码查询*/
  getLoanCard(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryCusEigenCode.do',
      data: param
    })
  },

  /*根据国标行业查询内部行业和授信政策*/
  getInIndustry(param){
    return HTTP({
      method: 'post',
      url: '/wxGetIndustryConfi.do',
      data: param
    })
  }
  
}
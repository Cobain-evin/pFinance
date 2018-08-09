import HTTP from '@/server/config'

export default {
  
  /*获取字典数据*/
  getDictionary(){
    return HTTP({
      method: 'post',
      url: '/wxQuerySdicJson.do',
      data: {}
    })
  },

  /*获取资料信息*/
  getFileInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryDocEReceiveList.do',
      data: param
    })
  },

  /*新增资料信息*/
  addFiles(param){
    return HTTP({
      method: 'post',
      url: '/wxAddDocEReceive.do',
      data: param
    })
  },

  /*更新资料信息*/
  updateFiles(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateDocEReceive.do',
      data: param
    })
  },

  /*删除资料信息*/
  deleteFileInfo(param){
    return HTTP({
      method: 'post',
      url: '/wxDeleteDocEReceive.do',
      data: param
    })
  },

  /*权限 根据当前用户获取对应首页菜单模块*/
  getCurrentUserMenuAuthority(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryMenuAuthority.do',
      data: param
    })
  }


}
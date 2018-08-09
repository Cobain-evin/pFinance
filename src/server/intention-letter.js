import HTTP from '@/server/config'

export default {
  
  /*获取意向函申请列表*/
  getIntentionLetterList(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryIntentionLetterList.do',
      data: param
    })
  },

  /*获取意向函详情*/
  getIntentionLetterDetail(param){
    return HTTP({
      method: 'post',
      url: '/wxQueryIntentionLetterInfo.do',
      data: param
    })
  },

  /*新增意向函*/
  addIntentionLetter(param){
    return HTTP({
      method: 'post',
      url: '/wxAddIntentionLetter.do',
      data: param
    })
  },
  updateIntentionLetter(param){
    return HTTP({
      method: 'post',
      url: '/wxUpdateIntentionLetter.do',
      data: param
    })
  }
  
}
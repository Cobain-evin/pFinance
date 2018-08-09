import utils from '@/server/utils'
import popup from '@/server/popup'
import customer from '@/server/customer'
import lendingApply from '@/server/lending-apply'
import lendingRegister from '@/server/lending-register'
import intentionLetter from '@/server/intention-letter'
import project from '@/server/project'
import todo from '@/server/todo'
import workflow from '@/server/workflow'
import afterCheck from '@/server/after-check'
import repayRegister from '@/server/repay-register'

import HTTP from '@/server/config'

export default {
  index: {

    /*获取用户登录信息*/
    getUserInfo(){
      return HTTP({
        method: 'post',
        url: '/wxQueryUserInfo.do',
        data: {}
      })
    }

  },
  utils,
  popup,
  customer,
  lendingApply,
  lendingRegister,
  intentionLetter,
  project,
  todo,
  workflow,
  afterCheck,
  repayRegister
}
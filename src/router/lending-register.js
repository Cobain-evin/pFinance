import LendingRegister from '@/client/lending-register'
import LendingRegisterList from '@/client/lending-register/list'
import LendingRegisterEdit from '@/client/lending-register/edit'
import LendingRegisterEditBase from '@/client/lending-register/edit/base'
import LendingRegisterEditFile from '@/client/lending-register/edit/file'
import LendingRegisterCheck from '@/client/lending-register/check'
import LendingRegisterCheckBase from '@/client/lending-register/check/base'
import LendingRegisterCheckFile from '@/client/lending-register/check/file'


export default [{
  path: '/lending-register',
  component: LendingRegister,
  children: [{
    path: '',
    name: 'LendingRegister',
    component: LendingRegisterList,
    meta: {
      title: '放款登记'
    }
  }, {
    path: 'edit',
    name: 'LendingRegisterEdit',
    component: LendingRegisterEdit,
    children: [{
      path: ':serno',
      name: 'LendingRegisterEditBase',
      component: LendingRegisterEditBase,
      meta: {
        title: '放款登记申请',
        index: 1
      }
    },{
      path: 'file/:serno',
      name: 'LendingRegisterEditFile',
      component: LendingRegisterEditFile,
      meta: {
        title: '相关资料',
        description: '放款登记-资料信息',
        index: 2
      }
    }]
  }, {
    path: 'check',
    name: 'LendingRegisterCheck',
    component: LendingRegisterCheck,
    children: [{
      path: ':serno',
      name: 'LendingRegisterCheckBase',
      component: LendingRegisterCheckBase,
      meta: {
        title: '放款登记申请'
      }
    },{
      path: 'file/:serno',
      name: 'LendingRegisterCheckFile',
      component: LendingRegisterCheckFile,
      meta: {
        title: '相关资料',
        description: '放款登记-资料信息'
      }
    }]
  }]
}]

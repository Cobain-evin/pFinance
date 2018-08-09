import LendingApply from '@/client/lending-apply'
import LendingApplyList from '@/client/lending-apply/list'
import LendingApplyDetail from '@/client/lending-apply/detail'
import LendingApplyDetailBase from '@/client/lending-apply/detail/base'
import LendingApplyCreate from '@/client/lending-apply/create'
import LendingApplyCreateBase from '@/client/lending-apply/create/base'
import LendingApplyFee from '@/client/lending-apply/fee'
import LendingApplyTodo from '@/client/lending-apply/todo'
import LendingApplyRegister from '@/client/lending-apply/register'

export default [{
  path: '/lending-apply',
  component: LendingApply,
  children: [{
    path: '',
    name: 'LendingApply',
    component: LendingApplyList,
    meta: {
        title: '放款申请列表'
    }
  },{
    path: 'detail',
    component: LendingApplyDetail,
    children: [{
      path: ':serno/:handle',
      name: 'LendingApplyDetailBase',
      component: LendingApplyDetailBase,
      meta: {
        title: '放款申请',
        description: '查看放款申请-基本信息'
      }
    },{
      path: 'fee/:serno/:handle',
      name: 'LendingApplyDetailFee',
      component: LendingApplyFee,
      meta: {
        title: '放款申请',
        description: '查看放款申请-费用列表'
      }
    },{
      path: 'todo/:serno/:handle',
      name: 'LendingApplyDetailTodo',
      component: LendingApplyTodo,
      meta: {
        title: '放款申请',
        description: '查看放款申请-待落实事项'
      }
    },{
      path: 'register/:serno/:handle',
      name: 'LendingApplyDetailRegister',
      component: LendingApplyRegister,
      meta: {
        title: '放款申请',
        description: '查看放款申请-登记办理'
      }
    }]
  },{
    path: 'create',
    component: LendingApplyCreate,
    children: [{
      path: ':serno',
      name: 'LendingApplyCreateBase',
      component: LendingApplyCreateBase,
      meta: {
        title: '放款申请',
        description: '新增放款申请-基本信息'
      }
    },{
      path: 'fee/:serno',
      name: 'LendingApplyCreateFee',
      component: LendingApplyFee,
      meta: {
        title: '放款申请',
        description: '新增放款申请-费用列表'
      }
    },{
      path: 'todo/:serno',
      name: 'LendingApplyCreateTodo',
      component: LendingApplyTodo,
      meta: {
        title: '放款申请',
        description: '新增放款申请-待落实事项'
      }
    },{
      path: 'register/:serno',
      name: 'LendingApplyCreateRegister',
      component: LendingApplyRegister,
      meta: {
        title: '放款申请',
        description: '新增放款申请-登记办理'
      }
    }]
  }]
}]
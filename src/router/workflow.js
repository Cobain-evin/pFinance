import Workflow from '@/client/workflow'
import Success from '@/client/workflow/success'
import SelectNode from '@/client/workflow/select-node'
import WorkflowApprove from '@/client/workflow/approve'

//根据任务类型，引入流程审批/评审会
import WorkflowApproveApproval from '@/client/workflow/approve/approval'
import WorkflowApproveVoteApproval from '@/client/workflow/approve/vote-approval'


/**
 * 根据待办类型，引入不同业务的信息页面
 * */
//意向函基本信息
import IntentionLetterBase from '@/client/workflow/base-info/intention-letter-base'
//项目基本信息
import ProjectBase from '@/client/workflow/base-info/project-base'
//方案信息
import PlanBase from '@/client/workflow/base-info/plan-base'
//用信基本信息
import CreditApplyBase from '@/client/workflow/base-info/credit-apply-base'
//决议变更基本信息
import ProjectChangeBase from '@/client/workflow/base-info/project-change-base'
//代偿基本信息
import CompensatoryBase from '@/client/workflow/base-info/compensatory-base'
//放款申请基本信息
import LendingApplyBase from '@/client/workflow/base-info/lending-apply-base'
//保后检查基本信息
import AfterCheckBase from '@/client/workflow/base-info/after-check-base'


export default [{
  path: '/workflow',
  component: Workflow,
  children: [{
    path: 'selectnode',
    name: 'SelectNode',
    component: SelectNode,
    meta: {
      title: '选择节点和处理人'
    }
  },{
    path: 'success/:module',
    name: 'Success',
    component: Success,
    meta: {
      title: '提交成功'
    }
  },{
    path: 'approve',
    component: WorkflowApprove,
    children: [{
      path: ':tableType/:taskType/:serno/:handle?',
      name: 'WorkflowApproveBase',
      components: {
        //利用命名视图来展示不同业务类型的任务基本信息
        "PrjInfo": ProjectBase,
        "CtrIntentionLetter": IntentionLetterBase,
        "PrjCreditApp": CreditApplyBase,
        "PrjChgInfo": ProjectChangeBase,
        "ArpCompstAppInfo": CompensatoryBase,
        "PspCkTask": AfterCheckBase,
        "PvpLoanApply": LendingApplyBase
      },
      meta: {
        title: '流程审批',
        description: '流程审批--基本信息'
      }
    },{
      path: 'plan/:tableType/:taskType/:serno/:handle?',
      name: 'WorkflowApprovePlan',
      component: PlanBase,
      meta: {
        title: '流程审批',
        description: '流程审批--方案信息'
      }
    },{
      path: 'approval/:tableType/:taskType/:serno/:handle?',
      name: 'WorkflowApsproveApproval',
      components: {
        "instance": WorkflowApproveApproval,
        "vote": WorkflowApproveVoteApproval
      },
      meta: {
        title: '流程审批',
        description: '流程审批--审批信息'
      }
    }]
  }]
}] 
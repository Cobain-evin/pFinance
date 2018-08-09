import AfterCheck from '@/client/after-check'
import AfterCheckList from '@/client/after-check/list'
import AfterCheckEdit from '@/client/after-check/edit'
import AfterCheckDetail from '@/client/after-check/detail'
import AfterCheckBase from '@/client/after-check/base'
import AfterCheckContent from '@/client/after-check/content'
import AfterCheckFile from '@/client/after-check/file'

export default [{
  path: '/after-check',
  component: AfterCheck,
  children: [{
    path: '',
    name: 'AfterCheckList',
    component: AfterCheckList,
    meta: {
        title: '保后检查'
    }
  },{
    path: 'edit',
    name: 'AfterCheckEdit',
    component: AfterCheckEdit,
    children: [{
      path: ':serno/:handle',
      name: 'AfterCheckEditBase',
      component: AfterCheckBase,
      meta: {
        title: '保后检查登记',
        description: '保后检查登记--基本信息',
        index: 1
      }
    },{
      path: 'content/:serno/:handle',
      name: 'AfterCheckContent',
      component: AfterCheckContent,
      meta: {
        title: '保后检查登记',
        description: '保后检查登记--检查内容',
        index: 2
      }
    },{
      path: 'file/:serno/:handle',
      name: 'AfterCheckEditFile',
      component: AfterCheckFile,
      meta: {
        title: '保后检查登记',
        description: '保后检查登记--相关资料',
        index: 3
      }
    }]
  },,{
    path: 'detail',
    name: 'AfterCheckDetail',
    component: AfterCheckDetail,
    children: [{
      path: ':serno/:handle',
      name: 'AfterCheckDetailBase',
      component: AfterCheckBase,
      meta: {
        title: '保后检查登记',
        description: '保后检查查看--基本信息',
        index: 1
      }
    },{
      path: 'content/:serno/:handle',
      name: 'AfterCheckDetailContent',
      component: AfterCheckContent,
      meta: {
        title: '保后检查登记',
        description: '保后检查查看--检查内容',
        index: 2
      }
    },{
      path: 'file/:serno/:handle',
      name: 'AfterCheckDetailFile',
      component: AfterCheckFile,
      meta: {
        title: '保后检查登记',
        description: '保后检查查看--相关资料',
        index: 3
      }
    }]
  }]
}]
import IntentionLetter from '@/client/intention-letter'
import IntentionLetterList from '@/client/intention-letter/list'
import IntentionLetterDetail from '@/client/intention-letter/detail'
import IntentionLetterCreate from '@/client/intention-letter/create'


export default [{
  path: '/intention-letter',
  component: IntentionLetter,
  children: [{
    path: '',
    name: 'IntentionLetterList',
    component: IntentionLetterList,
    meta: {
        title: '意向函申请'
    }
  },{
    path: 'detail/:serno',
    name: 'IntentionLetterDetail',
    component: IntentionLetterDetail,
    meta: {
        title: '意向函详情'
    }
  },{
    path: 'create',
    name: 'IntentionLetterCreate',
    component: IntentionLetterCreate,
    meta: {
        title: '新增意向函'
    }
  }]
}]
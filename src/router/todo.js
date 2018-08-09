import Todo from '@/client/todo'
import Tasks from '@/client/todo/tasks'
import Notice from '@/client/todo/notice'

export default [{
  path: '/todo',
  component: Todo,
  children: [{
    path: '',
    name: 'Tasks',
    component: Tasks,
    meta: {
        title: '工作通知'
    }
  },{
    path: 'notice',
    name: 'Notice',
    component: Notice,
    meta: {
        title: '工作通知'
    }
  }]
}]
import Project from '@/client/project'
import ProjectList from '@/client/project/list'
import ProjectDetail from '@/client/project/detail'
import ProjectPlan from '@/client/project/plan'


export default [{
  path: '/project',
  component: Project,
  children: [{
    path: '',
    name: 'Project',
    component: ProjectList,
    meta: {
      title: '项目列表'
    }
  }, {
    path: 'detail/:serno',
    name: 'ProjectDetail',
    component: ProjectDetail,
    meta: {
      title: '项目详情'
    }
  }, {
    path: 'plan/:serno',
    name: 'ProjectPlan',
    component: ProjectPlan,
    meta: {
      title: '方案信息'
    }
  }]
}]
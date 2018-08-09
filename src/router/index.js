import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from '@/client'
import CustomerRouter from '@/router/customer'
import LendingApplyRouter from '@/router/lending-apply'
import LendingRegisterRouter from '@/router/lending-register'
import IntentionLetterRouter from '@/router/intention-letter'
import ProjectRouter from '@/router/project'
import TodoRouter from '@/router/todo'
import WorkflowRouter from '@/router/workflow'
import AfterCheckRouter from '@/router/after-check'
import RepayRegisterRouter from '@/router/repay-register'


let router = new VueRouter({
    mode: 'history',
    base:'/wxqyh/',
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
        savedPosition = {x: 0, y: 0}
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
    },
    routes: [{
        path: '/',
        name: 'Index',
        component: Index
    },
        ...CustomerRouter,
        ...LendingApplyRouter,
        ...LendingRegisterRouter,
        ...IntentionLetterRouter,
        ...ProjectRouter,
        ...TodoRouter,
        ...WorkflowRouter,
        ...AfterCheckRouter,
        ...RepayRegisterRouter
    ]
})

router.afterEach(to => {
    let title = to.meta.title
    if (title) {
        document.title = title;
    } else {
        document.title = '伙伴集群业务系统';
    }
})

export default router;
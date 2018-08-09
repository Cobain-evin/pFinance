import Vue from 'vue'

/*路由配置*/
import router from './router'

/*Vuex状态管理*/
import store from './store'

/*MintUI组件*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

/*自定义的插件*/
import Utils from '@/lib/utils'
Vue.use(Utils)

/*Lodash*/
import _ from 'lodash'

/*VeeValidate*/
import '@/lib/validate'

/*vue-img-inputer*/
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

Vue.component('ImgInputer', ImgInputer)

Vue.config.productionTip = false

import App from './App'

new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
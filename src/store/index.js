import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tempEMP_SID: '',  //虚户完成流程审批所用EMP_SID
    DIC: {}, //字典项
    wfParam: {}, //业务页面跳转到流程节点选择页面传递的参数
    wfInfo: {}  //待办任务领取任务的流程信息
  },
  mutations: {

    //更新字典项
    updateDic(state, dic){
      state.DIC = dic
      localStorage.setItem('DIC', JSON.stringify(dic))
    },

    updateWfParam(state, param){
      state.wfParam = param
    },

    updateWfInfo(state, wfInfo){
      state.wfInfo = wfInfo
    },

    updateTempEMP_SID(state, emp_sid){
      state.tempEMP_SID = emp_sid
    }

  },
  actions: {

    //更新字典项
    refreshDic(context, dic){
      context.commit('updateDic', dic)
    },

    refreshWfParam(context, param){
      context.commit('updateWfParam', param)
    },

    refreshWfInfo(context, wfInfo){
      context.commit('updateWfInfo', wfInfo)
    },

    refreshTempEMP_SID(context, emp_sid){
      context.commit('updateTempEMP_SID', emp_sid)
    }

  }
})
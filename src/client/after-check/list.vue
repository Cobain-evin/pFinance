<template>
  <div class="pad-head">
    <div class="header-bar flexbox-sb no-add">
      <div class="search-bar flexbox-sb">
        <span class="h-icon-search"></span>
        <form action="javascript:;">
          <input 
            type="search" 
            placeholder="搜索" 
            v-model="value" 
            @keyup.13="getValueListData"
            ref="searchInput"
          >
        </form>
      </div>
    </div>
    <div class="list-block todo-list after-check-list">
      <div class="num">共{{afterCheckNum}}条</div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
        infinite-scroll-immediate-check="false"
      >
        <div class="todo-box" v-for="(item, index) in afterCheckList" :key="index">
          <div class="todo-title">{{item.prj_name}}</div>
          <div class="todo-content">
            <div class="detail line">
              <div class="info">
                <p>
                  <span class="l">检查任务描述</span>
                  <span class="r">{{item.task_desc}}</span>
                </p>
              </div>
            </div>
            <div class="detail">
              <div class="info">
                <p>
                  <span class="l">任务开始日期</span>
                  <span>{{item.task_start_date}}</span>
                </p>
                <p>
                  <span class="l">要求完成日期</span>
                  <span>{{item.require_end_date}}</span>
                </p>
                <p>
                  <span class="l">检查任务状态</span>
                  <span :class="{'green': item.taskstatus=='03'}">{{item.taskstatusCN}}</span>
                </p>
              </div>
              <div class="actions">
                <a 
                  class="btn smaller" 
                  @click="edit(item.task_no)" 
                  v-if="item.taskstatus=='01' || item.taskstatus=='02' || item.taskstatus=='04'"
                >处理</a>
                <a class="btn smaller" @click="check(item.task_no)">查看</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-box" v-show="loading">
      <div v-show="!allLoaded">
        <mt-spinner type="fading-circle" color="#4b77b0" :size="50"></mt-spinner>
        <span>加载中...</span>
      </div>
      <span v-show="allLoaded">数据已全部加载！</span>
    </div>
  </div>
</template>

<script>
import Server from '@/server'
import { mapState } from 'vuex'
export default {
  data() {
    return {

      //保后检查数据列表
      afterCheckNum: null,
      afterCheckList: [],

      /*分页相关参数*/
      loading: false,
      allLoaded: false,
      pageSize: 20,
      pageNum: 1,
      value: ""

    };
  },
  computed: {
    param(){
      return {
        'pageInfo.maxLine': this.pageSize,
        'pageInfo.targetPage': this.pageNum,
        'paramValue': this.value
      }
    },
    ...mapState({
      getDIC: state => {
        let localData = JSON.parse(localStorage.getItem('DIC'))
        if(state.DIC==={} && localData){
          this.$tore.commit('updateDic', localData)
        }
        return state.DIC
      }
    })
  },
  created(){
    this.getListData()
  },
  methods: {

    //获取保后检查列表数据
    getListData(){
      Server.afterCheck.getAfterCheckList(this.param)
      .then(res => {
        if(res.returnData && res.returnData.PspCkTaskList){
          let afterCheckData = res.returnData
          this.afterCheckNum = afterCheckData.pageInfo.recordSize
          this.afterCheckList = _.concat(this.afterCheckList, afterCheckData.PspCkTaskList)
          this.allLoaded = this.afterCheckList.length == this.afterCheckNum
          this.loading = this.allLoaded
        }
        
        _.forEach(this.afterCheckList, item => {
          item.taskstatusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_JCRW_STA', item.taskstatus)
        })
      })
    },

    //查看保后检查登记
    check(taskNo){
      this.$router.push('/after-check/detail/'+ taskNo + '/check')
    },

    //处理保后检查登记
    edit(taskNo){
      this.$router.push('/after-check/edit/'+ taskNo + '/edit')
    },

    /*关键字查询*/
    getValueListData(){
      let This = this
      this.afterCheckList = []
      this.pageNum = 1
      This.getListData()
      this.$refs.searchInput.blur();
    },

    /*无限滚动加载*/
    loadMore(){
      this.loading = true
      if(this.allLoaded){
        return;
      }
      this.pageNum++
      this.getListData()
    }

  }
};
</script>

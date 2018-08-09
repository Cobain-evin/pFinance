<template>
  <div class="pad-head">
    <div class="header-bar no-add flexbox-sb">
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
    <div class="list-block">
      <div class="num">共{{listNum}}条</div>
      <div class="item-list">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="false"
        >
          <li 
            v-for="(item,index) in projectList" 
            :key="index"
            @click="checkDetail(item.prj_no)"
          >
            <div class="item-title">
              <span class="item-name">{{item.prj_name}}</span>
            </div>
            <div class="item-content">
              <div class="item-content-line">
                <span>上报日期：{{item.report_date}}</span>
                <span>是否放款：{{item.if_loanCN}}</span>
              </div>
              <div class="item-content-line">
                <span>项目状态：{{item.prj_statusCN}}</span>
                <span>审批状态：{{item.approve_statusCN}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-box" v-show="loading">
        <div v-show="!allLoaded">
          <mt-spinner type="fading-circle" color="#4b77b0" :size="50"></mt-spinner>
          <span>加载中...</span>
        </div>
        <span v-show="allLoaded">数据已全部加载！</span>
      </div>
    </div>
  </div>
</template>

<script>
import Server from '@/server'
import { mapState } from 'vuex'
export default {
  data(){
    return {
      listNum: 0,
      projectList: [],

      /*分页相关参数*/
      loading: false,
      allLoaded: false,
      pageSize: 20,
      pageNum: 1,
      value: ''
    }
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

    /*获取列表数据*/
    getListData(){
      Server.project.getProjectList(this.param)
      .then(res => {
        if(res.returnData && res.returnData.PrjList){
          let data = res.returnData
          this.listNum = data.pageInfo.recordSize
          this.projectList = _.concat(this.projectList, data.PrjList)
          this.allLoaded = this.projectList.length == this.listNum
          this.loading = this.allLoaded
        }

        _.forEach(this.projectList, item => {
          item.if_loanCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_YES_NO', item.if_loan)
          item.prj_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_PRJ_STATUS', item.prj_status)
          item.approve_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_APPR_STATUS', item.approve_status)
        })
      })
    },

    /*关键字查询*/
    getValueListData(){
      this.projectList = []
      this.pageNum = 1
      this.getListData()
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
    },

    /*查看详情*/
    checkDetail(projectNo){
      this.$router.push('/project/detail/' + projectNo)
    }
  }
}
</script>

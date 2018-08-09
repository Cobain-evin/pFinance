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
    <div class="list-block todo-list after-check-list">
      <div class="num">共{{listNum}}条</div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="false"
      >
        <div class="todo-box" v-for="(item, index) in lendingRegisterList" :key="index">
          <div class="todo-title">{{item.prj_name}}</div>
          <div class="todo-content">
            <div class="detail">
              <div class="info">
                <p>
                  <span class="l">产品名称：</span>
                  <span>{{item.prd_name}}</span>
                </p>
                <p>
                  <span class="l">放款编号：</span>
                  <span>{{item.loan_no}}</span>
                </p>
                <p>
                  <span class="l">放款金额：</span>
                  <span>{{item.loan_amt}}</span>
                </p>
                <p>
                  <span class="l">登记状态：</span>
                  <span>{{item.input_statusCN}}</span>
                </p>
                <p>
                  <span class="l">审批状态：</span>
                  <span>{{item.approve_statusCN}}</span>
                </p>
              </div>
              <div class="actions">
                <a 
                  class="btn smaller" 
                  @click="edit(item)" 
                  v-if="(item.input_status=='10' || item.input_status=='50') && (item.approve_status=='000' || item.approve_status=='992')"
                >登记</a>
                <a class="btn smaller" @click="check(item)">查看</a>
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
  </div>
</template>

<script>
import Server from '@/server'
import { mapState } from 'vuex'
export default {
  data(){
    return {
      listNum: 0,
      lendingRegisterList: [],

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
      Server.lendingRegister.getLendingRegisterList(this.param)
      .then(res => {
        if(res.returnData && res.returnData.PvpLoanInputList){
          let data = res.returnData
          this.listNum = data.pageInfo.recordSize
          this.lendingRegisterList = _.concat(this.lendingRegisterList, data.PvpLoanInputList)
          this.allLoaded = this.lendingRegisterList.length == this.listNum
          this.loading = this.allLoaded
        }

        _.forEach(this.lendingRegisterList, item => {
          item.input_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_INPUT_STATUS', item.input_status)
          item.approve_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_APPR_STATUS', item.approve_status)
        })
      })
    },

    /*关键字查询*/
    getValueListData(){
      this.lendingRegisterList = []
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
    check(item){
      this.$router.push('/lending-register/check/' + item.loan_input_id)
    },

    //登记
    edit(item){
      this.$router.push('/lending-register/edit/' + item.loan_input_id)
    }

  }
}
</script>

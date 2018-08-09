<template>
  <div class="pad-head">
    <div class="header-bar flexbox-sb">
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
      <router-link tag="div" to="/intention-letter/create" class="add">
        <span class="h-icon-add"></span>
        新增
      </router-link>
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
            v-for="(item,index) in intentionLetterList" 
            :key="index"
            @click="checkDetail(item.serno)"
          >
            <div class="item-title">
              <span class="item-name">{{item.cus_name}}</span>
              <span class="item-type" :class="item.letter_type_class">{{item.letter_typeCN}}</span>
            </div>
            <div class="item-content">
              <div class="item-content-line">
                <span>合作渠道：{{item.cc_name}}</span>
              </div>
              <div class="item-content-line">
                <span>产品名称：{{item.prd_name}}</span>
                <span :class="item.statusColor">审批状态：{{item.approve_statusCN}}</span>
              </div>
              <div class="item-content-line">
                <span>申请金额：{{item.apply_amt}}</span>
                <span>申请日期：{{item.apply_date}}</span>
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
      intentionLetterList: [],

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
      Server.intentionLetter.getIntentionLetterList(this.param)
      .then(res => {
        if(res.returnData && res.returnData.CtrIntentionLetterList){
          let data = res.returnData
          this.listNum = data.pageInfo.recordSize
          this.intentionLetterList = _.concat(this.intentionLetterList, data.CtrIntentionLetterList)
          this.allLoaded = this.intentionLetterList.length == this.listNum
          this.loading = this.allLoaded
        }

        _.forEach(this.intentionLetterList, item => {
          item.letter_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'CTR_APPLY_TYPE', item.letter_type)
          item.approve_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_APPR_STATUS', item.approve_status)
          //意向函类型不同，列表名称展示不同字段
          if(item.letter_type==1){
            // item.title_name = item.prj_name
            item.letter_type_class = 'blue'
          }
          else if(item.letter_type==2){
            // item.title_name = item.cus_name
            item.letter_type_class = 'red'
          }
          //根据意向函审批状态不同，展示不同颜色
          if(item.approve_status == '997'){ //审批通过
            item.statusColor = 'green'
          }
          else if(_.indexOf(['990', '992', '995', '998'], item.approve_status) > -1){  //撤销、打回、复位、否决（不同意）
            item.statusColor = 'red'
          }
        })
      })
    },

    /*关键字查询*/
    getValueListData(){
      this.intentionLetterList = []
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
    checkDetail(serno){
      this.$router.push('/intention-letter/detail/' + serno)
    }
  }
}
</script>

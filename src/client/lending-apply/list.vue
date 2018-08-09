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
      <div tag="div" class="add" @click="showContractPopup">
        <span class="h-icon-add"></span>
        新增
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
            v-for="(item,index) in lendingApplyList" 
            :key="index"
            @click="checkDetail(item)"
          >
            <div class="item-title">
              <span class="item-name">{{item.prj_name}}</span>
            </div>
            <div class="item-content">
              <div class="item-content-line">
                <span>放款编号：{{item.loan_no}}</span>
                <span>产品名称：{{item.prd_name}}</span>
              </div>
              <div class="item-content-line">
                <span>放款金额：{{item.loan_amt}}</span>
                <span>申请状态：{{item.loan_app_statusCN}}</span>
              </div>
              <div class="item-content-line">
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
    <select-contract :isShow="selectContractShow" @select="selectContract"></select-contract>
  </div>
</template>

<script>
import Server from '@/server'
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import SelectContract from '@/client/popupList/SelectContract'
export default {
  data(){
    return {
      listNum: 0,
      lendingApplyList: [],

      /*分页相关参数*/
      loading: false,
      allLoaded: false,
      pageSize: 20,
      pageNum: 1,
      value: '',

      selectContractShow: false
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
  components: {
    SelectContract
  },
  created(){
    this.getListData()
  },
  methods: {

    /*获取列表数据*/
    getListData(){
      Server.lendingApply.getLendingApplyList(this.param)
      .then(res => {
        if(res.returnData && res.returnData.PvpLoanApplyList){
          let data = res.returnData
          this.listNum = data.pageInfo.recordSize
          this.lendingApplyList = _.concat(this.lendingApplyList, data.PvpLoanApplyList)
          this.allLoaded = this.lendingApplyList.length == this.listNum
          this.loading = this.allLoaded
        }

        _.forEach(this.lendingApplyList, item => {
          item.loan_app_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PVP_LOAN_APP_STATUS', item.loan_app_status)
          item.approve_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_APPR_STATUS', item.approve_status)

          //只有审批状态为“打回”或者“待发起”的才可以编辑
          item.canEdit = (item.approve_status == '000' || item.approve_status == '992')
        })
      })
    },

    /*关键字查询*/
    getValueListData(){
      this.lendingApplyList = []
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
    checkDetail(item){
      this.$router.push('/lending-apply/detail/' + item.loan_no + '/' + item.canEdit)
    },

    /*选择合同*/
    showContractPopup(){
      this.selectContractShow = true
    },

    selectContract(contract){
      if(contract){
        Server.lendingApply.addLendingApply({"cont_no": contract.cont_no})
        .then(res => {
          if(res.returnCode == '000'){
            let loanNo = res.returnData.loan_no
            this.$router.push('/lending-apply/create/' + loanNo)
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      }
      this.selectContractShow = false
    },

  }
}
</script>

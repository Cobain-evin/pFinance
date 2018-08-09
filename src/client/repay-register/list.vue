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
        <div class="todo-box" v-for="(item, index) in repayRegisterList" :key="index">
          <div class="todo-title">{{item.prj_name}}</div>
          <div class="todo-content">
            <div class="detail">
              <div class="info">
                <p>
                  <span class="l">还款登记编号</span>
                  <span>{{item.ret_no}}</span>
                </p>
                <p>
                  <span class="l">单据状态</span>
                  <span>{{item.check_statusCN}}</span>
                </p>
                <p v-if="item.dateShow">
                  <span class="l">还款日期</span>
                  <span>{{item.input_date}}</span>
                </p>
                <p v-if="item.act_cont_amt">
                  <span class="l">回款金额</span>
                  <span>{{item.act_cont_amt}}</span>
                </p>
              </div>
              <div class="actions">
                <a 
                  class="btn smaller" 
                  @click="edit(item)" 
                  v-if="item.check_status=='01' || item.check_status=='05'"
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
import Server from "@/server";
import { mapState } from "vuex";
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      listNum: 0,
      repayRegisterList: [],

      /*分页相关参数*/
      loading: true,
      allLoaded: false,
      pageSize: 20,
      pageNum: 1,
      value: ""
    };
  },
  computed: {
    param() {
      return {
        "pageInfo.maxLine": this.pageSize,
        "pageInfo.targetPage": this.pageNum,
        "paramValue": this.value
      };
    },
    ...mapState({
      getDIC: state => {
        let localData = JSON.parse(localStorage.getItem("DIC"));
        if (state.DIC === {} && localData) {
          this.$tore.commit("updateDic", localData);
        }
        return state.DIC;
      }
    })
  },
  created() {
    this.getListData();
  },
  methods: {
    /*获取列表数据*/
    getListData() {
      Server.repayRegister.getRepayRegisterList(this.param).then(res => {
        if (res.returnData && res.returnData.ArpReturnRegList) {
          let data = res.returnData;
          this.listNum = data.pageInfo.recordSize;
          this.repayRegisterList = _.concat(this.repayRegisterList, data.ArpReturnRegList);
          this.allLoaded = this.repayRegisterList.length == this.listNum;
          this.loading = this.allLoaded;
        }

        _.forEach(this.repayRegisterList, item => {
         
          // 单据状态
          item.check_statusCN = this.$dicAction.getCnNameByCode(
            this.getDIC,
            "STD_PUB_REVIEW_STATE",
            item.check_status
          );

          item.dateShow = true;
          if(item.check_status=='01'){
            item.dateShow = false;
          }
          
        });

      });
    },

    /*关键字查询*/
    getValueListData() {
      this.repayRegisterList = [];
      this.pageNum = 1;
      this.getListData();
      this.$refs.searchInput.blur();
    },

    /*无限滚动加载*/
    loadMore() {
      this.loading = true;
      if (this.allLoaded) {
        return;
      }
      this.pageNum++;
      this.getListData();
    },

    /*查看详情*/
    check(item){
      this.$router.push("/repay-register/detail/" + item.ret_no);
    },

    //登记
    edit(item){
      //判断是否在进行代偿申请等
      Server.repayRegister.canRepayRegisterVali({"bill_no": item.bill_no, "flag": 'return'})
      .then(res => {
        if(res.returnCode == '000'){
          this.$router.push("/repay-register/edit/" + item.ret_no);
        }
        else{
          MessageBox.alert(res.returnMsg)
        }
      })
      
    }


  }
};
</script>

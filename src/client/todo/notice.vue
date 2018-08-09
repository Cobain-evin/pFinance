<template>
  <div>
    <mt-loadmore 
      :top-method="loadMore" 
      ref="loadmore"
    >
      <!-- <div class="allLoaded" v-if="allLoaded">已经全部加载</div> -->
      <div class="no-data" v-if="!noticeList.length">没有数据</div>
      <div class="todo-list" v-for="(item, index) in noticeList" :key="index">
        <div class="time-box">
          <div class="time">{{item.wfi_end_time}}</div>
        </div>
        <div class="todo-box">
          <div class="todo-title">{{item.appl_typeCN}}</div>
          <div class="todo-content">
            <h3>{{item.cus_name}}</h3>
            <div class="detail">
              <div class="info">
                <p>
                  <span class="l">放款金额</span>
                  <span>{{item.amt}}元</span>
                </p>
                <p>
                  <span class="l">审批状态</span>
                  <span>{{item.wfi_statusCN}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import Server from '@/server'
  import { mapState } from 'vuex'
  export default {
    data(){
      return {
        noticeList: [],
        noticeNum: 0,

        /*分页相关参数*/
        allLoaded: false,
        pageSize: 10,
        pageNum: 1
      }
    },
    computed: {
      param(){
        return {
          "pageInfo.maxLine": this.pageSize,
          "pageInfo.targetPage": this.pageNum
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
      this.getNoticeList()
    },
    methods: {

      //获取审批通知列表
      getNoticeList(){
        Server.todo.getNoticeList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.ApprovalNoticeList){
            this.noticeNum = res.returnData.pageInfo.recordSize
            this.noticeList = _.concat(this.noticeList, res.returnData.ApprovalNoticeList)
            this.allLoaded = this.noticeList.length == this.noticeNum

            _.forEach(this.noticeList, item => {
              item.appl_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'ZB_BIZ_CATE', item.appl_type)
              item.wfi_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_APPR_STATUS', item.wfi_status)
            })
          }
        })
      },

      //下拉加载更多
      loadMore(){
        if(!this.allLoaded){
          this.$refs.loadmore.onTopLoaded()
          this.pageNum++
          this.getNoticeList()
        }
        else{
          this.$refs.loadmore.onTopLoaded()
        }
        
      }



    }
  }
</script>
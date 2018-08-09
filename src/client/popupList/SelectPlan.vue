<template>
  <div>
    <!--选择方案-->
    <mt-popup
      v-model="visible"
      position="right"
    >
      <div class="popup-box">
        <div class="pad-head pad-fixedfoot">
          <div class="header-bar no-add flexbox-sb">
            <div class="search-bar flexbox-sb">
              <span class="h-icon-search"></span>
              <form action="javascript:;">
                <input 
                  type="search" 
                  placeholder="搜索" 
                  v-model="searchValue" 
                  @keyup.13="getValueListData"
                  ref="searchInput"
                >
              </form>
            </div>
          </div>
          <div class="list-block">
            <div class="num">共{{planNum}}条</div>
            <div class="item-list">
              <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
              >
                <li 
                  class="list-checkbox"
                  v-for="(item,index) in planList" 
                  :key="index"
                  @click="selectPlan(item, index)"
                >
                  <div 
                    class="checkbox-column"
                    :class="{
                      'h-icon-checkbox': selectedIndex!==index, 
                      'h-icon-checkbox-active': selectedIndex==index
                    }"
                  >
                  </div>
                  <div class="content-column">
                    <div class="item-title">
                      <span class="item-name">{{item.plan_name}}</span>
                    </div>
                    <div class="item-content">
                      <div class="item-content-line">
                        <span>方案编号：{{item.plan_no}}</span>
                        <span>方案类型：{{item.plan_typeCN}}</span>
                      </div>
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
          <div class="btn-box fixed">
            <a class="btn small light" @click="cancel">取 消</a>
            <a class="btn small" @click="select">确 定</a>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Server from '@/server'
  export default {
    data(){
      return {
        visible: this.isShow,

        selectedIndex: null,
        selectedPlan: null,

        //请求列表相关参数
        planNum: 0,
        planList: [],
        loading: false,
        allLoaded: false,
        pageSize: 20,
        pageNum: 1,
        searchValue: ''
      }
    },
    props: {
      isShow: {
        default: false
      },
      addInfo: {
        //查询方案信息必须带上项目相关信息
        type: Object,
        required: true
      }
    },
    watch: {
      isShow: function(val){
        this.visible = val
        if(val){
          this.getPlanList()
          this.selectedIndex = null
        }
      }
    },
    computed: {

      //查询客户列表的参数
      param(){
        return {
          'pageInfo.maxLine': this.pageSize,
          'pageInfo.targetPage': this.pageNum,
          'paramValue': this.searchValue,
          'prj_no': this.addInfo.prj_no,
          'chg_no': this.addInfo.chg_no
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
    methods: {

      //取消
      cancel(){
        this.$emit('select')
        this.searchValue = ''
        this.planList = []
        this.loading = false
        this.selectedPlan = null
      },

      //确定
      select(){
        this.$emit('select', this.selectedPlan)
        this.searchValue = ''
        this.planList = []
        this.loading = false
      },

      selectPlan(plan, index){
        if(this.index || this.index==0){
          plan.index = this.index
        }
        this.selectedPlan = plan
        this.selectedIndex = index
      },

      getPlanList(){
        //查询客户列表
        Server.popup.getPlanList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.PrjPlanList){
            let data = res.returnData
            this.planNum = data.pageInfo.recordSize
            this.planList = _.concat(this.planList, data.PrjPlanList)
            this.allLoaded = this.planList.length == this.planNum
            this.loading = this.allLoaded
          }
          
          _.forEach(this.planList, item => {
            item.plan_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_PLAN_TYPE', item.plan_type)
          })
        })
      },

      /*关键字查询*/
      getValueListData(){
        this.planList = []
        this.pageNum = 1
        this.getPlanList()
        this.$refs.searchInput.blur();
      },

      /*无限滚动加载*/
      loadMore(){
        this.loading = true
        if(this.allLoaded){
          return;
        }
        this.pageNum++
        this.getPlanList()
      }

    }
  }
</script>
<template>
  <div>
    <!--选择合同-->
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
            <div class="num">共{{contractNum}}条</div>
            <div class="item-list">
              <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
              >
                <li 
                  class="list-checkbox"
                  v-for="(item,index) in contractList" 
                  :key="index"
                  @click="selectContract(item, index)"
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
                    <div class="item-content">
                      <div class="item-content-line">
                        <span>合同编号：{{item.cont_no}}</span>
                      </div>
                      <div class="item-content-line">
                        <span>项目名称：{{item.prj_name}}</span>
                      </div>
                      <div class="item-content-line">
                        <span>合同金额：{{item.ctr_amt}}</span>
                        <span>可用金额：{{item.cont_amt_usable}}</span>
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
        selectedContract: null,

        //请求列表相关参数
        contractNum: 0,
        contractList: [],
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
      }
    },
    watch: {
      isShow: function(val){
        this.visible = val
        if(val){
          this.getContractList()
          this.selectedIndex = null
        }
      }
    },
    computed: {

      //查询合同列表的参数
      param(){
        return {
          'pageInfo.maxLine': this.pageSize,
          'pageInfo.targetPage': this.pageNum,
          'paramValue': this.searchValue
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
        this.loading = false
        this.contractList = []
        this.selectedContract = null
      },

      //确定
      select(){
        this.$emit('select', this.selectedContract)
        this.searchValue = ''
        this.loading = false
        this.contractList = []
      },

      selectContract(contract, index){
        if(this.index || this.index==0){
          contract.index = this.index
        }
        this.selectedContract = contract
        this.selectedIndex = index
      },

      getContractList(){
        //查询合同列表
        Server.popup.getContractList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.CtrContApplyList){
            let data = res.returnData
            this.contractNum = data.pageInfo.recordSize
            this.contractList = _.concat(this.contractList, data.CtrContApplyList)
            this.allLoaded = this.contractList.length == this.contractNum
            this.loading = this.allLoaded
          }
        })
      },

      /*关键字查询*/
      getValueListData(){
        this.contractList = []
        this.pageNum = 1
        this.getContractList()
        this.$refs.searchInput.blur();
      },

      /*无限滚动加载*/
      loadMore(){
        this.loading = true
        if(this.allLoaded){
          return;
        }
        this.pageNum++
        this.getContractList()
      }

    }
  }
</script>
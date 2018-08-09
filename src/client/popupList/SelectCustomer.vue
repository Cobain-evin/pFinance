<template>
  <div>
    <!--选择客户-->
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
            <div class="num">共{{customerNum}}条</div>
            <div class="item-list">
              <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
              >
                <li 
                  class="list-checkbox"
                  v-for="(item,index) in customerList" 
                  :key="index"
                  @click="selectCustomer(item, index)"
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
                      <span class="item-name">{{item.cus_name}}</span>
                      <span class="item-type" :class="item.cus_type_class">{{item.cus_typeCN}}</span>
                    </div>
                    <div class="item-content">
                      <div class="item-content-line">
                        <span>客户编号：{{item.cus_id}}</span>
                      </div>
                      <div class="item-content-line">
                        <span>管护经理：{{item.manager_id_displayname || item.new_mgr_id_displayname}}</span>
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
        selectedCustomer: null,

        //请求列表相关参数
        customerNum: 0,
        customerList: [],
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
      //index：父级页面中展示信息为list时（如账户信息、股权信息等），list每一条都可以调用该组件，index用来标识
      index: {
        required: false
      },
      /**
       ** 客户查询的类型
       ** 法定代表人 legal
       ** 实际控制人 realControl
       ** 股东 stock 
       */
      type: {
        required: false
      }
    },
    watch: {
      isShow: function(val){
        this.visible = val
        if(val){
          this.getCustomerList()
          this.selectedIndex = null
        }
      }
    },
    computed: {

      //查询客户列表的参数
      param(){
        let param = {
          'pageInfo.maxLine': this.pageSize,
          'pageInfo.targetPage': this.pageNum,
        }
        if(this.type){
          param.queryType = this.type
          param.flagCus = '1'
          param["CusBase.cus_name"] = this.searchValue
          if(this.type == 'legal'){
            param.cus_type = '1'
          }
        }
        else{
          param.paramValue = this.searchValue
        }
        return param
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
        this.customerList = []
        this.loading = false
        this.selectedCustomer = null
      },

      //确定
      select(){
        this.$emit('select', this.selectedCustomer)
        this.searchValue = ''
        this.loading = false
        this.customerList = []
      },

      selectCustomer(customer, index){
        if(this.index || this.index==0){
          customer.index = this.index
        }
        this.selectedCustomer = customer
        this.selectedIndex = index
      },

      getCustomerList(){
        //查询客户列表
        if(this.type){
          this.getExactCustomerList()
        }
        else{
          this.getAllCustomerList()
        }
        
      },

      //查询普通客户
      getAllCustomerList(){
        Server.popup.getAllCustomerList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.CusBaseList){
            let data = res.returnData
            this.customerNum = data.pageInfo.recordSize
            this.customerList = _.concat(this.customerList, data.CusBaseList)
            this.allLoaded = this.customerList.length == this.customerNum
            this.loading = this.allLoaded
          }
          
          _.forEach(this.customerList, item => {
            item.cus_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CUS_TYPE', item.cus_type)
            item.cus_type_class = item.cus_type == '101' ? 'red' : 'blue'
          })
        })
      },

      //精确查询客户
      getExactCustomerList(){
        Server.popup.getExactCustomerList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.CusBaseList){
            let data = res.returnData
            this.customerNum = data.pageInfo.recordSize
            this.customerList = _.concat(this.customerList, data.CusBaseList)
            this.allLoaded = this.customerList.length == this.customerNum
            this.loading = this.allLoaded
          }
          
          _.forEach(this.customerList, item => {
            item.cus_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CUS_TYPE', item.cus_type)
            item.cus_type_class = item.cus_type == '101' ? 'red' : 'blue'
          })
        })
      },

      /*关键字查询*/
      getValueListData(){
        this.customerList = []
        this.pageNum = 1
        this.getCustomerList()
        this.$refs.searchInput.blur();
      },

      /*无限滚动加载*/
      loadMore(){
        this.loading = true
        if(this.allLoaded){
          return;
        }
        this.pageNum++
        this.getCustomerList()
      }

    }
  }
</script>
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
      <router-link tag="div" to="/customer/create" class="add">
        <span class="h-icon-add"></span>
        新增
      </router-link>
    </div>
    <div class="list-block">
      <div class="num">共{{customerNum}}人</div>
      <div class="item-list">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="false"
        >
          <li 
            v-for="(item, index) in customerList" 
            :key="index"
            @click="checkDetail(item.cus_type, item.cus_id)"
          >
            <div class="item-title">
              <span class="item-name">{{item.cus_name}}</span>
              <span class="item-type" :class="item.cus_type_class">{{item.cus_typeCN}}</span>
            </div>
            <div class="item-content">
              <div class="item-content-line">
                <span>客户编号：{{item.cus_id}}</span>
                <span>管护经理：{{item.manager_id_displayname}}</span>
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
      customerNum: 0,
      customerList: [],

      /*分页相关参数*/
      loading: true,
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
      Server.customer.getCustomerList(this.param)
      .then(res => {
        if(res.returnData && res.returnData.CusList){
          let cusListData = res.returnData
          this.customerNum = cusListData.pageInfo.recordSize
          this.customerList = _.concat(this.customerList, cusListData.CusList)
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
      let This = this
      this.customerList = []
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
    },

    /*查看详情*/
    checkDetail(customerType, customerId){
      /*根据客户类型做不同页面跳转，暂定101为个人客户，其他编码均为对公客户*/
      if(customerType == '101'){
        this.$router.push('/customer/detail/indi/' + customerId)
      }else{
        this.$router.push('/customer/detail/corp/' + customerId)
      }
    }
  }

}
</script>

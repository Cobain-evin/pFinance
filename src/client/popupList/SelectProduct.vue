<template>
  <div>
    <!--选择产品-->
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
            <div class="num">共{{productNum}}条</div>
            <div class="item-list">
              <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
              >
                <li 
                  class="list-checkbox"
                  v-for="(item,index) in productList" 
                  :key="index"
                  @click="selectProduct(item, index)"
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
                      <span class="item-name">{{item.prdname}}</span>
                    </div>
                    <div class="item-content">
                      <div class="item-content-line">
                        <span>产品编号：{{item.prdid}}</span>
                        <span>产品类型：{{item.prd_typeCN}}</span>
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
        selectedProduct: null,

        //请求列表相关参数
        productNum: 0,
        productList: [],
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
          this.getProductList()
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
        this.productList = []
        this.loading = false
        this.selectedProduct = null
      },

      //确定
      select(){
        this.$emit('select', this.selectedProduct)
        this.searchValue = ''
        this.productList = []
        this.loading = false
      },

      selectProduct(product, index){
        this.selectedProduct = product
        this.selectedIndex = index
      },

      getProductList(){
        //查询客户列表
        Server.popup.getProductList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.PrdBasicinfoList){
            let data = res.returnData
            this.productNum = data.pageInfo.recordSize
            this.productList = _.concat(this.productList, data.PrdBasicinfoList)
            this.allLoaded = this.productList.length == this.productNum
            this.loading = this.allLoaded
          }
          
          _.forEach(this.productList, item => {
            item.prd_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PRD_PRD_TYPE', item.prd_type)
          })
        })
      },

      /*关键字查询*/
      getValueListData(){
        this.productList = []
        this.pageNum = 1
        this.getProductList()
        this.$refs.searchInput.blur();
      },

      /*无限滚动加载*/
      loadMore(){
        this.loading = true
        if(this.allLoaded){
          return;
        }
        this.pageNum++
        this.getProductList()
      }

    }
  }
</script>
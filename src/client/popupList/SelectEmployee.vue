<template>
  <div>
    <!--选择员工-->
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
            <div class="num">共{{employeeNum}}条</div>
            <div class="item-list">
              <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
              >
                <li 
                  class="list-checkbox"
                  v-for="(item,index) in employeeList" 
                  :key="index"
                  @click="selectEmployee(item, index)"
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
                      <span class="item-name">{{item.actorname}}</span>
                    </div>
                    <div class="item-content">
                      <div class="item-content-line">
                        <span>所属机构：{{item.orgid_displayname}}</span>
                      </div>
                      <div class="item-content-line">
                        <span>职位：{{item.work_level}}</span>
                        <span>员工电话：{{item.telnum}}</span>
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
        selectedEmployee: null,

        //请求列表相关参数
        employeeNum: 0,
        employeeList: [],
        loading: false,
        allLoaded: false,
        pageSize: 20,
        pageNum: 1,
        searchValue: ''
      }
    },
    props: ['isShow'],
    watch: {
      isShow: function(val){
        this.visible = val
        if(val){
          this.getEmployeeList()
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
        this.loading = false
        this.employeeList = []
        this.selectedEmployee = null
      },

      //确定
      select(){
        this.$emit('select', this.selectedEmployee)
        this.searchValue = ''
        this.loading = false
        this.employeeList = []
      },

      selectEmployee(employee, index){
        this.selectedEmployee = employee
        this.selectedIndex = index
      },

      getEmployeeList(){
        //查询客户列表
        Server.popup.getEmployeeList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.SUserList){
            let data = res.returnData
            this.employeeNum = data.pageInfo.recordSize
            this.employeeList = _.concat(this.employeeList, data.SUserList)
            this.allLoaded = this.employeeList.length == this.employeeNum
            this.loading = this.allLoaded
          }
          
          _.forEach(this.employeeList, item => {
            item.cus_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CUS_TYPE', item.cus_type)
            item.cus_type_class = item.cus_type == '101' ? 'red' : 'blue'
          })
        })
      },

      /*关键字查询*/
      getValueListData(){
        this.employeeList = []
        this.pageNum = 1
        this.getEmployeeList()
        this.$refs.searchInput.blur();
      },

      /*无限滚动加载*/
      loadMore(){
        this.loading = true
        if(this.allLoaded){
          return;
        }
        this.pageNum++
        this.getEmployeeList()
      }

    }
  }
</script>
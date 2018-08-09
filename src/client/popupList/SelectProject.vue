<template>
  <div>
    <!--选择项目-->
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
            <div class="num">共{{projectNum}}条</div>
            <div class="item-list">
              <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
              >
                <li 
                  class="list-checkbox"
                  v-for="(item,index) in projectList" 
                  :key="index"
                  @click="selectProject(item, index)"
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
                      <span class="item-name">{{item.prj_name}}</span>
                    </div>
                    <div class="item-content">
                      <div class="item-content-line">
                        <span>项目编号：{{item.prj_no}}</span>
                        <span>项目总额：{{item.amt}}</span>
                      </div>
                      <div class="item-content-line">
                        <span>项目状态：{{item.prj_statusCN}}</span>
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
        selectedProject: null,

        //请求列表相关参数
        projectNum: 0,
        projectList: [],
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
      }
    },
    watch: {
      isShow: function(val){
        this.visible = val
        if(val){
          this.getProjectList()
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
        this.projectList = []
        this.loading = false
        this.selectedProject = null
      },

      //确定
      select(){
        this.$emit('select', this.selectedProject)
        this.searchValue = ''
        this.projectList = []
        this.loading = false
      },

      selectProject(project, index){
        if(this.index || this.index==0){
          project.index = this.index
        }
        this.selectedProject = project
        this.selectedIndex = index
      },

      getProjectList(){
        //查询客户列表
        Server.popup.getProjectList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.PrjInfoList){
            let data = res.returnData
            this.projectNum = data.pageInfo.recordSize
            this.projectList = _.concat(this.projectList, data.PrjInfoList)
            this.allLoaded = this.projectList.length == this.projectNum
            this.loading = this.allLoaded
          }
          
          _.forEach(this.projectList, item => {
            item.prj_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_PRJ_STATUS', item.prj_status)
          })
        })
      },

      /*关键字查询*/
      getValueListData(){
        this.projectList = []
        this.pageNum = 1
        this.getProjectList()
        this.$refs.searchInput.blur();
      },

      /*无限滚动加载*/
      loadMore(){
        this.loading = true
        if(this.allLoaded){
          return;
        }
        this.pageNum++
        this.getProjectList()
      }

    }
  }
</script>
<template>
  <div>
    <!--选择树图类的数据-->
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
            <div class="num">共{{treeNum}}条</div>
            <div class="item-list">
              <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
              >
                <li 
                  class="list-checkbox"
                  v-for="(item,index) in treeList" 
                  :key="index"
                  @click="selectTree(item, index)"
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
                      <span class="item-name">{{item.namepath}}</span>
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
        selectedTree: null,

        //请求列表相关参数
        treeNum: 0,
        treeList: [],
        loading: false,
        allLoaded: false,
        pageSize: 20,
        pageNum: 1,
        searchValue: '',
        level: '',
        opttype: ''
      }
    },
    props: {
      isShow: {
        default: false
      },
      type: {

      },
      keycode: {

      }
    },
    watch: {
      isShow: function(val){
        this.visible = val
        if(val){
          this.getTreeList()
          this.selectedIndex = null
        }
      }
    },
    computed: {

      //查询客户列表的参数
      param(){
        if(this.type == 'industry'){
          this.levels = 4
          this.opttype = 'STD_GB_4754-2002'
        }
        else if(this.type == 'qua'){
          this.levels = 3
          this.opttype = 'STD_ENTERPRISE_LEVEL'
        }
        return {
          'levels': this.levels,
          'opttype': this.opttype,
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
    created(){
      
    },
    methods: {

      //取消
      cancel(){
        this.$emit('select')
        this.searchValue = ''
        this.treeList = []
        this.loading = false
        this.selectedTree = null
      },

      //确定
      select(){
        this.$emit('select', this.selectedTree)
        this.searchValue = ''
        this.treeList = []
        this.loading = false
      },

      selectTree(tree, index){
        tree.keycode = this.keycode
        this.selectedTree = tree
        this.selectedIndex = index
      },

      getTreeList(){
        //查询树图列表
        Server.popup.getTreeDicList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.STreeDicList){
            let data = res.returnData
            this.treeNum = data.pageInfo.recordSize
            this.treeList = _.concat(this.treeList, data.STreeDicList)
            this.allLoaded = this.treeList.length == this.treeNum
            this.loading = this.allLoaded
          }
        })
      },

      /*关键字查询*/
      getValueListData(){
        this.treeList = []
        this.pageNum = 1
        this.getTreeList()
        this.$refs.searchInput.blur();
      },

      /*无限滚动加载*/
      loadMore(){
        this.loading = true
        if(this.allLoaded){
          return;
        }
        this.pageNum++
        this.getTreeList()
      }

    }
  }
</script>
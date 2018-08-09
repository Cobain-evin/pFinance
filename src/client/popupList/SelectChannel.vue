<template>
  <div>
    <!--选择渠道-->
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
            <div class="num">共{{channelNum}}条</div>
            <div class="item-list">
              <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false"
              >
                <li 
                  class="list-checkbox"
                  v-for="(item,index) in channelList" 
                  :key="index"
                  @click="selectChannel(item, index)"
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
                      <span class="item-name">{{item.cc_name}}</span>
                    </div>
                    <div class="item-content">
                      <div class="item-content-line">
                        <span>渠道编号：{{item.cc_id}}</span>
                        <span>渠道类型：{{item.cc_typeCN}}</span>
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
        selectedChannel: null,

        //请求列表相关参数
        channelNum: 0,
        channelList: [],
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
          this.getChannelList()
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
        this.channelList = []
        this.loading = false
        this.selectedChannel = null
      },

      //确定
      select(){
        this.$emit('select', this.selectedChannel)
        this.searchValue = ''
        this.loading = false
        this.channelList = []
      },

      selectChannel(channel, index){
        this.selectedChannel = channel
        this.selectedIndex = index
      },

      getChannelList(){
        //查询客户列表
        Server.popup.getChannelList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.CcmCcInfoList){
            let data = res.returnData
            this.channelNum = data.pageInfo.recordSize
            this.channelList = _.concat(this.channelList, data.CcmCcInfoList)
            this.allLoaded = this.channelList.length == this.channelNum
            this.loading = this.allLoaded
          }
          
          _.forEach(this.channelList, item => {
            item.cc_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CC_TYPE', item.cc_type)
          })
        })
      },

      /*关键字查询*/
      getValueListData(){
        this.channelList = []
        this.pageNum = 1
        this.getChannelList()
        this.$refs.searchInput.blur();
      },

      /*无限滚动加载*/
      loadMore(){
        this.loading = true
        if(this.allLoaded){
          return;
        }
        this.pageNum++
        this.getChannelList()
      }

    }
  }
</script>
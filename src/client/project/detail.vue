<template>
  <div>
    <div class="info-block">
      <div class="info-title"></div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目名称</div>
            <div class="info-value">{{projectDetail.prj_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目编号</div>
            <div class="info-value">{{projectDetail.prj_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">贷款总额</div>
            <div class="info-value">{{projectDetail.amt}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目余额</div>
            <div class="info-value">{{projectDetail.loan_balance}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目经理</div>
            <div class="info-value">{{projectDetail.prj_manager_displayname}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目状态</div>
            <div class="info-value">{{projectDetail.prj_statusCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">审批状态</div>
            <div class="info-value">{{projectDetail.approve_statusCN}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block" v-for="(item, index) in flowList" :key="index">
      <div class="info-title"></div>
      <ul class="info-form canFold" :class="{'folded': !item.isShow}">
        <li class="readonly" @click="showOrHide(item)">
          <div class="info-rows">
            <div class="info-name">事项主体名称</div>
            <div class="info-value">
              {{item.event_name}}
              <span class="h-icon-arrow-right"></span>
            </div>
            <span style="display:none;">{{flag}}</span>
          </div>
        </li>
        <div class="sub-info sub-info-box">
          <div class="info-rows">
            <div class="info-name">业务主键编号</div>
            <div class="info-value">{{item.event_id}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">当前处理岗位</div>
            <div class="info-value">{{item.do_post_name}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">当前处理人</div>
            <div class="info-value">{{item.do_user_name}}</div>
          </div>
        </div>
      </ul>
    </div>
    <div class="btn-box">
      <a @click="refreshFlow" class="btn">刷新全流程</a>
    </div>
  </div>
</template>

<script>
  import Server from '@/server'
  import { mapState } from 'vuex'
  export default {
    data(){
      return{
        projectDetail: {},
        flowList: [],

        flag: true //解决不明原因bug所用
      }
    },
    computed: {
      projectNo(){
        return this.$route.params.serno
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
      this.init()
    },
    methods: {
      init(){
        this.getProjectDetail();
        this.getFlowList();
      },

      //获取项目信息
      getProjectDetail(){
        if(this.projectNo){
          let param = {
            'prj_no': this.projectNo
          }
          Server.project.getProjectDetail(param)
          .then(res => {
            this.projectDetail = res.returnData.PrjInfo

            let detailInfo = this.projectDetail
            detailInfo.prj_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_PRJ_STATUS', detailInfo.prj_status)
            detailInfo.approve_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_APPR_STATUS', detailInfo.approve_status)
          })
        }
      },

      //获取流程信息
      getFlowList(){
        if(this.projectNo){
          let param = {
            'prj_no': this.projectNo,
            'pageInfo.maxLine': 10,
            'pageInfo.targetPage': 1
          }
          Server.project.getFlowList(param)
          .then(res => {
            this.flowList = res.returnData.PrjAllFlowInfoList

            _.forEach(this.flowList, item => {
              item.isShow = false
            })
          })
        }
      },

      //刷新流程信息
      refreshFlow(){
        Server.project.refreshFlow({'prj_no': this.projectNo})
        .then(res => {
          this.getFlowList()
        })
      },

      //控制流程详细信息显示/隐藏
      showOrHide(item){
        item.isShow = !item.isShow;
        this.flag = !this.flag;
      }
    }
  }
</script>
<template>
  <div class="pad-foot">
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
      this.getProjectDetail();
    },
    methods: {

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

      //控制流程详细信息显示/隐藏
      showOrHide(item){
        item.isShow = !item.isShow;
        this.flag = !this.flag;
      }
    }
  }
</script>
<template>
  <div class="pad-foot">
    <div class="no-data" v-if="!planList.length">没有数据</div>
    <div class="info-block" v-for="(item, index) in planList" :key="index">
      <div class="info-title">方案{{index+1}}信息</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案名称</div>
            <div class="info-value">{{item.plan_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案编号</div>
            <div class="info-value">{{item.plan_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案类型</div>
            <div class="info-value">{{item.plan_typeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案金额</div>
            <div class="info-value">{{item.plan_amt}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案贷款余额</div>
            <div class="info-value">{{item.loan_balance}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案状态</div>
            <div class="info-value">{{item.plan_statusCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">借款人</div>
            <div class="info-value">{{item.borrower_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">产品名称</div>
            <div class="info-value">{{item.prd_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">利率</div>
            <div class="info-value">{{item.interest_rate}}%</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">预计综合费率</div>
            <div class="info-value">{{item.syn_fee_rate}}%</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">授信期限</div>
            <div class="info-value">{{item.credit_term}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">贷款期限</div>
            <div class="info-value">{{item.loan_term}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">期限单位</div>
            <div class="info-value">{{item.interest_cycleCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">还款方式</div>
            <div class="info-value">{{item.repay_modeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">还款方式描述</div>
            <div class="info-value">{{item.repay_desc}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Server from '@/server'
  import { mapState } from 'vuex'
  import { MessageBox } from 'mint-ui'
  export default {
    data(){
      return {
        prjNo: null,

        planList: []
      }
    },
    computed: {
      ...mapState({
        getDIC: state => {
          let localData = JSON.parse(localStorage.getItem('DIC'))
          if(state.DIC==={} && localData){
            this.$tore.commit('updateDic', localData)
          }
          return state.DIC
        }
      }),
      param(){
        return {
          "prj_no": this.prjNo,
          "chg_no": this.prjNo
        }
      }
    },
    created(){
      this.prjNo = this.$route.params.serno

      this.getPlanInfo()
    },
    methods: {

      //获取方案详细信息
      getPlanInfo(){
        Server.project.getPlanInfo(this.param)
        .then(res => {
          if(res.returnCode == '000'){
            this.planList = res.returnData.PrjPlanInfoList

            _.forEach(this.planList, item => {
              item.plan_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_PLAN_TYPE', item.plan_type)
              item.plan_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_PRJ_STATUS', item.plan_status)
              item.interest_cycleCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_XS_LIMIT_TYPE', item.interest_cycle)
              item.repay_modeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_REPAY_MODE', item.repay_mode)
            })
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      }

    }
  }
</script>
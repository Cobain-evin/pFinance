<template>
  <div class="pad-foot">
    <div class="info-block longname">
      <div class="info-title">基本信息</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目名称</div>
            <div class="info-value">{{lendingApplyDetail.prj_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目编号</div>
            <div class="info-value">{{lendingApplyDetail.prj_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案名称</div>
            <div class="info-value">{{lendingApplyDetail.plan_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案编号</div>
            <div class="info-value">{{lendingApplyDetail.plan_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">借款人名称</div>
            <div class="info-value">{{lendingApplyDetail.cus_name}}</div>
          </div>
        </li> 
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">合同编号</div>
            <div class="info-value">{{lendingApplyDetail.cont_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">业务类型</div>
            <div class="info-value">{{lendingApplyDetail.busi_typeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">产品名称</div>
            <div class="info-value">{{lendingApplyDetail.prd_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">合同金额</div>
            <div class="info-value">{{lendingApplyDetail.ctr_amt}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">合同期限</div>
            <div class="info-value">{{lendingApplyDetail.ctr_term}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">还款方式</div>
            <div class="info-value">{{lendingApplyDetail.repay_modeCN}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block longname">
      <div class="info-title">申请信息</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款编号</div>
            <div class="info-value">{{lendingApplyDetail.loan_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款金额</div>
            <div class="info-value">{{lendingApplyDetail.loan_amt}}元</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">预计放款日期</div>
            <div class="info-value">{{lendingApplyDetail.loan_date}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款期限</div>
            <div class="info-value">{{lendingApplyDetail.loan_limit}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款期限单位</div>
            <div class="info-value">{{lendingApplyDetail.loan_term_unitCN}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block longername" v-show="showDepoInfo">
      <div class="info-title">存出保证金信息</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">存出保证金类型</div>
            <div class="info-value">{{lendingApplyDetail.depo_typeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">存出保证金比例</div>
            <div class="info-value">{{lendingApplyDetail.depo_prop}}%</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">预计存出保证金金额</div>
            <div class="info-value">{{lendingApplyDetail.pre_margin_amt}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">实际存出保证金金额</div>
            <div class="info-value">{{lendingApplyDetail.margin_amt}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block longname">
      <div class="info-title">其他信息</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目经理</div>
            <div class="info-value">{{lendingApplyDetail.cus_manager_displayname}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款专员</div>
            <div class="info-value">{{lendingApplyDetail.loan_com_id_displayname}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">授信机构</div>
            <div class="info-value">{{lendingApplyDetail.input_br_id_displayname}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款操作机构</div>
            <div class="info-value">{{lendingApplyDetail.main_br_id_displayname}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款机构</div>
            <div class="info-value">{{lendingApplyDetail.com_br_id_displayname}}</div>
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
      return {
        loanNo: null,
        lendingApplyDetail: {},

        //流程类型
        applType: null
      }
    },
    computed: {
      showDepoInfo(){
        //存出保证金信息展示/隐藏
        if(this.lendingApplyDetail.depo_type || this.lendingApplyDetail.depo_prop || this.lendingApplyDetail.pre_margin_amt || this.lendingApplyDetail.margin_amt){
          return true
        }
        else{
          return false
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
      this.loanNo = this.$route.params.serno
      this.getLendingApplyDetail()
    },
    methods: {


      //获取放款申请信息
      getLendingApplyDetail(){
        if(this.loanNo){
          let param = {
            'loan_no': this.loanNo
          }
          Server.lendingApply.getLendingApplyDetail(param)
          .then(res => {
            this.lendingApplyDetail = res.returnData.PvpLoanApply

            let detailInfo = this.lendingApplyDetail
            detailInfo.busi_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PRD_BUSI_TYPE', detailInfo.busi_type)
            detailInfo.repay_modeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_REPAY_MODE', detailInfo.repay_mode)
            detailInfo.loan_term_unitCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_XS_LIMIT_TYPE', detailInfo.loan_term_unit)
            detailInfo.depo_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_DEPO_TYPE', detailInfo.depo_type)

          })
        }
      }

    }
  }
</script>
<template>
  <div class="pad-foot">
    <div class="info-block longname">
      <div class="info-title">基本信息</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款登记编号</div>
            <div class="info-value">{{lendingRegisterInfo.loan_input_id}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款编号</div>
            <div class="info-value">{{lendingRegisterInfo.loan_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目名称</div>
            <div class="info-value">{{lendingRegisterInfo.prj_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">业务类型</div>
            <div class="info-value">{{lendingRegisterInfo.busi_typeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款专员</div>
            <div class="info-value">{{lendingRegisterInfo.loan_com_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">借款人</div>
            <div class="info-value">{{lendingRegisterInfo.cus_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款期限</div>
            <div class="info-value">{{lendingRegisterInfo.loan_limit}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款期限单位</div>
            <div class="info-value">{{lendingRegisterInfo.loan_term_unitCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">剩余放款余额</div>
            <div class="info-value">{{lendingRegisterInfo.loan_balance}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">合作渠道是否放款</div>
            <div class="info-value">{{lendingRegisterInfo.is_loanCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">是否有借据</div>
            <div class="info-value">{{lendingRegisterInfo.is_have_billCN}}</div>
          </div>
        </li>
        <li class="readonly" v-if="lendingRegisterInfo.is_loan !=1 ">
          <div class="info-rows">
            <div class="info-name">是否不再放款</div>
            <div class="info-value">{{lendingRegisterInfo.temination_loanCN}}</div>
          </div>
        </li>
        <li class="readonly" v-if="lendingRegisterInfo.temination_loan ==1 && lendingRegisterInfo.is_loan !=1 ">
          <div class="info-rows">
            <div class="info-name">未放款原因</div>
            <div class="info-value">{{lendingRegisterInfo.causeCN}}</div>
          </div>
        </li>
        <li class="readonly" v-if="lendingRegisterInfo.temination_loan ==2 && lendingRegisterInfo.is_loan !=1 ">
          <div class="info-rows">
            <div class="info-name">预计放款日期</div>
            <div class="info-value">{{lendingRegisterInfo.pre_loan_date}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款日期</div>
            <div class="info-value">{{lendingRegisterInfo.loan_date}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">实际放款金额</div>
            <div class="info-value">{{lendingRegisterInfo.loan_amt}}</div>
          </div>
        </li>
      </ul>
      <div class="info-title"  v-if="lendingRegisterInfo.is_loan !=3 ">还款信息</div>
      <ul class="info-form"  v-if="lendingRegisterInfo.is_loan !=3 ">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">付息（还款）日</div>
            <div class="info-value">{{lendingRegisterInfo.interest_date}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">到期日</div>
            <div class="info-value">{{lendingRegisterInfo.due_date}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">利率</div>
            <div class="info-value">{{lendingRegisterInfo.interest_rateInt}}%</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Server from "@/server";
  import { mapState } from "vuex";
  export default {
    data(){
      return {
        loanInputId: null,
        lendingRegisterInfo: {}
      }
    },
    computed: {
      ...mapState({
        getDIC: state => {
          let localData = JSON.parse(localStorage.getItem("DIC"));
          if (state.DIC === {} && localData) {
            this.$tore.commit("updateDic", localData);
          }
          return state.DIC;
        }
      })
    },
    created(){
      this.loanInputId = this.$route.params.serno
      this.getLendingRegisterInfo()
    },
    methods: {

      //获取放款登记信息
      getLendingRegisterInfo() {
        let param = { loan_input_id: this.loanInputId };
        Server.lendingRegister.getLendingRegisterInfo(param)
        .then(res => {
          this.lendingRegisterInfo = res.returnData.PvpLoanInput;
          let lendingRegesterInfo = this.lendingRegisterInfo;

          /*对一些字段的返回值做处理（根据code查找对应中文名称、截取字段等操作）*/
          lendingRegesterInfo.busi_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_PRD_BUSI_TYPE", lendingRegesterInfo.busi_type);
          lendingRegesterInfo.loan_term_unitCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_XS_LIMIT_TYPE", lendingRegesterInfo.loan_term_unit);
          lendingRegesterInfo.is_loanCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_PUB_CC_IS_LOAN", lendingRegesterInfo.is_loan);
          lendingRegesterInfo.is_have_billCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_ZX_YES_NO", lendingRegesterInfo.is_have_bill);
          lendingRegesterInfo.temination_loanCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_ZX_YES_NO", lendingRegesterInfo.temination_loan);
          lendingRegesterInfo.causeCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_PUB_NO_LOAN_CAUSE", lendingRegesterInfo.cause);

          //利率*100展示，后面带%
          lendingRegesterInfo.interest_rateInt = Number(lendingRegesterInfo.interest_rate) * 100
          
        });
      }

    }
  }
</script>

<style scoped>

</style>
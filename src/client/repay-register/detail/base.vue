<template>
  <div>
      <div class="info-block longname">
        <div class="info-title">基本信息</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">回款编号</div>
              <div class="info-value">{{repayRegisterDetail.ret_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">回款类型</div>
              <div class="info-value">{{repayRegisterDetail.return_typeCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借据编号</div>
              <div class="info-value">{{repayRegisterDetail.bill_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借款主体</div>
              <div class="info-value">{{repayRegisterDetail.cus_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">放款机构</div>
              <div class="info-value">{{repayRegisterDetail.loan_br_id_displayname}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">放款金额</div>
              <div class="info-value">{{repayRegisterDetail.loan_amt}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">放款日期</div>
              <div class="info-value">{{repayRegisterDetail.loan_date}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">业务类型</div>
              <div class="info-value">{{repayRegisterDetail.busy_typeCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借据余额</div>
              <div class="info-value">{{repayRegisterDetail.loan_balance}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">是否有还款凭证</div>
              <div class="info-value">{{repayRegisterDetail.is_payment_voucherCN}}</div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import Server from "@/server";
import { mapState } from "vuex";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      //回款编号
      retNo: null,

      repayRegisterDetail: {}
    };
  },
  created() {
    this.retNo = this.$route.params.serno;
    this.getRepayRegisterDetail();
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
  methods: {

    //获取还款信息
    getRepayRegisterDetail() {
      Server.repayRegister
        .getRepayRegisterDetail({
          ret_no: this.retNo
        })
        .then(res => {
          if (res.returnCode == "000") {
            this.repayRegisterDetail = res.returnData.ArpReturnReg;
            let detailInfo = this.repayRegisterDetail;

            detailInfo.return_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_ARP_RETURN_TYPE", detailInfo.return_type);
            detailInfo.busy_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_PRD_BUSI_TYPE", detailInfo.busy_type);
            detailInfo.is_payment_voucherCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_ZX_YES_NO", detailInfo.is_payment_voucher);
          } else {
            MessageBox.alert(res.returnMsg);
          }
        });
    }


  }
};
</script>

<template>
  <div class="pad-foot">
    <div class="info-block">
      <div class="info-title"></div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">申请类型</div>
            <div class="info-value">{{intentionLetterInfo.letter_typeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">申请编号</div>
            <div class="info-value">{{intentionLetterInfo.serno}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block">
      <div class="info-title"></div>
      <ul class="info-form" v-if="intentionLetterInfo.letter_type=='1'">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目编号</div>
            <div class="info-value">{{intentionLetterInfo.prj_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目名称</div>
            <div class="info-value">{{intentionLetterInfo.prj_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案编号</div>
            <div class="info-value">{{intentionLetterInfo.plan_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">方案名称</div>
            <div class="info-value">{{intentionLetterInfo.plan_name}}</div>
          </div>
        </li>
      </ul>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">借款人</div>
            <div class="info-value">{{intentionLetterInfo.cus_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">产品名称</div>
            <div class="info-value">{{intentionLetterInfo.prd_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">还款方式</div>
            <div class="info-value">{{intentionLetterInfo.repay_typeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">申请金额</div>
            <div class="info-value">{{intentionLetterInfo.apply_amt}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">贷款期限</div>
            <div class="info-value">{{intentionLetterInfo.term}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">期限单位</div>
            <div class="info-value">{{intentionLetterInfo.loan_term_unitCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">放款机构</div>
            <div class="info-value">{{intentionLetterInfo.com_br_id_displayname}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">合作渠道</div>
            <div class="info-value">{{intentionLetterInfo.cc_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">资金用途</div>
            <div class="info-value">{{intentionLetterInfo.funds_use}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">还款方式描述</div>
            <div class="info-value">{{intentionLetterInfo.purpose}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">备注</div>
            <div class="info-value">{{intentionLetterInfo.remark}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block">
      <div class="info-title"></div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">申请人</div>
            <div class="info-value">{{intentionLetterInfo.cus_manager_displayname}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">申请时间</div>
            <div class="info-value">{{intentionLetterInfo.apply_date}}</div>
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
  data() {
    return {
      intentionLetterInfo: {}
    };
  },
  computed: {

    ...mapState({
      getDIC: state => {
        let localData = JSON.parse(localStorage.getItem("DIC"));
        if (state.DIC === {} && localData) {
          this.$store.commit("updateDic", localData);
        }
        return state.DIC;
      }
    })

  },
  created() {
    this.getIntentionLetterDetail();
  },
  methods: {

    //获取意向函信息
    getIntentionLetterDetail() {
      let serno = this.$route.params.serno;
      if (serno) {
        let param = {
          serno: serno
        };
        Server.intentionLetter.getIntentionLetterDetail(param).then(res => {
          this.intentionLetterInfo = res.returnData.CtrIntentionLetter;

          let detailInfo = this.intentionLetterInfo;

          detailInfo.letter_typeCN = this.$dicAction.getCnNameByCode(
            this.getDIC,
            "CTR_APPLY_TYPE",
            detailInfo.letter_type
          );
          detailInfo.repay_typeCN = this.$dicAction.getCnNameByCode(
            this.getDIC,
            "STD_ZB_REPAY_MODE",
            detailInfo.repay_type
          );
          detailInfo.loan_term_unitCN = this.$dicAction.getCnNameByCode(
            this.getDIC,
            "STD_XS_LIMIT_TYPE",
            detailInfo.loan_term_unit
          );
        });
      }
    }

  }
};
</script>
<template>
  <div>
    <div class="pad-foot">
      <div class="info-block longname">
        <div class="info-title">基本信息</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">用信申请编号</div>
              <div class="info-value">{{creditInfo.app_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目编号</div>
              <div class="info-value">{{creditInfo.prj_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目名称</div>
              <div class="info-value">{{creditInfo.prj_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">委托人</div>
              <div class="info-value">{{creditInfo.cus_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">授信方案编号</div>
              <div class="info-value">{{creditInfo.plan_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">授信方案金额（元）</div>
              <div class="info-value">{{creditInfo.plan_amt}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借款人</div>
              <div class="info-value">{{creditInfo.borrower_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">授信合同编号</div>
              <div class="info-value">{{creditInfo.cont_no}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block longname">
        <div class="info-title">用信方案列表</div>
        <div class="no-data" v-if="!creditInfoPlanList.length">没有数据</div>
        <div class="info-block longname" v-for="(item, index) in creditInfoPlanList" :key="index">
          <div class="info-title"></div>
          <ul class="info-form canFold" :class="{'folded': !item.isShow}">
            <li class="readonly" @click="showOrHide(item)">
              <div class="info-rows">
                <div class="info-name">{{item.branch_name}}</div>
                <div class="info-value"> {{item.branch_no}}
                  <span class="h-icon-arrow-right"></span>
                </div>
                <span style="display:none;">{{flag}}</span>
              </div>
            </li>
            <li class="sub-info-box">
              <ul>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">用信方案类型</div>
                    <div class="info-value">{{item.plan_typeCN}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">用信借款人</div>
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
                    <div class="info-name">业务类型</div>
                    <div class="info-value">{{item.prd_typeCN}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">用信方案金额（元）</div>
                    <div class="info-value">{{item.plan_amt}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">费率（%）</div>
                    <div class="info-value">{{item.interest_rate}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">用信综合费率（%）</div>
                    <div class="info-value">{{item.fee_rate}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">批复费率（%）</div>
                    <div class="info-value">{{item.apr_fee_rate}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">用信贷款期限单位</div>
                    <div class="info-value">{{item.loan_term_unitCN}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">用信贷款期限值</div>
                    <div class="info-value">{{item.loan_term}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">用信方案到期日</div>
                    <div class="info-value">{{item.plan_end_date}}</div>
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Server from "@/server";
import { MessageBox } from "mint-ui";
import { mapState } from "vuex";
export default {
  data() {
    return {
      app_no: null,
      project: {},
      //用信方案信息
      creditInfoPlanList: [],
      //用信信息
      creditInfo: {},
      flag: false
    };
  },
  computed: {
    param() {
      return {
        "pageInfo.maxLine": 20,
        "pageInfo.targetPage": 1,
        app_no: this.app_no
      };
    },
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
  created() {
    this.app_no = this.$route.params.serno;
    this.getCreditInfoPlanList();
  },
  methods: {
    //获取用信基本信息列表
    getCreditInfoPlanList() {
      Server.workflow.getCreditBaseInfo(this.param).then(res => {
        if (res.returnCode == "000") {
          if (res.returnData && res.returnData.PrjCreditBranchAppList.length) {
            this.creditInfoPlanList = res.returnData.PrjCreditBranchAppList;
            this.creditInfo = res.returnData.PrjCreditApp;
            _.forEach(this.creditInfoPlanList, item => {
              item.isShow = false;
              item.plan_typeCN = this.$dicAction.getCnNameByCode(
                this.getDIC,
                "STD_PUB_PLAN_TYPE",
                item.plan_type
              );
              item.prd_typeCN = this.$dicAction.getCnNameByCode(
                this.getDIC,
                "STD_PRD_PRD_TYPE",
                item.prd_type
              );
              item.loan_term_unitCN = this.$dicAction.getCnNameByCode(
                this.getDIC,
                "STD_XS_LIMIT_TYPE",
                item.loan_term_unit
              );
              item.repay_modeCN = this.$dicAction.getCnNameByCode(
                this.getDIC,
                "STD_ZB_REPAY_MODE",
                item.repay_mode
              );
            });
          }
        } else {
          MessageBox.alert(res.returnMsg);
        }
      });
    },
    //列表展开/隐藏
    showOrHide(item) {
      item.isShow = !item.isShow;
      this.flag = !this.flag;
    }
  }
};
</script>
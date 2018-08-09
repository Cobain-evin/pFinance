<template>
  <div>
    <div class="pad-foot">
      <div class="info-block longname">
        <div class="info-block longname" v-for="(item, index) in prjCreditSumInfoList" :key="index">
          <div class="info-title"></div>
          <ul class="info-form canFold" :class="{'folded': !item.isShow}">
            <li class="readonly" @click="showOrHide(item)">
              <div class="info-rows">
                <div class="info-name">关联圈授信情况汇总</div>
                <div class="info-value"> 
                  <span class="h-icon-arrow-right"></span>
                </div>
                <span style="display:none;">{{flag}}</span>
              </div>
            </li>
            <li class="sub-info-box">
              <ul>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">关联圈编号</div>
                    <div class="info-value">{{item.rel_grp_no}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">授信总额（元）</div>
                    <div class="info-value">{{item.credit_sum}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">放款总金额（元）</div>
                    <div class="info-value">{{item.loan_sum}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">贷款余额（元）</div>
                    <div class="info-value">{{item.loan_balance}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">可用金额（元）</div>
                    <div class="info-value">{{item.use_amt}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">抵押物总价值（元）</div>
                    <div class="info-value">{{item.gage_value_sum}}</div>
                  </div>
                </li>
                <li class="readonly">
                  <div class="info-rows">
                    <div class="info-name">总授信敞口（元）</div>
                    <div class="info-value">{{item.credit_amt_sum}}</div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="info-title">拟授信总额</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">拟授信总额（元）</div>
              <div class="info-value">{{credit_amt}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">拟授信敞口（元）</div>
              <div class="info-value">{{credit_open_amt}}</div>
            </div>
          </li>
        </ul>
        <div class="info-title">基本信息</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目编号</div>
              <div class="info-value">{{prjChgInfo.prj_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目名称</div>
              <div class="info-value">{{prjChgInfo.prj_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">客户名称</div>
              <div class="info-value">{{prjChgInfo.cus_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">客户所属行业</div>
              <div class="info-value">{{prjChgInfo.industry}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目总额（元）</div>
              <div class="info-value">{{prjChgInfo.amt}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">产品名称</div>
              <div class="info-value">{{prjChgInfo.prd_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">业务类型</div>
              <div class="info-value">{{prjChgInfo.prd_typeCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目亮点与风险分析</div>
              <div class="info-value">{{prjChgInfo.adv_and_risk_anal}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">变更原因</div>
              <div class="info-value">{{prjChgInfo.prjchg_reason}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目经理</div>
              <div class="info-value">{{prjChgInfo.prj_manager_displayname}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目经理所属部门</div>
              <div class="info-value">{{prjChgInfo.main_br_id_displayname}}</div>
            </div>
          </li>
        </ul>
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
      chg_no: null,
      prjChgInfo: {},
      prjCreditSumInfoList: [],
      flag: false,
      credit_amt: null,
      credit_open_amt: null
    };
  },
  computed: {
    param() {
      return {
        chg_no: this.chg_no
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
    this.chg_no = this.$route.params.serno;
    this.getProjectChangeBaseInfo();
  },
  methods: {
    //获取决议变更基本信息列表
    getProjectChangeBaseInfo() {
      Server.workflow.getProjectChangeBaseInfo(this.param).then(res => {
        if (res.returnCode == "000") {
          if (res.returnData && res.returnData.PrjChgInfo) {
            this.prjChgInfo = res.returnData.PrjChgInfo;
            this.prjCreditSumInfoList = res.returnData.PrjCreditSumInfoList;
            this.credit_amt = res.returnData.credit_amt;
            this.credit_open_amt = res.returnData.credit_open_amt;
            //业务类型字典项
            this.prjChgInfo.prd_typeCN = this.$dicAction.getCnNameByCode(
              this.getDIC,
              "STD_PRD_PRD_TYPE",
              this.prjChgInfo.prd_type
            );
             
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
<template>
  <div>
    <div class="pad-foot">
      <div class="info-block longname">
        <div class="info-title">基本信息</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目编号</div>
              <div class="info-value">{{arpCompstAppInfo.prj_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目名称</div>
              <div class="info-value">{{arpCompstAppInfo.prj_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借据编号</div>
              <div class="info-value">{{arpCompstAppInfo.acc_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借据余额</div>
              <div class="info-value">{{arpCompstAppInfo.acc_balance}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借据到期日</div>
              <div class="info-value">{{arpCompstAppInfo.end_date}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借据已代偿金额</div>
              <div class="info-value">{{arpCompstAppInfo.ard_compst_amt}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">代偿类型</div>
              <div class="info-value">{{arpCompstAppInfo.compst_typeCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">代偿原因</div>
              <div class="info-value">{{arpCompstAppInfo.compst_causeCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借据利率</div>
              <div class="info-value">{{arpCompstAppInfo.reality_ir_y}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">拟代偿日期</div>
              <div class="info-value">{{arpCompstAppInfo.compst_date}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">拟代偿本金</div>
              <div class="info-value">{{arpCompstAppInfo.compst_capital}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">拟代偿利息</div>
              <div class="info-value">{{arpCompstAppInfo.compst_interest}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">风险费率</div>
              <div class="info-value">{{arpCompstAppInfo.risk_ir_y}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">代偿原因</div>
              <div class="info-value">{{arpCompstAppInfo.compst_causeCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">控制方案说明</div>
              <div class="info-value">{{arpCompstAppInfo.control_desc}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">追偿计划说明</div>
              <div class="info-value">{{arpCompstAppInfo.recov_desc}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">项目经理</div>
              <div class="info-value">{{arpCompstAppInfo.cus_manager_displayname}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">所属机构</div>
              <div class="info-value">{{arpCompstAppInfo.main_br_id_displayname}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">代偿申请日期</div>
              <div class="info-value">{{arpCompstAppInfo.apply_date}}</div>
            </div>
          </li>
        </ul>
      <div class="info-title">代偿支付分类明细</div>
      <div class="no-data" v-if="!arpCompstPayList.length">没有数据</div>
      <div class="info-block longname" v-for="(item, index) in arpCompstPayList" :key="index">
        <div class="info-title"></div>
        <ul class="info-form canFold" :class="{'folded': !item.isShow}">
          <li class="readonly" @click="showOrHide(item)">
            <div class="info-rows">
              <div class="info-name">明细{{index+1}}</div>
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
                  <div class="info-name">代偿方式</div>
                  <div class="info-value">{{item.compst_typeCN}}</div>
                </div>
              </li>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">拟代偿利息</div>
                  <div class="info-value">{{item.compst_interest}}</div>
                </div>
              </li>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">拟代偿本金</div>
                  <div class="info-value">{{item.compst_apital}}</div>
                </div>
              </li>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">拟代偿本金总额</div>
                  <div class="info-value">{{item.compst_total}}</div>
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
      serno: null,
      project: {},
      //代偿基本信息
      arpCompstAppInfo: {},
      //ArpCompstPayListList
      arpCompstPayList: [],
      flag: false
    };
  },
  computed: {
    param() {
      return {
        "pageInfo.maxLine": 20,
        "pageInfo.targetPage": 1,
        serno: this.serno
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
    this.serno = this.$route.params.serno;
    this.getCompensatoryBaseInfo();
  },
  methods: {
    //获取代偿基本信息列表
    getCompensatoryBaseInfo() {
      Server.workflow.getCompensatoryBaseInfo(this.param).then(res => {
        if (res.returnCode == "000") {
          if (res.returnData && res.returnData.ArpCompstAppInfo) {
            this.arpCompstAppInfo = res.returnData.ArpCompstAppInfo;
            this.arpCompstPayList = res.returnData.ArpCompstPayListList;
            //替换字典项数据
            this.arpCompstAppInfo.compst_typeCN = this.$dicAction.getCnNameByCode(
              this.getDIC,
              "STD_DC_STATUS",
              this.arpCompstAppInfo.compst_type
            );
            this.arpCompstAppInfo.compst_causeCN = this.$dicAction.getCnNameByCode(
              this.getDIC,
              "STD_ZB_COMPST_CAUSE",
             this.arpCompstAppInfo.compst_cause
            );
             _.forEach(this.arpCompstPayList, item => {
              item.isShow = false;
              item.compst_typeCN = this.$dicAction.getCnNameByCode(
                this.getDIC,
                "STD_ZB_COMPST_TYPE",
                item.compst_type
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
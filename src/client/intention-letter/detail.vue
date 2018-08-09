<template>
  <div class="pad-foot">
    <div v-show="!editing">
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">申请类型</div>
              <div class="info-value">{{intentionLetterInfo.letter_typeCN}}</div>
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
    </div>
    <div v-show="editing">
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">申请类型</div>
              <div class="info-value">{{intentionLetterInfo.letter_typeCN}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form" v-if="intentionLetterInfo.letter_type==1">
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
        <ul 
          class="info-form" 
          v-if="intentionLetterInfo.letter_type==2 || 
          (intentionLetterInfo.letter_type==1 && intentionLetterInfo.prj_no)"
        >
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">借款人</div>
              <div class="info-value">{{intentionLetterInfo.cus_name}}</div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">产品名称<span class="required">*</span></div>
              <div class="info-value popupable" @click="showProductPopup(intentionLetterInfo.plan_no, intentionLetterInfo.branch_no)">
                <input 
                  type="text" 
                  v-model="intentionLetterInfo.prd_name"
                  name="产品名称" 
                  readonly
                  v-validate="{'required': isSubmit}"
                  v-show="intentionLetterInfo.prd_name"
                >
                <span class="r">
                  <span v-show="!intentionLetterInfo.prd_name">点击选择</span> 
                  <span class="h-icon-arrow-right"></span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">还款方式<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="repayTypeDicData" 
                  v-model="intentionLetterInfo.repay_type"
                  name="还款方式" 
                  v-validate="{'required': isSubmit}"
                  :disabled="intentionLetterInfo.plan_no"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">申请金额<span class="required">*</span></div>
              <div class="info-value flexbox-sb">
                <input 
                  type="text" 
                  placeholder="请输入申请金额" 
                  v-model="intentionLetterInfo.apply_amt"
                  maxlength="50"
                  name="申请金额" 
                  v-validate="{'required': isSubmit}"
                >
                <span>元</span>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">贷款期限<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="tel" 
                  placeholder="请输入贷款期限" 
                  v-model="intentionLetterInfo.term"
                  maxlength="50"
                  name="贷款期限" 
                  v-validate="{'required': isSubmit}"
                >
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">期限单位<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="unitDicData" 
                  v-model="intentionLetterInfo.loan_term_unit"
                  name="贷款期限单位" 
                  v-validate="{'required': isSubmit}"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">放款机构<span class="required">*</span></div>
              <div class="info-value popupable" @click="showOrgPopup(intentionLetterInfo.plan_no)">
                <input 
                  type="text" 
                  v-model="intentionLetterInfo.com_br_id_displayname"
                  name="放款机构" 
                  readonly
                  v-validate="{'required': isSubmit}"
                  v-show="intentionLetterInfo.com_br_id_displayname"
                >
                <span class="r">
                  <span v-show="!intentionLetterInfo.com_br_id_displayname">点击选择</span> 
                  <span class="h-icon-arrow-right"></span>
                </span>
              </div>
            </div>
          </li>
        </ul>
        <ul class="info-form">
          <li>
            <div class="info-rows">
              <div class="info-name">合作渠道<span class="required">*</span></div>
              <div class="info-value popupable" @click="showChannelPopup">
                <input 
                  type="text" 
                  v-model="intentionLetterInfo.cc_name"
                  name="合作渠道" 
                  readonly
                  v-validate="{'required': isSubmit}"
                  v-show="intentionLetterInfo.cc_name"
                >
                <span class="r">
                  <span v-show="!intentionLetterInfo.cc_name">点击选择</span> 
                  <span class="h-icon-arrow-right"></span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li>
            <div class="info-area">
              <div class="info-name">资金用途<span class="required">*</span></div>
              <div class="info-value">
                <textarea 
                  placeholder="请输入资金用途" 
                  v-model="intentionLetterInfo.funds_use"
                  maxlength="500"
                  name="资金用途" 
                  v-validate="{'required': isSubmit}"
                >
                </textarea>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li>
            <div class="info-area">
              <div class="info-name">还款方式描述<span class="required">*</span></div>
              <div class="info-value">
                <textarea 
                  placeholder="请输入还款方式描述" 
                  v-model="intentionLetterInfo.purpose"
                  maxlength="500"
                  name="还款方式描述" 
                  v-validate="{'required': isSubmit}"
                >
                </textarea>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li>
            <div class="info-area">
              <div class="info-name">备注</div>
              <div class="info-value">
                <textarea 
                  placeholder="请输入备注" 
                  v-model="intentionLetterInfo.remark"
                  maxlength="500"
                >
                </textarea>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn-box">
        <a class="btn small light" @click="save">保存</a>
        <a class="btn small" @click="submit">提交</a>
      </div>
    </div>
    <div class="edit h-icon-edit" v-show="canEdit && !editing" @click="edit"></div>
    <select-product :isShow="selectProductShow" @select="selectProduct"></select-product>
    <select-org :isShow="selectOrgShow" @select="selectOrg"></select-org>
    <select-channel :isShow="selectChannelShow" @select="selectChannel"></select-channel>
  </div>
</template>

<script>
import HSelect from "@/components/HSelect";
import HDatepicker from "@/components/HDatepicker";
import SelectProduct from "@/client/popupList/SelectProduct";
import SelectOrg from "@/client/popupList/SelectOrg";
import SelectChannel from "@/client/popupList/SelectChannel";
import Server from "@/server";
import WF from "@/lib/workflow";
import { mapState } from "vuex";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      intentionLetterInfo: {},

      //可否修改的标识，只有审批状态为“待发起”和“打回”的才可以修改信息
      canEdit: false,

      //编辑状态标识
      editing: false,

      //控制选择弹框展示
      selectProductShow: false,
      selectOrgShow: false,
      selectChannelShow: false,

      //操作：保存/提交
      action: null,

      //是否点提交按钮标识，用于确定字段是否做必填校验（有些字段是只在提交时候做校验，保存时不校验）
      isSubmit: false
    };
  },
  computed: {
    //字典项查询
    lettetTypeDicData() {
      //申请类型
      return this.getDIC.CTR_APPLY_TYPE.value;
    },
    repayTypeDicData() {
      //还款方式
      return this.getDIC.STD_ZB_REPAY_MODE.value;
    },
    unitDicData(){ //期限单位，只有“天”和“月”
      let unfiltered = this.getDIC.STD_XS_LIMIT_TYPE.value
      return _.pick(unfiltered, ['10', '20'])
    },

    ...mapState({
      getDIC: state => {
        let localData = JSON.parse(localStorage.getItem("DIC"));
        if (state.DIC === {} && localData) {
          this.$store.commit("updateDic", localData);
        }
        return state.DIC;
      }
    }),

    //项目信息，用于查询方案
    projectInfo() {
      return {
        prj_no: this.intentionLetterInfo.prj_no,
        chg_no: this.intentionLetterInfo.chg_no
      };
    },

    param() {
      let param = this.$objAction.getStringifiedKeyParams(this.intentionLetterInfo, 'CtrIntentionLetter')
      param.operation = this.action
      return param
    }
  },
  components: {
    HSelect,
    SelectProduct,
    SelectOrg,
    SelectChannel
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

          //只有审批状态为“待发起”和“打回”的才可以修改信息
          if (_.indexOf(["000", "992"], detailInfo.approve_status) > -1) {
            this.canEdit = true;
          }
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
    },


    //编辑
    edit() {
      this.editing = true;
    },

    /*选择产品*/
    showProductPopup(plan, branchNo) {
      if (plan && !branchNo) return; //当选择了方案时，产品信息由项目信息带出，不可选择，但是如果该方案有用信方案编号，产品可重新选择
      this.selectProductShow = true;
    },

    selectProduct(product) {
      if (product) {
        this.intentionLetterInfo.prd_no = product.prdid;
        this.intentionLetterInfo.prd_name = product.prdname;
      }
      this.selectProductShow = false;
    },

    /*选择放款机构*/
    showOrgPopup(plan) {
      if (plan) return; //当选择了方案时，放款机构信息由项目信息带出，不可选择
      this.selectOrgShow = true;
    },

    selectOrg(org) {
      if (org) {
        this.intentionLetterInfo.com_br_id = org.licence_id;
        this.intentionLetterInfo.com_br_id_displayname = org.licence_name;
      }
      this.selectOrgShow = false;
    },

    /*选择合作渠道*/
    showChannelPopup() {
      if(this.intentionLetterInfo.com_br_id_displayname){
        this.selectChannelShow = true
      }
    },

    selectChannel(channel) {
      if (channel) {
        this.intentionLetterInfo.cc_code = channel.cc_id;
        this.intentionLetterInfo.cc_name = channel.cc_name;
      }
      this.selectChannelShow = false;
    },

    //保存
    save() {
      let This = this;
      This.isSubmit = false;
      This.$validator.validate().then(result => {
        if (result) {
          This.action = "save";
          Server.intentionLetter.updateIntentionLetter(This.param).then(res => {
            if (res.returnCode == "000") {
              Toast({
                message: "保存成功",
                position: "middle",
                iconClass: "mintui mintui-success",
                duration: 500
              });
              This.editing = false;
            } else {
              MessageBox.alert(res.returnMsg);
            }
          });
        } else {
          //校验不通过
          if (This.$validator.errors.items.length) {
            MessageBox.alert(This.$validator.errors.items[0].msg);
          }
        }
      });
    },

    //提交
    submit() {
      let This = this;
      This.isSubmit = true;
      This.$validator.validate().then(result => {
        if (result) {
          //校验通过
          MessageBox.confirm("确定提交申请信息吗？")
            .then(action => {
              This.action = "submit";
              Server.intentionLetter
                .updateIntentionLetter(This.param)
                .then(res => {
                  if (res.returnCode == "000") {
                    let wfParam = {
                      cus_id: This.intentionLetterInfo.cus_id,
                      cus_name: This.intentionLetterInfo.cus_name,
                      prj_no: This.intentionLetterInfo.prj_no,
                      prj_name: This.intentionLetterInfo.prj_name,
                      amt: This.intentionLetterInfo.apply_amt,
                      applType: "155",
                      wfSign: "03",
                      app_url:
                        "getCtrIntentionLetterViewPage.do?is_print=1&serno=" +
                        This.intentionLetterInfo.serno,
                      update_url:
                        "getCtrIntentionLetterUpdatePage.do?serno=" +
                        This.intentionLetterInfo.serno +
                        "&menuId=yxhsq",
                      modelId: "CtrIntentionLetter",
                      pkCol: "serno",
                      pkVal: This.intentionLetterInfo.serno,
                      status: "000",
                      from: 'intentionLetter'
                    };

                    //发起流程
                    WF.initWFSubmit(wfParam);

                    This.editing = false;
                  } else {
                    MessageBox.alert(res.returnMsg);
                  }
                });
            })
            .catch(e => {});
        } else {
          //校验不通过
          if (This.$validator.errors.items.length) {
            MessageBox.alert(This.$validator.errors.items[0].msg);
          }
        }
      });
    }
  }
};
</script>
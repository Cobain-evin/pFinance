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
          <li>
            <div class="info-rows">
              <div class="info-name">合作渠道是否放款<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="channelIfLoanDicData" 
                  v-model="lendingRegisterInfo.is_loan"
                  name="合作渠道是否放款" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">是否有借据<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="yesOrNoDicData" 
                  v-model="lendingRegisterInfo.is_have_bill"
                  name="是否有借据" 
                  v-validate="'required'"
                  :disabled='lendingRegisterInfo.is_loan ==3'
                >
                </h-select>
              </div>
            </div>
          </li>
          <li v-if="lendingRegisterInfo.is_loan !=1 ">
            <div class="info-rows">
              <div class="info-name">是否不再放款<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="yesOrNoDicData" 
                  v-model="lendingRegisterInfo.temination_loan"
                  name="是否不再放款" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li v-if="lendingRegisterInfo.temination_loan ==1 && lendingRegisterInfo.is_loan !=1 ">
            <div class="info-rows">
              <div class="info-name">未放款原因<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="notLendingCauseData" 
                  v-model="lendingRegisterInfo.cause"
                  name="未放款原因" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li v-if="lendingRegisterInfo.temination_loan ==2 && lendingRegisterInfo.is_loan !=1 ">
            <div class="info-rows">
              <div class="info-name">预计放款日期<span class="required" >*</span></div>
              <div class="info-value">
                <h-datepicker 
                  v-model="lendingRegisterInfo.pre_loan_date"
                  name="预计放款日期" 
                  v-validate="'required'"
                  :min="currentDate"
                  :disabled ='lendingRegisterInfo.is_loan==1'
                >
                </h-datepicker>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">放款日期<span class="required" v-if="lendingRegisterInfo.is_loan !=3" >*</span></div>
              <div class="info-value">
                <h-datepicker 
                  v-model="lendingRegisterInfo.loan_date"
                  name="放款日期" 
                  v-validate="'required'"
                  :disabled ='lendingRegisterInfo.is_loan==3'
                >
                </h-datepicker>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">实际放款金额<span class="required"  v-if="lendingRegisterInfo.is_loan ==2 ">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入实际放款金额" 
                  v-model="lendingRegisterInfo.loan_amt"
                  maxlength="50"
                  name="实际放款金额" 
                  v-validate="'required'"
                  :disabled='lendingRegisterInfo.is_loan !=2'
                >
              </div>
            </div>
          </li>
        </ul>
        <div class="info-title"  v-if="lendingRegisterInfo.is_loan !=3 ">还款信息</div>
        <ul class="info-form"  v-if="lendingRegisterInfo.is_loan !=3 ">
          <li>        
            <div class="info-rows">
              <div class="info-name">付息（还款）日<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输付息（还款）日" 
                  v-model="lendingRegisterInfo.interest_date"
                  maxlength="2"
                  name="付息（还款）日" 
                  v-validate="'required'"
                >
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">到期日<span v-if="lendingRegisterInfo.busi_type != '002'" class="required">*</span></div>
              <div class="info-value">
                <h-datepicker 
                  v-model="lendingRegisterInfo.due_date"
                  name="到期日" 
                  v-validate="{'required': lendingRegisterInfo.busi_type != '002'}"
                  :min="currentDate"
                >
                </h-datepicker>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">利率<span v-if="lendingRegisterInfo.busi_type != '002'"  class="required">*</span></div>
              <div class="info-value flexbox-sb">
                <h-number 
                  v-model="lendingRegisterInfo.interest_rateInt"
                  name="利率" 
                  placeholder="请输入利率" 
                  :min="0.000001"
                  :max="100"
                  v-validate="{'required': lendingRegisterInfo.busi_type != '002'}"
                  :disabled="lendingRegisterInfo.busi_type == '002'"
                >
                </h-number>
                <span>%</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn-box">
        <a class="btn" href="javascript:;" @click="updateLendingRegisterDetail">下一步</a>
      </div>
      
  </div>
</template>
<script>
import HSelect from "@/components/HSelect";
import HDatepicker from "@/components/HDatepicker";
import HNumber from "@/components/HNumber";
import Server from "@/server";
import { mapState } from "vuex";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      lendingRegisterInfo: {},
      currentDate:''
    };
  },
  watch: {
    'lendingRegisterInfo.is_loan': function(){
      this.lendingRegisterInfo.is_loan == 3 ? this.lendingRegisterInfo.is_have_bill = '2': this.lendingRegisterInfo.is_have_bill;
    }
  },
  computed: {
    yesOrNoDicData() {
      //是否项
      return this.getDIC.STD_ZX_YES_NO.value;
    },
    channelIfLoanDicData() {
      //合作渠道是否放款
      return this.getDIC.STD_PUB_CC_IS_LOAN.value;
    },
    notLendingCauseData() {
      //未放款原因  
      return this.getDIC.STD_PUB_NO_LOAN_CAUSE.value;
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
  components: {
    HSelect,
    HDatepicker,
    HNumber
  },
  created() {
    this.currentDate = this.$timeAction.formatDate(new Date(), 'yyyy-MM-dd');
    this.getLendingRegisterInfo();
  },
  methods: {
    edit() {
      this.editing = true;
    },
    param() {
      /* 参数转成接口需要数据格式 */
      this.lendingRegisterInfo.interest_rate = Number(this.lendingRegisterInfo.interest_rateInt) / 100
      let lendingRegister = this.$objAction.getStringifiedKeyParams(
        this.lendingRegisterInfo,
        "PvpLoanInput"
      );
      return lendingRegister;
    },
    getLendingRegisterInfo() {
      let serno = this.$route.params.serno;
      if (serno) {
        let param = { loan_input_id: serno };
        Server.lendingRegister.getLendingRegisterInfo(param).then(res => {
          this.lendingRegisterInfo = res.returnData.PvpLoanInput;
          let lendingRegesterInfo = this.lendingRegisterInfo;

          /*对一些字段的返回值做处理（根据code查找对应中文名称、截取字段等操作）*/
          lendingRegesterInfo.busi_typeCN = this.$dicAction.getCnNameByCode(
            this.getDIC,
            "STD_PRD_BUSI_TYPE",
            lendingRegesterInfo.busi_type
          );
          lendingRegesterInfo.loan_term_unitCN = this.$dicAction.getCnNameByCode(
            this.getDIC,
            "STD_XS_LIMIT_TYPE",
            lendingRegesterInfo.loan_term_unit
          );

          //利率*100展示，后面带%
          lendingRegesterInfo.interest_rateInt = Number(lendingRegesterInfo.interest_rate) * 100

        });
      }
    },
    changeAmt() {
      if (this.lendingRegisterInfo.is_loan == "2") {
        //部分放款
        if (parseInt(this.lendingRegisterInfo.loan_amt) >=parseInt(this.lendingRegisterInfo.loan_balance)) {
          MessageBox.alert('部分放款：放款金额不能大于或等于放款余额')
          this.lendingRegisterInfo.loan_amt = "";
          return true;
        }
        return false;
      }
    },
    updateLendingRegisterDetail() {
      let This = this;
      let serno = this.$route.params.serno;
      let flag = This.changeAmt();
      
      if(flag)
        return ;
      This.$validator.validate().then(result => {
        if (result) {//校验通过

          let dateFlag = true

          //实际还款日期不能小于还款计划日期，且不能大于当前营业日期
          if(This.$timeAction.date2timestamp(This.lendingRegisterInfo.due_date) <= This.$timeAction.today2timestamp()){
            MessageBox.alert('您输入的【到期日】应大于【当前营业日期】！');
            dateFlag = false
          }

          if(dateFlag){
            Server.lendingRegister
            .updateLendingRegisterDetail(This.param())
            .then(res => {
              if (res.returnCode == "000") {
                this.$router.push('/lending-register/edit/file/' + serno)
              } else {
                MessageBox.alert(res.returnMsg);
              }
            });
          }
          
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
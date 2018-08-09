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
        <li>
          <div class="info-rows">
            <div class="info-name">放款金额<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入" 
                v-model="lendingApplyDetail.loan_amt"
                name="放款金额" 
                v-validate="'required'"
              >
              <span>元</span>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">预计放款日期<span class="required">*</span></div>
            <div class="info-value">   
              <h-datepicker 
                v-model="lendingApplyDetail.loan_date"
                name="预计放款日期" 
                v-validate="'required'"
              >
              </h-datepicker>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">放款期限<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="tel" 
                placeholder="请输入"
                v-model="lendingApplyDetail.loan_limit"
                name="放款期限" 
                v-validate="'required'"
              >
            </div>
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
    <div class="btn-box">
      <a href="javascript:;" class="btn" @click="submit">提交</a>
    </div>
  </div>
</template>

<script>
  import HSelect from '@/components/HSelect'
  import HDatepicker from '@/components/HDatepicker'
  import Server from '@/server'
  import WF from '@/lib/workflow'
  import { mapState } from 'vuex'
  import { MessageBox } from 'mint-ui'
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
      param(){
        return this.$objAction.getStringifiedKeyParams(this.lendingApplyDetail, 'PvpLoanApply')
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
    components: {
      HSelect,
      HDatepicker
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

            this.getApplType()

          })
        }
      },

      //获取流程类型，用于发起流程
      getApplType(){
        let param = {
          "queryFlag": "main",
          "prd_no": this.lendingApplyDetail.prd_no,
          "prdversion": this.lendingApplyDetail.prdversion
        }
        Server.workflow.getApplType(param)
        .then(res => {
          this.applType = res.returnData.pvp_ecc_type
        })
      },


      //提交校验
      submit(){
        let This = this
        This.$validator.validate()
        .then(result => {
          if(result){ //校验通过
            MessageBox.confirm('确定提交信息吗？')
            .then(action => {
              let param = _.assign(this.param, {
                "submit": 0
              })
              Server.lendingApply.updateLendingApplyInfo(param)
              .then(res => {
                if(res.returnCode == '000'){
                  this.submitLendingApply()
                }
                else{
                  MessageBox.alert(res.returnMsg)
                }
              })
            })
            .catch(e => {})
          }
          else{ //校验不通过
            if(This.$validator.errors.items.length){
              MessageBox.alert(This.$validator.errors.items[0].msg)
            }
          }
        })
      },


      //提交并发起流程
      submitLendingApply(){
        let param = _.assign(this.param, {
          "submit": 1
        })
        Server.lendingApply.updateLendingApplyInfo(param)
        .then(res => {
          if(res.returnCode == '000'){
            let wfParam = {
              "cus_name": this.lendingApplyDetail.cus_name,
              "prj_no": this.lendingApplyDetail.prj_no,
              "prj_name": this.lendingApplyDetail.prj_name,
              "amt": this.lendingApplyDetail.ctr_amt,
              "applType": this.applType,
              "wfSign": "03",
              "app_url": 'getPvpLoanApplyViewPage.do?wfi=1&loan_no=' + this.lendingApplyDetail.loan_no,
              "update_url": "getPvpLoanApplyUpdatePage.do?loan_no=" + this.lendingApplyDetail.loan_no + "&menuId=fksq&query_type=app",
              "modelId": "PvpLoanApply",
              "pkCol": "loan_no",
              "pkVal": this.lendingApplyDetail.loan_no,
              "status": "000",
              "from": 'lendingApply'//用来确定成功页面的按钮返回地址
            }

            //发起流程
            WF.initWFSubmit(wfParam)
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      }

    }
  }
</script>
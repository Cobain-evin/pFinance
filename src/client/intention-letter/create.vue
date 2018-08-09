<template>
  <div>
    <div class="info-block">
      <div class="info-title"></div>
      <ul class="info-form">
        <li>
          <div class="info-rows">
            <div class="info-name">申请类型<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="lettetTypeDicData" 
                v-model="letter_type"
                name="申请类型" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block">
      <div class="info-title"></div>
      <ul class="info-form" v-if="letter_type==1">
        <li>
          <div class="info-rows">
            <div class="info-name">项目编号<span class="required">*</span></div>
            <div class="info-value popupable" @click="showProjectPopup">
              <input 
                type="text" 
                v-model="intentionLetterInfo.prj_no"
                name="项目编号" 
                v-validate="'required'"
                readonly
                v-show="intentionLetterInfo.prj_no"
              >
              <span class="r">
                <span v-show="!intentionLetterInfo.prj_no">点击选择</span> 
                <span class="h-icon-arrow-right"></span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">项目名称<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入项目名称" 
                v-model="intentionLetterInfo.prj_name"
                maxlength="50"
                name="项目名称" 
                v-validate="'required'"
                readonly
              >
            </div>
          </div>
        </li>
        <li v-if="intentionLetterInfo.prj_no">
          <div class="info-rows">
            <div class="info-name">方案编号<span class="required">*</span></div>
            <div class="info-value popupable" @click="showPlanPopup()">
              <input 
                type="text" 
                v-model="intentionLetterInfo.plan_no"
                name="方案编号" 
                v-validate="'required'"
                readonly
                v-show="intentionLetterInfo.plan_no"
              >
              <span class="r">
                <span v-show="!intentionLetterInfo.plan_no">点击选择</span> 
                <span class="h-icon-arrow-right"></span>
              </span>
            </div>
          </div>
        </li>
        <li v-if="intentionLetterInfo.prj_no">
          <div class="info-rows">
            <div class="info-name">方案名称<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入方案名称" 
                v-model="intentionLetterInfo.plan_name"
                maxlength="50"
                name="方案名称" 
                v-validate="'required'"
                readonly
              >
            </div>
          </div>
        </li>
      </ul>
      <!-- 借款人及以下信息只有在两种情况下展示：
            1、申请类型为客户时，此时这些信息可以编写
            2、申请客户为项目且选择了项目时，此时这些信息由项目和方案带出，不可编写。
                当选择的项目没有方案信息时，这些信息中除借款人以外的字段可以编写      
      -->
      <ul class="info-form" v-if="letter_type==2 || (letter_type==1 && intentionLetterInfo.prj_no)">
        <li>
          <div class="info-rows">
            <div class="info-name">借款人<span class="required">*</span></div>
            <div class="info-value popupable" @click="showCustomerPopup(intentionLetterInfo.prj_no)">
              <input 
                type="text" 
                v-model="intentionLetterInfo.cus_name"
                name="借款人" 
                v-validate="'required'"
                readonly
                v-show="intentionLetterInfo.cus_name"
              >
              <span class="r">
                <span v-show="!intentionLetterInfo.cus_name">点击选择</span> 
                <span class="h-icon-arrow-right"></span>
              </span>
            </div>
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
                v-validate="{'required': isSubmit}"
                readonly
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
                v-validate="{'required': isSubmit}"
                readonly
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
      <ul class="info-form" v-if="letter_type">
        <li>
          <div class="info-rows">
            <div class="info-name">合作渠道<span class="required">*</span></div>
            <div class="info-value popupable" @click="showChannelPopup">
              <input 
                type="text" 
                v-model="intentionLetterInfo.cc_name"
                name="合作渠道" 
                v-validate="{'required': isSubmit}"
                readonly
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
    <div class="info-block" v-if="letter_type">
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
    <div class="info-block" v-if="letter_type">
      <div class="info-title"></div>
      <ul class="info-form">
        <li>
          <div class="info-area">
            <div class="info-name">还款方式描述<span class="required">*</span></div>
            <div class="info-value">
              <textarea 
                placeholder="还款方式描述" 
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
    <div class="info-block" v-if="letter_type">
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
    <select-customer :isShow="selectCustomerShow" @select="selectCustomer"></select-customer>
    <select-product :isShow="selectProductShow" @select="selectProduct"></select-product>
    <select-org :isShow="selectOrgShow" @select="selectOrg"></select-org>
    <select-channel :isShow="selectChannelShow" @select="selectChannel"></select-channel>
    <select-project :isShow="selectProjectShow" @select="selectProject"></select-project>
    <select-plan :isShow="selectPlanShow" :addInfo="projectInfo" @select="selectPlan"></select-plan>
  </div>
</template>

<script>
import HSelect from '@/components/HSelect'
import HDatepicker from '@/components/HDatepicker'
import SelectCustomer from '@/client/popupList/SelectCustomer'
import SelectProduct from '@/client/popupList/SelectProduct'
import SelectOrg from '@/client/popupList/SelectOrg'
import SelectChannel from '@/client/popupList/SelectChannel'
import SelectProject from '@/client/popupList/SelectProject'
import SelectPlan from '@/client/popupList/SelectPlan'
import Server from '@/server'
import WF from '@/lib/workflow'
import { mapState } from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
export default {
  data(){
    return {
      letter_type: null,  //申请类型
      intentionLetterInfo: {
        cus_id: null, //借款人编号
        cus_name: null, //借款人姓名
        prd_no: null, //产品编号
        prd_name: null, //产品名称
        repay_type: null, //还款方式
        apply_amt: null,  //申请金额
        term: null, //贷款期限
        loan_term_unit: null, //期限单位
        com_br_id: null,  //放款机构
        com_br_id_displayname: null,  //放款机构名称
        cc_name: null,  //合作渠道
        cc_code: null,  //合作渠道编号
        funds_use: null,  //资金用途
        purpose: null,  //申请用途
        prj_no: null,  //项目编号
        prj_name: null, //项目名称
        chg_no: null,  //变更流水号
        plan_no: null,  //方案编号
        plan_name: null,  //方案名称
        remark: null, //备注
        branch_no: null, //用信方案编号
        serno: null  //意向函流水号
      },

      //控制选择弹框展示
      selectCustomerShow: false,
      selectProductShow: false,
      selectOrgShow: false,
      selectChannelShow: false,
      selectProjectShow: false,
      selectPlanShow: false,

      //操作：保存/提交
      action: null,

      //是否点提交按钮标识，用于确定字段是否做必填校验（有些字段是只在提交时候做校验，保存时不校验）
      isSubmit: false
    }
  },
  computed: {

    //字典项查询
    lettetTypeDicData(){ //申请类型
      return this.getDIC.CTR_APPLY_TYPE.value
    },
    repayTypeDicData(){ //还款方式
      return this.getDIC.STD_ZB_REPAY_MODE.value
    },
    unitDicData(){ //期限单位，只有“天”和“月”
      let unfiltered = this.getDIC.STD_XS_LIMIT_TYPE.value
      return _.pick(unfiltered, ['10', '20'])
    },

    ...mapState({
      getDIC: state => {
        let localData = JSON.parse(localStorage.getItem('DIC'))
        if(state.DIC==={} && localData){
          this.$store.commit('updateDic', localData)
        }
        return state.DIC
      }
    }),

    //项目信息，用于查询方案
    projectInfo(){
      return {
        prj_no: this.intentionLetterInfo.prj_no,
        chg_no: this.intentionLetterInfo.chg_no
      }
    },

    param(){
      return {
        "CtrIntentionLetter.letter_type": this.letter_type,
        "CtrIntentionLetter.cus_id": this.intentionLetterInfo.cus_id,
        "CtrIntentionLetter.cus_name": this.intentionLetterInfo.cus_name,
        "CtrIntentionLetter.prd_no": this.intentionLetterInfo.prd_no,
        "CtrIntentionLetter.prd_name": this.intentionLetterInfo.prd_name,
        "CtrIntentionLetter.repay_type": this.intentionLetterInfo.repay_type,
        "CtrIntentionLetter.apply_amt": this.intentionLetterInfo.apply_amt,
        "CtrIntentionLetter.term": this.intentionLetterInfo.term,
        "CtrIntentionLetter.loan_term_unit": this.intentionLetterInfo.loan_term_unit,
        "CtrIntentionLetter.com_br_id": this.intentionLetterInfo.com_br_id,
        "CtrIntentionLetter.cc_name": this.intentionLetterInfo.cc_name,
        "CtrIntentionLetter.cc_code": this.intentionLetterInfo.cc_code,
        "CtrIntentionLetter.funds_use": this.intentionLetterInfo.funds_use,
        "CtrIntentionLetter.purpose": this.intentionLetterInfo.purpose,
        "CtrIntentionLetter.prj_no": this.intentionLetterInfo.prj_no,
        "CtrIntentionLetter.prj_name": this.intentionLetterInfo.prj_name,
        "CtrIntentionLetter.plan_no": this.intentionLetterInfo.plan_no,
        "CtrIntentionLetter.plan_name": this.intentionLetterInfo.plan_name,
        "CtrIntentionLetter.remark": this.intentionLetterInfo.remark,
        "CtrIntentionLetter.chg_no": this.intentionLetterInfo.chg_no,
        "CtrIntentionLetter.branch_no": this.intentionLetterInfo.branch_no,
        "CtrIntentionLetter.serno": this.intentionLetterInfo.serno,
        "operation": this.action
      }
    }
  },
  watch: {
    //监测申请类型字段，发生变化时，下放字段全部清空
    letter_type: function(){
      _.forEach(this.intentionLetterInfo, (value, key) => {
        this.intentionLetterInfo[key] = null
      })
    }
  },
  components: {
    HSelect,
    SelectCustomer,
    SelectProduct,
    SelectOrg,
    SelectChannel,
    SelectProject,
    SelectPlan
  },
  methods: {

    /*选择借款人*/
    showCustomerPopup(project){
      if(project) return //当选择了项目时，借款人字段由项目信息带出，不可选择
      this.selectCustomerShow = true
    },

    selectCustomer(customer){
      if(customer){
        this.intentionLetterInfo.cus_id = customer.cus_id
        this.intentionLetterInfo.cus_name = customer.cus_name
      }
      this.selectCustomerShow = false
    },

    /*选择产品*/
    showProductPopup(plan, branchNo){
      if(plan && !branchNo) return //当选择了方案时，产品信息由项目信息带出，不可选择，但是如果该方案有用信方案编号，产品可重新选择
      this.selectProductShow = true
    },

    selectProduct(product){
      if(product){
        this.intentionLetterInfo.prd_no = product.prdid
        this.intentionLetterInfo.prd_name = product.prdname
      }
      this.selectProductShow = false
    },

    /*选择放款机构*/
    showOrgPopup(plan){
      if(plan) return //当选择了方案时，放款机构信息由项目信息带出，不可选择
      this.selectOrgShow = true
    },

    selectOrg(org){
      if(org){
        this.intentionLetterInfo.com_br_id = org.licence_id
        this.intentionLetterInfo.com_br_id_displayname = org.licence_name
      }
      this.selectOrgShow = false
    },

    /*选择合作渠道*/
    showChannelPopup(){
      if(this.intentionLetterInfo.com_br_id_displayname){
        this.selectChannelShow = true
      }
    },

    selectChannel(channel){
      if(channel){
        this.intentionLetterInfo.cc_code = channel.cc_id
        this.intentionLetterInfo.cc_name = channel.cc_name
      }
      this.selectChannelShow = false
    },

    /*选择项目*/
    showProjectPopup(){
      this.selectProjectShow = true
    },

    selectProject(project){
      if(project){
        this.intentionLetterInfo.prj_no = project.prj_no
        this.intentionLetterInfo.prj_name = project.prj_name
        this.intentionLetterInfo.chg_no = project.chg_no  //变更流水号

        //借款人相关信息关联项目中的客户信息
        this.intentionLetterInfo.cus_id = project.cus_id
        this.intentionLetterInfo.cus_name = project.cus_name

        //选中项目时，方案信息和产品信息全部重置
        this.intentionLetterInfo.plan_no = null
        this.intentionLetterInfo.plan_name = null
        this.intentionLetterInfo.branch_no = null
        this.intentionLetterInfo.prd_no = null
        this.intentionLetterInfo.prd_name = null
        this.intentionLetterInfo.apply_amt = null
        this.intentionLetterInfo.term = null
        this.intentionLetterInfo.loan_term_unit = null
        this.intentionLetterInfo.com_br_id = null
        this.intentionLetterInfo.com_br_id_displayname = null
        this.intentionLetterInfo.repay_type = null
      }
      this.selectProjectShow = false
    },

    /*选择方案*/
    showPlanPopup(){
      this.selectPlanShow = true
    },

    selectPlan(plan){
      if(plan){
        this.intentionLetterInfo.plan_no = plan.plan_no
        this.intentionLetterInfo.plan_name = plan.plan_name
        this.intentionLetterInfo.branch_no = plan.branch_no

        //选定方案信息时，带出下部信息（产品编号，产品名称，申请金额，贷款期限，期限单位，放款机构，还款方式）
        this.intentionLetterInfo.prd_no = plan.prd_no
        this.intentionLetterInfo.prd_name = plan.prd_name
        this.intentionLetterInfo.apply_amt = plan.plan_amt
        this.intentionLetterInfo.term = plan.loan_term
        this.intentionLetterInfo.loan_term_unit = plan.interest_cycle
        this.intentionLetterInfo.com_br_id = plan.plan_loan_org
        this.intentionLetterInfo.com_br_id_displayname = plan.plan_loan_org_displayname
        this.intentionLetterInfo.repay_type = plan.repay_mode
      }
      this.selectPlanShow = false
    },

    //保存
    save(){
      let This = this
      This.isSubmit = false
      This.$validator.validate()
      .then(result => {
        if(result){
          This.action = 'save'
          if(this.intentionLetterInfo.serno){
            //已经保存过一次，调update接口
            Server.intentionLetter.updateIntentionLetter(This.param)
            .then(res => {
              if(res.returnCode == '000'){
                Toast({
                  message: '保存成功',
                  position: 'middle',
                  iconClass: 'mintui mintui-success',
                  duration: 500
                })
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
            })
          }
          else{
            //第一次保存，调add接口
            Server.intentionLetter.addIntentionLetter(This.param)
            .then(res => {
              if(res.returnCode == '000'){
                This.intentionLetterInfo.serno = res.returnData.serno
                Toast({
                  message: '保存成功',
                  position: 'middle',
                  iconClass: 'mintui mintui-success',
                  duration: 500
                })
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
            })
          }
          
        }
        else{ //校验不通过
          if(This.$validator.errors.items.length){
            MessageBox.alert(This.$validator.errors.items[0].msg)
          }
        }
      })
      
    },

    //提交
    submit(){
      let This = this
      This.isSubmit = true
      This.$validator.validate()
      .then(result => {
        if(result){ //校验通过
          MessageBox.confirm('确定提交申请信息吗？')
          .then(action => {
            This.action = 'submit'
            if(this.intentionLetterInfo.serno){
              Server.intentionLetter.updateIntentionLetter(This.param)
              .then(res => {
                if(res.returnCode == '000'){
                  This.startWF()
                }
                else{
                  MessageBox.alert(res.returnMsg)
                }
              })
            }
            else{
              Server.intentionLetter.addIntentionLetter(This.param)
              .then(res => {
                if(res.returnCode == '000'){
                  This.intentionLetterInfo.serno = res.returnData.serno
                  This.startWF()
                }
                else{
                  MessageBox.alert(res.returnMsg)
                }
              })
            }
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

    //发起流程
    startWF(){
      let wfParam = {
        "cus_id": this.intentionLetterInfo.cus_id,
        "cus_name": this.intentionLetterInfo.cus_name,
        "prj_no": this.intentionLetterInfo.prj_no,
        "prj_name": this.intentionLetterInfo.prj_name,
        "amt": this.intentionLetterInfo.apply_amt,
        "applType": "155",
        "wfSign": "03",
        "app_url": "getCtrIntentionLetterViewPage.do?is_print=1&serno=" + this.intentionLetterInfo.serno,
        "update_url": "getCtrIntentionLetterUpdatePage.do?serno=" + this.intentionLetterInfo.serno + "&menuId=yxhsq",
        "modelId": "CtrIntentionLetter",
        "pkCol": "serno",
        "pkVal": this.intentionLetterInfo.serno,
        "status": "000",
        "from": 'intentionLetter'//用来确定成功页面的按钮返回地址
      }

      WF.initWFSubmit(wfParam)
    }


  }
}
</script>
<template>
  <div>
    <div class="info-block longname">
      <div class="info-title">联系信息</div>
      <ul class="info-form">
        <li>
          <div class="info-rows">
            <div class="info-name">注册所在地<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入注册所在地（省市）" 
                v-model="customerInfoContact.reg_addrScale"
                maxlength="50"
                name="注册所在地" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">详细地址<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入详细地址" 
                v-model="customerInfoContact.reg_addrDetail"
                maxlength="50"
                name="注册所在地详细地址" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block longname">
      <div class="info-title"></div>
      <ul class="info-form">
        <li>
          <div class="info-rows">
            <div class="info-name">通讯地址<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入通讯地址（省市）" 
                v-model="customerInfoContact.post_addrScale"
                maxlength="50"
                name="通讯地址" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">详细地址<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入详细地址" 
                v-model="customerInfoContact.post_addrDetail"
                maxlength="50"
                name="详细地址" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">邮政编码<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="tel" 
                placeholder="请输入邮政编码" 
                v-model="customerInfoContact.post_code"
                maxlength="6"
                name="邮政编码" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block longname">
      <div class="info-title"></div>
      <ul class="info-form">
        <li>
          <div class="info-rows">
            <div class="info-name">经营场所取得方式<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="ownershipDicData" 
                v-model="customerInfoContact.ownership"
                name="经营场所取得方式" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">经营面积<span class="required">*</span></div>
            <div class="info-value flexbox-sb">
              <input 
                type="text" 
                placeholder="请输入" 
                v-model="customerInfoContact.manage_area"
                maxlength="50"
                name="经营面积" 
                v-validate="'required'"
              >
              <span>平方米</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block longname">
      <div class="info-title">法人信息</div>
      <ul class="info-form">
        <li>
          <div class="info-rows">
            <div class="info-name">法人代表人编号<span class="required">*</span></div>
            <div class="info-value popupable" @click="showCustomerPopup">
              <input 
                type="text" 
                v-model="customerInfoContact.legal_cus_id"
                name="法人代表人编号" 
                v-validate="'required'"
                readonly
                v-show="customerInfoContact.legal_cus_id"
              >
              <span class="r">
                <span v-show="!customerInfoContact.legal_cus_id">点击选择</span> 
                <span class="h-icon-arrow-right"></span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">法人代表人名称<span class="required">*</span></div>
            <div class="info-value flexbox-sb">
              <input 
                type="text" 
                placeholder="请输入法人代表人名称" 
                v-model="customerInfoContact.legal_name"
                maxlength="50"
                name="法人代表人名称" 
                v-validate="'required'"
                readonly
              >
            </div>
          </div>
        </li>
        <li v-if="showQua">
          <div class="info-rows">
            <div class="info-name">企业资质<span class="required">*</span></div>
            <div class="info-value popupable"  @click="showTreePopup('qua', 'enterprise_qua')">
              <span></span>
              <span class="r">
                <span>点击选择</span> 
                <span class="h-icon-arrow-right"></span>
              </span>
            </div>
          </div>
          <div class="info-area">
            <div class="list">
              <mt-cell 
                :title="item.enterprise_qua_name" 
                v-for="(item,index) in customerQuaList" 
                :key="index"
              >
                <mt-button type="danger" size="small" @click="deleteQua(item.enterprise_qua)">删除</mt-button>
              </mt-cell>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-box">
      <router-link :to="'/customer/create/corp/' + customerId" class="btn small light">上一步</router-link>
      <a class="btn small" href="javascript:;" @click="updateCorpContactInfo">下一步</a>
    </div>
    <select-customer :isShow="selectCustomerShow" @select="selectCustomer" :type="popCustomerType"></select-customer>
    <select-tree :isShow="selectTreeShow" :type="treeType" :keycode="keycode" @select="selectTree"></select-tree>
  </div>
</template>

<script>
  import HSelect from '@/components/HSelect'
  import SelectCustomer from '@/client/popupList/SelectCustomer'
  import SelectTree from '@/client/popupList/SelectTree'
  import { mapState } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import Server from '@/server'
  export default {
    data(){
      return {
        //从url上获取customerId
        customerId: '',

        //行业编码
        industryId: '',
        //树图类型
        treeType: '',
        //树图赋值字段
        keycode: '',

        customerQuaList: [],

        customerInfoContact: {},

        popCustomerType: null,

        //控制选择弹框展示
        selectCustomerShow: false,
        selectTreeShow: false
      }
    },
    components: {
      HSelect,
      SelectCustomer,
      SelectTree
    },
    computed: {

      //只有国标行业为建筑类的时候才会显示资质选择
      showQua(){
        if(this.industryId){
          let str = this.industryId.substring(0, 2)
          if((str>=47 && str<=50) || this.industryId == '3399'){
            return true
          }
          else{
            return false
          }
        }
        else{
          return false
        }
      },

      //字典项查询
      ownershipDicData(){ //经营场所取得方式
        return this.getDIC.STD_PUB_SITE_WAY.value
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

      param(){
        return {
          "CusComBase.cus_id": this.customerInfoContact.cus_id,
          "CusComBase.reg_addr": this.$strAction.getJoinedAddress(this.customerInfoContact.reg_addrScale, this.customerInfoContact.reg_addrDetail),
          "CusComBase.post_addr": this.$strAction.getJoinedAddress(this.customerInfoContact.post_addrScale, this.customerInfoContact.post_addrDetail),
          "CusComBase.post_code": this.customerInfoContact.post_code,
          "CusComBase.ownership": this.customerInfoContact.ownership,
          "CusComBase.manage_area": this.customerInfoContact.manage_area,
          "CusComBase.legal_cus_id": this.customerInfoContact.legal_cus_id,
          "CusComBase.legal_name": this.customerInfoContact.legal_name,
          "CusComBase.enterprise_qua": this.customerInfoContact.enterprise_qua
        }
      }
    },
    created(){
      this.customerId = this.$route.params.customerId
      this.getCusContactInfo()
      this.getCusBaseInfo()
      this.getCusQuaInfo()
    },
    methods: {

      /*
       * 选择树图
       * treeType：树图类型
       * key：对应的需要赋值的字段
       */
      showTreePopup(treeType, keycode){
        this.treeType = treeType
        this.keycode = keycode
        this.selectTreeShow = true
      },

      selectTree(tree){
        if(tree){
          let keycode = tree.keycode

          //企业资质单独处理
          if(keycode == 'enterprise_qua'){
            Server.customer.addCusQuaInfo({
              "CusQuaInfo.cus_id": this.customerId,
              "CusQuaInfo.enterprise_qua": tree.enname,
              "CusQuaInfo.enterprise_qua_name": tree.namepath
            })
            .then(res => {
              if(res.returnCode == '000'){
                this.getCusQuaInfo()
              }
            })
          }
        }
        this.selectTreeShow = false
      },

      /*选择法定代表人*/
      showCustomerPopup(){
        this.popCustomerType = 'legal'
        this.selectCustomerShow = true
      },

      selectCustomer(customer){
        if(customer){
          this.customerInfoContact.legal_cus_id = customer.cus_id
          this.customerInfoContact.legal_name = customer.cus_name
        }
        this.selectCustomerShow = false
      },

      //查询客户基本信息
      getCusBaseInfo(){
        if(this.customerId){
          let param = {cus_id: this.customerId}
          Server.customer.getCusCorpBasicInfo(param)
          .then(res => {
            this.industryId = res.returnData.CusComBase.industry_id
          })
        }
      },

      //查询联系信息
      getCusContactInfo(){
        if(this.customerId){
          let param = {cus_id: this.customerId}
          Server.customer.getCusCorpContactInfo(param)
          .then(res => {
            this.customerInfoContact = res.returnData.CusComBase

            let contactInfo = this.customerInfoContact
            contactInfo.reg_addrScale = this.$strAction.getAddress(contactInfo.reg_addr)[0]
            contactInfo.reg_addrDetail = this.$strAction.getAddress(contactInfo.reg_addr)[1]
            contactInfo.post_addrScale = this.$strAction.getAddress(contactInfo.post_addr)[0]
            contactInfo.post_addrDetail = this.$strAction.getAddress(contactInfo.post_addr)[1]

          })
        }
      },

      //提交联系信息
      updateCorpContactInfo(){
        let This = this
        This.$validator.validate()
        .then(result => {
          if(result){ //校验通过
            Server.customer.updateCusCorpBaseInfo(This.param)
            .then(res => {
              if(res.returnCode == '000'){
                This.$router.push('/customer/create/corp/stock/' + This.customerId)
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
            })
          }
          else{ //校验不通过
            if(This.$validator.errors.items.length){
              MessageBox.alert(This.$validator.errors.items[0].msg)
            }
          }
        })
        
      },


      //查询企业资质信息
      getCusQuaInfo(){
        Server.customer.getCusQuaInfo({
          "cus_id": this.customerId,
          "pageInfo.maxLine": 20,
          "pageInfo.targetPage": 1
        })
        .then(res => {
          this.customerQuaList = res.returnData.CusQuaInfoList
        })
      },

      //删除企业资质
      deleteQua(enterpriseQua){
        Server.customer.deleteCusQuaInfo({
          "CusQuaInfo.cus_id": this.customerId,
          "CusQuaInfo.enterprise_qua": enterpriseQua
        })
        .then(res => {
          if(res.returnCode == '000'){
            this.getCusQuaInfo()
          }
        })
      }

      
    }
  }
</script>
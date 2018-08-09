<template>
  <div class="pad-head">
    <div class="info-block longname">
      <ul class="info-form">
        <li>
          <div class="info-rows">
            <div class="info-name">客户名称<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入客户名称" 
                v-model="cus_name" 
                maxlength="50"
                name="客户名称" 
                v-validate="'required'"
                @blur="idValidate"
              >
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">客户类型<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="cusTypeDicData" 
                v-model="cus_type"
                name="客户类型" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">证件类型<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="curtTypeDicData" 
                v-model="cert_type"
                name="证件类型" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">证件号码<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入证件号码" 
                v-model="cert_code" 
                name="证件号码" 
                v-validate="'required'"
                @blur="certCodeValidate"
              >
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">证件号码确认<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请再次输入证件号码"
                v-model="cert_code_confirm"
                name="证件号码确认" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>

        <!-- 只有客户类型为非个人客户，且证件类型为“组织机构代码证”或者“统一社会信用代码”时，才会查询并展示中征码 -->
        <li v-if="cus_type!=='101' && (cert_type=='01' || cert_type=='08')">
          <div class="info-rows">
            <div class="info-name">中征码</div>
            <div class="info-value">
              <input type="text" placeholder="请输入中征码" v-model="loan_card">
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">客户来源<span class="required">*</span></div>
            <div class="info-value">
              <h-select :options="curtSourceDicData" v-model="cus_source"></h-select>
            </div>
          </div>
        </li>

        <!-- 当客户来源为“主动营销”或“其他”时 -->
        <li v-if="cus_source == '1' || cus_source == '8'">
          <div class="info-area">
            <div class="info-name">客户来源说明<span class="required">*</span></div>
            <div class="info-value">
              <textarea 
                placeholder="请输入" 
                v-model="cus_source_info.cus_source_desc"
                maxlength="500"
                name="客户来源说明" 
                v-validate="'required'"
              >
              </textarea>
            </div>
          </div>
        </li>

        <!-- 当客户来源为“客户推荐”时 -->
        <li v-if="cus_source == '2'">
          <div class="info-rows">
            <div class="info-name">推荐客户名称<span class="required">*</span></div>
            <div class="info-value popupable" @click="showCustomerPopup">
              <input 
                type="text" 
                v-model="cus_source_info.recom_cus_name"
                name="推荐客户名称" 
                v-validate="'required'"
                readonly
                v-show="cus_source_info.recom_cus_name"
              >
              <span class="r">
                <span v-show="!cus_source_info.recom_cus_name">点击选择</span> 
                <span class="h-icon-arrow-right"></span>
              </span>
            </div>
          </div>
        </li>
        <li v-if="cus_source == '2'">
          <div class="info-rows">
            <div class="info-name">推荐客户电话<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="tel" 
                placeholder="请输入推荐客户电话" 
                v-model="cus_source_info.recom_cus_phone"
                maxlength="11"
                name="推荐客户电话" 
                v-validate="'required|phone'"
              >
            </div>
          </div>
        </li>

        <!-- 当客户来源为“渠道推荐”时 -->
        <li v-if="cus_source == '3'">
          <div class="info-rows">
            <div class="info-name">推荐渠道名称<span class="required">*</span></div>
            <div class="info-value popupable" @click="showChannelPopup">
              <input 
                type="text" 
                v-model="cus_source_info.recom_channel_name"
                name="推荐渠道名称" 
                v-validate="'required'"
                readonly
                v-show="cus_source_info.recom_channel_name"
              >
              <span class="r">
                <span v-show="!cus_source_info.recom_channel_name">点击选择</span> 
                <span class="h-icon-arrow-right"></span>
              </span>
            </div>
          </div>
        </li>
        <li v-if="cus_source == '3'">
          <div class="info-rows">
            <div class="info-name">推荐人姓名<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入推荐人姓名" 
                v-model="cus_source_info.recom_ch_person_name"
                maxlength="50"
                name="推荐人姓名" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li v-if="cus_source == '3'">
          <div class="info-rows">
            <div class="info-name">推荐人联系方式<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="tel" 
                placeholder="请输入推荐人联系方式" 
                v-model="cus_source_info.recom_ch_person_phone"
                maxlength="11"
                name="推荐人联系方式" 
                v-validate="'required|phone'"
              >
            </div>
          </div>
        </li>
        <li v-if="cus_source == '3'">
          <div class="info-rows">
            <div class="info-name">推荐人职位<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入推荐人职位" 
                v-model="cus_source_info.recom_ch_person_post"
                maxlength="50"
                name="推荐人职位" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>

        <!-- 当客户来源为“自兄弟业务集团转化”时 -->
        <li v-if="cus_source == '4'">
          <div class="info-rows">
            <div class="info-name">兄弟客户集团<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="brotherCusGroupDicData" 
                v-model="cus_source_info.brother_cus_group"
                name="兄弟客户集团" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li v-if="cus_source == '4' && cus_source_info.brother_cus_group=='40'">
          <div class="info-rows">
            <div class="info-name">其他客户集团<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入其他客户集团名称" 
                v-model="cus_source_info.other_cus_group"
                maxlength="50"
                name="其他客户集团" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>

        <!-- 当客户来源为“公司统一下发的名单”时 -->
        <li v-if="cus_source == '5'">
          <div class="info-rows">
            <div class="info-name">下发部门<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入下发部门名称" 
                v-model="cus_source_info.issued_depart"
                maxlength="50"
                name="下发部门" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>

        <!-- 当客户来源为“公司交办”时 -->
        <li v-if="cus_source == '6'">
          <div class="info-rows">
            <div class="info-name">交办人<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="assignedPeopleDicData" 
                v-model="cus_source_info.assigned_people"
                name="交办人" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>

        <!-- 当客户来源为“内部推荐”时 -->
        <li v-if="cus_source == '7'">
          <div class="info-rows">
            <div class="info-name">员工姓名<span class="required">*</span></div>
            <div class="info-value popupable" @click="showEmployeePopup">
              <input 
                type="text" 
                v-model="cus_source_info.employee_name"
                name="员工姓名" 
                v-validate="'required'"
                readonly
                v-show="cus_source_info.employee_name"
              >
              <span class="r">
                <span v-show="!cus_source_info.employee_name">点击选择</span> 
                <span class="h-icon-arrow-right"></span>
              </span>
            </div>
          </div>
        </li>
        <li v-if="cus_source == '7'">
          <div class="info-rows">
            <div class="info-name">员工部门<span class="required">*</span></div>
            <div class="info-value">
              <input type="text" 
                placeholder="请输入员工部门" 
                v-model="cus_source_info.employee_part"
                maxlength="50"
                name="员工部门" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li v-if="cus_source == '7'">
          <div class="info-rows">
            <div class="info-name">员工职位<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入员工职位" 
                v-model="cus_source_info.employee_post"
                maxlength="50"
                name="员工职位" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li v-if="cus_source == '7'">
          <div class="info-rows">
            <div class="info-name">员工电话<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="tel" 
                placeholder="请输入员工电话" 
                v-model="cus_source_info.employee_phone"
                maxlength="50"
                name="员工电话" 
                v-validate="'required|phone'"
              >
            </div>
          </div>
        </li>
        <li v-if="cus_source == '7'">
          <div class="info-rows">
            <div class="info-name">员工机构<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入员工机构" 
                v-model="cus_source_info.employee_org"
                maxlength="50"
                name="员工机构" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-box">
      <a class="btn" @click="validate">下一步</a>
    </div>
    <select-customer :isShow="selectCustomerShow" @select="selectCustomer"></select-customer>
    <select-channel :isShow="selectChannelShow" @select="selectChannel"></select-channel>
    <select-employee :isShow="selectEmployeeShow" @select="selectEmployee"></select-employee>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import { mapState } from 'vuex'
  import HSelect from '@/components/HSelect'
  import SelectCustomer from '@/client/popupList/SelectCustomer'
  import SelectChannel from '@/client/popupList/SelectChannel'
  import SelectEmployee from '@/client/popupList/SelectEmployee'
  import Server from '@/server'
  export default {
    data(){
      return {
        cus_name: '', //客户名称
        cus_type: '', //客户类型
        cert_type: '',  //证件类型
        cert_code: '',  //证件号码
        cert_code_confirm: '',  //证件号码确认
        loan_card: '',  //中征码
        if_manager: null, //是否获取管护权

        cus_source: '', //客户来源

        cus_source_info: {
          //主动营销/其他
          cus_source_desc: '',  //客户来源说明

          //客户推荐
          recom_cus_name: '', //推荐客户名称
          recom_cus_phone: '',  //推荐客户电话
          recom_cus_id: '', //推荐客户编号

          //渠道推荐
          recom_channel_id: '', //推荐渠道编号
          recom_channel_name: '', //推荐渠道名称
          recom_ch_person_name: '', //推荐人姓名
          recom_ch_person_phone: '', //推荐人联系方式
          recom_ch_person_post: '', //推荐人职位

          //自兄弟业务集团转化
          brother_cus_group: '',  //兄弟客户集团
          other_cus_group: '',  //其他客户集团

          //公司统一下发的名单
          issued_depart: '',  //下发部门

          //公司交办
          assigned_people: '',  //交办人

          //内部推荐
          employee_name: '', //员工姓名
          employee_part: '',  //员工部门
          employee_post: '',  //员工职位
          employee_phone: '', //员工电话
          employee_org: '', //员工机构
          employee_id: '',  //员工编号
        },

        //控制选择弹框展示
        selectCustomerShow: false,
        selectChannelShow: false,
        selectEmployeeShow: false
      }
    },
    computed: {
      //字典项查询
      cusTypeDicData(){ //客户类型
        return this.getDIC.STD_PUB_CUS_TYPE.value
      },
      curtTypeDicData(){  //证件类型
        let curtTypeDicData = this.getDIC.STD_PUB_CERT_TYPE.value
        if(this.cus_type == '101'){
          this.cert_type = ''
          return _.pick(curtTypeDicData, ['02', '04', '05', '06', '07'])
        }
        else{
          this.cert_type = ''
          return _.pick(curtTypeDicData, ['01', '08', '03'])
        }
      },
      curtSourceDicData(){  //客户来源
        return this.getDIC.CUS_SOURCE.value
      },
      brotherCusGroupDicData(){  //自兄弟客户集团
        return this.getDIC.STD_XS_BROTHER_GROUP.value
      },
      assignedPeopleDicData(){  //交办人
        return this.getDIC.STD_XS_ASSIGNED.value
      },

      //发送创建客户请求时的参数收集
      param(){
        return {
          "CusBase.cus_name": this.cus_name,
          "CusBase.cus_type": this.cus_type,
          "CusBase.cert_type": this.cert_type,
          "CusBase.cert_code": this.cert_code,
          "CusBase.loan_card": this.loan_card,
          "CusBase.if_manager": this.if_manager,
          "CusBase.cus_source": this.cus_source,
          "CusBase.cus_source_desc": this.cus_source_info.cus_source_desc,
          "CusBase.recom_cus_name": this.cus_source_info.recom_cus_name,
          "CusBase.recom_cus_phone": this.cus_source_info.recom_cus_phone,
          "CusBase.recom_cus_id": this.cus_source_info.recom_cus_id,
          "CusBase.recom_channel_id": this.cus_source_info.recom_channel_id,
          "CusBase.recom_channel_name": this.cus_source_info.recom_channel_name,
          "CusBase.recom_ch_person_name": this.cus_source_info.recom_ch_person_name,
          "CusBase.recom_ch_person_phone": this.cus_source_info.recom_ch_person_phone,
          "CusBase.recom_ch_person_post": this.cus_source_info.recom_ch_person_post,
          "CusBase.brother_cus_group": this.cus_source_info.brother_cus_group,
          "CusBase.other_cus_group": this.cus_source_info.other_cus_group,
          "CusBase.issued_depart": this.cus_source_info.issued_depart,
          "CusBase.assigned_people": this.cus_source_info.assigned_people,
          "CusBase.employee_name": this.cus_source_info.employee_name,
          "CusBase.employee_part": this.cus_source_info.employee_part,
          "CusBase.employee_post": this.cus_source_info.employee_post,
          "CusBase.employee_phone": this.cus_source_info.employee_phone,
          "CusBase.employee_org": this.cus_source_info.employee_org,
          "CusBase.employee_id": this.cus_source_info.employee_id
        }
      },
      ...mapState({
        getDIC: state => {
          let localData = JSON.parse(localStorage.getItem('DIC'))
          if(state.DIC==={} && localData){
            this.$store.commit('updateDic', localData)
          }
          return state.DIC
        }
      })
    },

    watch: {
      //监测客户来源字段，发生变化时，客户来源相关信息字段全部清空
      cus_source: function(){
        _.forEach(this.cus_source_info, (value, key) => {
          this.cus_source_info[key] = ''
        })
      }
    },

    components: {
      HSelect,
      SelectCustomer,
      SelectChannel,
      SelectEmployee
    },
    methods: {

      //证件号码校验
      certCodeValidate(){

        //身份证
        if(this.cert_type == '02'){
          this.idValidate()
        }

        //组织机构代码证
        if(this.cert_type == '01'){
          this.orgCodeValidate()
        }

        //统一社会信用代码校验
        if(this.cert_type == '08' && this.cert_code.length !== 18){
          MessageBox.alert('请输入18位的统一社会信用代码')
        }

        //中征码查询
        if(this.cert_type == '01' || this.cert_type == '08'){
          this.getLoanCard()
        }

      },

      /*校验身份证真实性*/
      idValidate(){
        if(!this.cus_name || !this.cert_code) return
        if(this.cert_code.length !== 18){
          MessageBox.alert('请输入18位身份证号')
          this.cert_code = ''
        }
        /*Server.customer.validateIdCode({
          "cus_name": this.cus_name,
          "cert_code": this.cert_code
        })
        .then(res => {
          if(res.returnCode !== '000'){
            MessageBox.alert('请输入真实的身份证号')
          }
        })*/
        
      },

      /*组织机构代码证校验*/
      orgCodeValidate(){
        let orgCode = this.cert_code
        // let old_style = /^X\d{9}$/
        
        if(!orgCode) return

        //旧的组织机构代码证规则
        if(orgCode.length !== 10){
          MessageBox.alert("组织机构代码必须为10位")
          this.cert_code = ''
          return
        }
        
        // if(!this.CheckOrgCode(orgCode)){
        //   MessageBox.alert("请输入正确的组织机构代码")
        //   this.cert_code = ''
        //   return
        // }

      },

      CheckOrgCode(code) {  
        //机构代码  
        var ws = [3, 7, 9, 10, 5, 8, 4, 2];  
        var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';  
        var reg = /^([0-9A-Z]){8}-[0-9|X]$/;  // /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}$/  
        var sum = 0;  
        for (var i = 0; i < 8; i++){  
            sum += str.indexOf(code.charAt(i)) * ws[i];  
        }  
        var c9 = 11 - (sum % 11);  
        c9 = c9 == 10 ? 'X' : c9;
        c9 = c9 == 11 ? '0' : c9;
        if (!reg.test(code) || c9 !== code.charAt(9)) {  
          return false;  
        } else {
          return true;
        }
      },

      //查询中征码
      getLoanCard(){
        if(this.cus_name && this.cert_code && this.cus_type && this.cert_type){
          Server.customer.getLoanCard({
            "cus_name": this.cus_name,
            "cert_code": this.cert_code,
            "cus_type": this.cus_type,
            "cert_type": this.cert_type
          })
          .then(res => {
            if(res.returnData.loan_card){
              this.loan_card = res.returnData.loan_card
            }
          })
        }
      },


      /*选择推荐客户*/
      showCustomerPopup(){
        this.selectCustomerShow = true
      },

      selectCustomer(customer){
        if(customer){
          this.cus_source_info.recom_cus_name = customer.cus_name
          this.cus_source_info.recom_cus_phone = customer.contact_phone
          this.cus_source_info.recom_cus_id = customer.cus_id
        }
        this.selectCustomerShow = false
      },

      /*选择推荐渠道*/
      showChannelPopup(){
        this.selectChannelShow = true
      },

      selectChannel(channel){
        if(channel){
          this.cus_source_info.recom_channel_name = channel.cc_name
          this.cus_source_info.recom_channel_id = channel.cc_id
        }
        this.selectChannelShow = false
      },

      /*选择推荐员工*/
      showEmployeePopup(){
        this.selectEmployeeShow = true
      },

      selectEmployee(employee){
        if(employee){
          this.cus_source_info.employee_name = employee.actorname
          this.cus_source_info.employee_part = employee.orgid_displayname
          this.cus_source_info.employee_post = employee.work_level
          this.cus_source_info.employee_phone = employee.telnum
          this.cus_source_info.employee_org = employee.orgid_displayname
          this.cus_source_info.employee_id = employee.actorno
        }
        this.selectEmployeeShow = false
      },

      /*获取管护权确认*/
      validate(){
        let This = this
        This.$validator.validate()
        .then(result => {
          if(result){ //校验通过
            if(This.cert_code_confirm !== This.cert_code){  //单独对“证件号码确认”做校验
              MessageBox.alert('两次输入的证件号码不相同，请重新输入')
              return
            }
            MessageBox({
              message: '是否获取管护权？',
              showCancelButton: true,
              confirmButtonText: '是',
              cancelButtonText: '否'
            })
            .then(action => {
              if(action == 'confirm'){  //是
                This.if_manager = 1
                Server.customer.createCustomer(This.param)
                .then(res => {
                  let resInfo = res
                  if(resInfo.returnCode !== '000'){
                    let errorMsg = resInfo.returnMsg
                    MessageBox.alert(errorMsg)
                  }
                  else{
                    if(resInfo.returnData.flag == '1'){
                      MessageBox.alert('管护权数量已超额，请先线下申请修改管护数量，再获取管护权！')
                    }
                    else{
                      //继续完善客户信息
                      let customerId = resInfo.returnData.cus_id
                      if(This.cus_type == '101'){
                        This.$router.push('/customer/create/indi/' + customerId)
                      }
                      else{
                        This.$router.push('/customer/create/corp/' + customerId)
                      }
                    }
                  }
                })
              }
              else{ //否
                This.if_manager = 2
                Server.customer.createCustomer(This.param)
                .then(res => {
                  let resInfo = res
                  if(resInfo.returnCode !== '000'){
                    let errorMsg = resInfo.returnMsg
                    MessageBox.alert(errorMsg)
                  }
                  else{
                    //未获得管护权，提示去PC端操作
                    MessageBox.alert('开户成功！未获取管户权，可到pc端业务系统【客户拾取】菜单中查看')
                  }
                })
              }
            })
          }
          else{ //校验不通过
            if(This.$validator.errors.items.length){
              MessageBox.alert(This.$validator.errors.items[0].msg)
            }
          }
        })
      }


    }
  }
</script>
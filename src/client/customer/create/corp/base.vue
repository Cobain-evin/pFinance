<template>
  <div>
    <div class="info-block longname">
      <div class="info-title">基本信息</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">客户编号</div>
            <div class="info-value">{{customerInfoBase.cus_id}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">客户名称</div>
            <div class="info-value">{{customerInfoBase.cus_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">证件类型</div>
            <div class="info-value">{{customerInfoBase.cert_typeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">证件号码</div>
            <div class="info-value">{{customerInfoBase.cert_code}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">客户类型</div>
            <div class="info-value">{{customerInfoBase.cus_typeCN}}</div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">统一社会信用代码<span v-if="isAllInOneRequired" class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入统一社会信用代码" 
                v-model="customerInfoBase.all_in_one_code"
                maxlength="50"
                name="统一社会信用代码" 
                v-validate="{'required': isAllInOneRequired}"
                :disabled="isAllInOneDisabled"
              >
            </div>
          </div>
        </li>
        <li v-if="customerInfoBase.cert_type=='01'">
          <div class="info-rows">
            <div class="info-name">营业执照号码<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入营业执照号码" 
                v-model="customerInfoBase.com_wprm_code"
                maxlength="50"
                name="营业执照号码" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li v-if="customerInfoBase.cert_type=='01'">
          <div class="info-rows">
            <div class="info-name">税务登记号<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入税务登记号" 
                v-model="customerInfoBase.indiv_crp_lt_code"
                maxlength="50"
                name="税务登记号" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">纳税人性质<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="taxpayerTypeDicData" 
                v-model="customerInfoBase.pay_tax_type"
                name="纳税人性质" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block longname">
      <div class="info-title">企业信息</div>
      <ul class="info-form">
        <li v-if="customerInfoBase.cus_type=='200'">
          <div class="info-rows">
            <div class="info-name">企业成立日期<span class="required">*</span></div>
            <div class="info-value">
              <h-datepicker 
                v-model="customerInfoBase.establish_date"
                name="企业成立日期" 
                v-validate="'required'"
                :max="currentDate"
              >
              </h-datepicker>
            </div>
          </div>
        </li>
        <li v-if="isShowRegdate">
          <div class="info-rows">
            <div class="info-name">发证日期<span class="required">*</span></div>
            <div class="info-value">
              <h-datepicker 
                v-model="customerInfoBase.reg_date"
                name="发证日期" 
                v-validate="'required'"
                :max="currentDate"
              >
              </h-datepicker>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">注册币种<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="currencyTypeDicData" 
                v-model="customerInfoBase.cur_type"
                name="注册币种" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">注册资本<span class="required">*</span></div>
            <div class="info-value flexbox-sb">
              <input type="text" 
                placeholder="请输入注册资本" 
                v-model="customerInfoBase.reg_cap_amt"
                maxlength="50"
                name="注册资本" 
                v-validate="'required'"
              >
              <span>万元</span>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">国标行业<span class="required">*</span></div>
            <div class="info-value">
              <div class="info-value popupable"  @click="showTreePopup('industry', 'industry')">
                <span>{{customerInfoBase.industry}}</span>
                <span class="r">
                  <span v-show="!customerInfoBase.industry">点击选择</span> 
                  <span class="h-icon-arrow-right"></span>
                </span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">内部行业</div>
            <div class="info-value">
              <h-select 
                :options="inIndustryDicData" 
                v-model="customerInfoBase.in_industry"
                :disabled="true"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">授信政策</div>
            <div class="info-value">
              <h-select 
                :options="creditMearDicData" 
                v-model="customerInfoBase.credit_mear"
                :disabled="true"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">存续状态<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="saveStatusDicData" 
                v-model="customerInfoBase.save_status"
                name="存续状态" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">企业性质<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="busNatDicData" 
                v-model="customerInfoBase.bus_nat"
                name="企业性质" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">是否涉及三农<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="yesOrNoDicData" 
                v-model="customerInfoBase.if_agriculture"
                name="是否涉及三农" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">客户业务特征</div>
            <div class="info-value">
              <h-select 
                :options="busFeatureDicData" 
                v-model="customerInfoBase.cus_bus_feature"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-rows">
            <div class="info-name">是否上市<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="yesOrNoDicData" 
                v-model="customerInfoBase.com_mrk_flg"
                name="是否上市" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li v-if="customerInfoBase.com_mrk_flg == '1'">
          <div class="info-rows">
            <div class="info-name">股票代码<span class="required">*</span></div>
            <div class="info-value">
              <input 
                type="text" 
                placeholder="请输入股票代码" 
                v-model="customerInfoBase.stock_code"
                maxlength="50"
                name="股票代码" 
                v-validate="'required'"
              >
            </div>
          </div>
        </li>
        <li>
          <div class="info-area">
            <div class="info-name">主营业务范围<span class="required">*</span></div>
            <div class="info-value">
              <textarea 
                placeholder="请输入主营业务范围" 
                v-model="customerInfoBase.work_range"
                maxlength="500"
                name="主营业务范围" 
                v-validate="'required'"
              >
              </textarea>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-box">
      <a href="javascript:;" class="btn" @click="updateCusCorpBaseInfo">下一步</a>
      <select-tree :isShow="selectTreeShow" :type="treeType" :keycode="keycode" @select="selectTree"></select-tree>
    </div>
  </div>
</template>

<script>
  import HSelect from '@/components/HSelect'
  import HDatepicker from '@/components/HDatepicker'
  import SelectTree from '@/client/popupList/SelectTree'
  import { mapState } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import Server from '@/server'
  export default {
    data(){
      return {
        //从url上获取customerId
        customerId: '',
        customerInfoBase: {},

        //树图弹出框展示/隐藏标识
        selectTreeShow: false,
        //树图类型
        treeType: '',
        //树图赋值字段
        keycode: '',
        //统一社会信用代码必填标识
        isAllInOneRequired: true,
        //统一社会信用代码可否编辑标识
        isAllInOneDisabled: false,

        //是否展示“发证日期”标识
        isShowRegdate: false
      }
    },
    computed: {

      currentDate(){
        return this.$timeAction.formatDate(new Date(), 'yyyy-MM-dd');
      },

      //字典项查询
      taxpayerTypeDicData(){ //纳税人性质
        return this.getDIC.STD_PUB_PAY_TAX_TYPE.value
      },
      currencyTypeDicData(){ //币种
        let dicData = this.getDIC.STD_ZX_CUR_TYPE.value

        //仅展示人民币和美元
        return _.pick(dicData, ['CNY', 'USD'])
      },
      saveStatusDicData(){ //存续状态
        return this.getDIC.STD_CUS_SAVE_STATUS.value
      },
      busNatDicData(){ //企业性质
        let dicData = this.getDIC.STD_CUS_ENT_PRO.value

        //只能选择子类
        return _.pick(dicData, ['02', '03', '04', '06', '07', '08', '09', '11', '12', '13', '15', '16', '17', '18', '19', '21', '22', '23', '24', '25', '27', '28', '29', '30', '31'])
      },
      yesOrNoDicData(){ //是否项
        return this.getDIC.STD_ZX_YES_NO.value
      },
      busFeatureDicData(){ //客户业务特征
        return this.getDIC.STD_ZB_BUS_FEATURE.value
      },
      inIndustryDicData(){ //内部行业
        return this.getDIC.STD_CUS_IN_INDUSTRY.value
      },
      creditMearDicData(){ //授信政策
        return this.getDIC.STD_CUS_CREDIT_MEAR.value
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
        return this.$objAction.getStringifiedKeyParams(this.customerInfoBase, 'CusComBase')
      }
    },
    components: {
      HSelect,
      HDatepicker,
      SelectTree
    },
    created(){
      this.customerId = this.$route.params.customerId
      this.getCusBaseInfo()
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

          if(keycode == 'industry'){
            this.customerInfoBase.industry = tree.namepath
            this.customerInfoBase.industry_id = tree.enname

            //根据返回的国标行业查询相应的内部行业和授信政策
            Server.customer.getInIndustry({"industry_id": this.customerInfoBase.industry_id})
            .then(res => {
              if(res.returnCode=='000'){
                this.customerInfoBase.in_industry = res.returnData.IndustryCfgInfo.in_industry
                this.customerInfoBase.credit_mear = res.returnData.IndustryCfgInfo.credit_mear
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
            })
          }
        }
        this.selectTreeShow = false
      },

      //通过query参数中的customerId获取客户基本信息
      getCusBaseInfo(){
        if(this.customerId){
          let param = {cus_id: this.customerId}
          Server.customer.getCusCorpBasicInfo(param)
          .then(res => {
            this.customerInfoBase = res.returnData.CusComBase

            let baseInfo = this.customerInfoBase
            baseInfo.cert_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CERT_TYPE', baseInfo.cert_type)
            baseInfo.cus_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CUS_TYPE', baseInfo.cus_type)
            //当客户建档时选择的“证件类型”已经是“统一社会信用代码”时，“统一社会信用代码”字段自动填充“证件号码”字段内容且不可编辑
            if(baseInfo.cert_type == '08'){
              baseInfo.all_in_one_code = baseInfo.cert_code
              this.isAllInOneDisabled = true
            }

            //当证件类型为“其他”或“组织机构代码”时，统一社会信用代码为非必填  
            if(baseInfo.cert_type == '03' || baseInfo.cert_type == '01'){
              this.isAllInOneRequired = false
            }

            //只有当客户类型为以下时才展示“发证日期”字段：企业法人、企业非法人、民办非企业、社会团体法人、社团非法人
            if(['200', '201', '203', '205', '206'].includes(baseInfo.cus_type)){
              this.isShowRegdate = true
            }

          })
        }
      },

      //更新客户基本信息
      updateCusCorpBaseInfo(){
        let This = this
        This.$validator.validate()
        .then(result => {
          if(result){ //校验通过

            let flag = true
            //企业成立日期和发证日期必须小于当前营业时间
            if(This.customerInfoBase.cus_type=='200' && 
            This.$timeAction.date2timestamp(this.customerInfoBase.establish_date) > This.$timeAction.today2timestamp()){
              MessageBox.alert('【企业成立日期】不能大于【当前营业日期】');
              flag = false
            }
            if(This.isShowRegdate && 
            This.$timeAction.date2timestamp(this.customerInfoBase.reg_date) > This.$timeAction.today2timestamp()){
              MessageBox.alert('【发证日期】不能大于【当前营业日期】');
              flag = false
            }

            if(!this.customerInfoBase.industry){
              MessageBox.alert('国标行业不能为空')
              flag = false
            }
            
            if(flag){
              Server.customer.updateCusCorpBaseInfo(This.param)
              .then(res => {
                if(res.returnCode == '000'){
                  This.$router.push('/customer/create/corp/contact/' + This.customerId)
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
        
      }
      
    }
  }
</script>
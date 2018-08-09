<template>
  <div class="pad-foot">
    <div v-show="!editing">
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
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">统一社会信用代码</div>
              <div class="info-value">{{customerInfoBase.all_in_one_code}}</div>
            </div>
          </li>
          <li class="readonly" v-if="customerInfoBase.cert_type=='01'">
            <div class="info-rows">
              <div class="info-name">营业执照号码</div>
              <div class="info-value">{{customerInfoBase.com_wprm_code}}</div>
            </div>
          </li>
          <li class="readonly" v-if="customerInfoBase.cert_type=='01'">
            <div class="info-rows">
              <div class="info-name">税务登记号</div>
              <div class="info-value">{{customerInfoBase.indiv_crp_lt_code}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">纳税人性质</div>
              <div class="info-value">{{customerInfoBase.pay_tax_typeCN}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block longname" v-if="customerInfoBase.cus_type!='207' && customerInfoBase.cus_type!='208'">
        <div class="info-title">企业信息</div>
        <ul class="info-form">
          <li class="readonly" v-if="customerInfoBase.cus_type=='200'">
            <div class="info-rows">
              <div class="info-name">企业成立日期</div>
              <div class="info-value">{{customerInfoBase.establish_date}}</div>
            </div>
          </li>
          <li class="readonly" v-if="isShowRegdate">
            <div class="info-rows">
              <div class="info-name">发证日期</div>
              <div class="info-value">{{customerInfoBase.reg_date}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">注册币种</div>
              <div class="info-value">{{customerInfoBase.cur_typeCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div 
                class="info-name"
                v-if="customerInfoBase.cus_type!='201' &&
                      customerInfoBase.cus_type!='202' &&
                      customerInfoBase.cus_type!='203'" 
              >注册资本</div>
              <div 
                class="info-name" 
                v-if="customerInfoBase.cus_type=='201' || 
                      customerInfoBase.cus_type=='202' || 
                      customerInfoBase.cus_type=='203'"
              >开办资金</div>
              <div class="info-value">{{customerInfoBase.reg_cap_amt}}万元</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">国标行业</div>
              <div class="info-value">{{customerInfoBase.industry}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">内部行业</div>
              <div class="info-value">{{customerInfoBase.in_industryCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">授信政策</div>
              <div class="info-value">{{customerInfoBase.credit_mearCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">存续状态</div>
              <div class="info-value">{{customerInfoBase.save_statusCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">企业性质</div>
              <div class="info-value">{{customerInfoBase.bus_natCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">是否涉及三农</div>
              <div class="info-value">{{customerInfoBase.if_agricultureCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">客户业务特征</div>
              <div class="info-value">{{customerInfoBase.cus_bus_featureCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">是否上市</div>
              <div class="info-value">{{customerInfoBase.com_mrk_flgCN}}</div>
            </div>
          </li>
          <li class="readonly" v-if="customerInfoBase.com_mrk_flg == '1'">
            <div class="info-rows">
              <div class="info-name">股票代码</div>
              <div class="info-value">{{customerInfoBase.stock_code}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">主营业务范围</div>
              <div class="info-value">{{customerInfoBase.work_range}}</div>
            </div>
          </li>

          <!-- 客户类型为企业非法人时所需字段 -->
          <li class="readonly" v-if="customerInfoBase.cus_type=='201'">
            <div class="info-rows">
              <div class="info-name">兼营业务范围</div>
              <div class="info-value">{{customerInfoBase.ccrl_work_range}}</div>
            </div>
          </li>
          <li class="readonly" v-if="customerInfoBase.cus_type=='201'">
            <div class="info-rows">
              <div class="info-name">经济性质</div>
              <div class="info-value">{{customerInfoBase.economy_natureCN}}</div>
            </div>
          </li>

          <!-- 客户类型为事业法人时所需字段 -->
          <li class="readonly" v-if="customerInfoBase.cus_type=='202'">
            <div class="info-rows">
              <div class="info-name">举办单位</div>
              <div class="info-value">{{customerInfoBase.host_unit}}</div>
            </div>
          </li>
          <li class="readonly" v-if="customerInfoBase.cus_type=='202'">
            <div class="info-rows">
              <div class="info-name">经费来源</div>
              <div class="info-value">{{customerInfoBase.fund_source}}</div>
            </div>
          </li>

          <!-- 客户类型为民办非企业时所需字段 -->
          <li class="readonly" v-if="customerInfoBase.cus_type=='203' || customerInfoBase.cus_type=='205'">
            <div class="info-rows">
              <div class="info-name">业务主管单位</div>
              <div class="info-value">{{customerInfoBase.busi_unit}}</div>
            </div>
          </li>

          <!-- 客户类型为社会团体法人时所需字段 -->
          <li class="readonly" v-if="customerInfoBase.cus_type=='205'">
            <div class="info-rows">
              <div class="info-name">活动地域</div>
              <div class="info-value">{{customerInfoBase.activity_area}}</div>
            </div>
          </li>

        </ul>
      </div>
    </div>
    <div v-show="editing">
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
      <div 
        class="info-block longname"
        v-if="customerInfoBase.cus_type!='207' && customerInfoBase.cus_type!='208'"
      >
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
              <div 
                class="info-name"
                v-if="customerInfoBase.cus_type!='201' &&
                      customerInfoBase.cus_type!='202' &&
                      customerInfoBase.cus_type!='203'" 
              >注册资本<span class="required">*</span></div>
              <div 
                class="info-name" 
                v-if="customerInfoBase.cus_type=='201' || 
                      customerInfoBase.cus_type=='202' || 
                      customerInfoBase.cus_type=='203'"
              >开办资金<span class="required">*</span></div>
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
              <div class="info-value popupable"  @click="showTreePopup('industry', 'industry')">
                <span>{{customerInfoBase.industry}}</span>
                <span class="r">
                  <span v-show="!customerInfoBase.industry">点击选择</span> 
                  <span class="h-icon-arrow-right"></span>
                </span>
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

          <!-- 客户类型为企业非法人时所需字段 -->
          <li v-if="customerInfoBase.cus_type=='201'">
            <div class="info-area">
              <div class="info-name">兼营业务范围<span class="required">*</span></div>
              <div class="info-value">
                <textarea 
                  placeholder="请输入兼营业务范围" 
                  v-model="customerInfoBase.ccrl_work_range"
                  maxlength="500"
                  name="兼营业务范围" 
                  v-validate="'required'"
                >
                </textarea>
              </div>
            </div>
          </li>
          <li v-if="customerInfoBase.cus_type=='201'">
            <div class="info-rows">
              <div class="info-name">经济性质<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="economyNatureDicData" 
                  v-model="customerInfoBase.economy_nature"
                  name="经济性质" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>

          <!-- 客户类型为事业法人时所需字段 -->
          <li v-if="customerInfoBase.cus_type=='202'">
            <div class="info-rows">
              <div class="info-name">举办单位<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入举办单位" 
                  v-model="customerInfoBase.host_unit"
                  maxlength="50"
                  name="举办单位" 
                  v-validate="'required'"
                >
              </div>
            </div>
          </li>
          <li v-if="customerInfoBase.cus_type=='202'">
            <div class="info-area">
              <div class="info-name">经费来源<span class="required">*</span></div>
              <div class="info-value">
                <textarea 
                  placeholder="请输入经费来源" 
                  v-model="customerInfoBase.fund_source"
                  maxlength="500"
                  name="经费来源" 
                  v-validate="'required'"
                >
                </textarea>
              </div>
            </div>
          </li>

          <!-- 客户类型为民办非企业时所需字段 -->
          <li v-if="customerInfoBase.cus_type=='203' || customerInfoBase.cus_type=='205'">
            <div class="info-rows">
              <div class="info-name">业务主管单位<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入业务主管单位" 
                  v-model="customerInfoBase.busi_unit"
                  maxlength="50"
                  name="业务主管单位" 
                  v-validate="'required'"
                >
              </div>
            </div>
          </li>

          <!-- 客户类型为社会团体法人时所需字段 -->
          <li v-if="customerInfoBase.cus_type=='205'">
            <div class="info-rows">
              <div class="info-name">活动地域<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入活动地域" 
                  v-model="customerInfoBase.activity_area"
                  maxlength="50"
                  name="活动地域" 
                  v-validate="'required'"
                >
              </div>
            </div>
          </li>

        </ul>
      </div>
      <div class="btn-box">
        <a href="javascript:;" class="btn" @click="updateCusCorpBaseInfo">保存</a>
      </div>
    </div>
    <div class="edit h-icon-edit" v-show="!editing" @click="edit"></div>
    <select-tree :isShow="selectTreeShow" :type="treeType" :keycode="keycode" @select="selectTree"></select-tree>
  </div>
</template>

<script>
  import HSelect from '@/components/HSelect'
  import HDatepicker from '@/components/HDatepicker'
  import SelectTree from '@/client/popupList/SelectTree'
  import { mapState } from 'vuex'
  import { Toast, MessageBox } from 'mint-ui'
  import Server from '@/server'
  export default {
    data(){
      return {
        customerId: '',
        customerInfoBase: {},

        //编辑状态标识
        editing: false,

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
      economyNatureDicData(){ //经济性质
        let dicData = this.getDIC.STD_ORG_QLTY.value
        return _.pick(dicData, ['0005', '0006', '0007', '0008'])
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
    created(){
      this.customerId = this.$route.params.customerId
      this.getCusBaseInfo()
    },
    components: {
      HSelect,
      HDatepicker,
      SelectTree
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

      edit(){
        this.editing = true
      },

      //查询客户基本信息
      getCusBaseInfo(){
        if(this.customerId){
          let param = {cus_id: this.customerId}
          Server.customer.getCusCorpBasicInfo(param)
          .then(res => {
            this.customerInfoBase = res.returnData.CusComBase

            let baseInfo = this.customerInfoBase
            baseInfo.cert_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CERT_TYPE', baseInfo.cert_type)
            baseInfo.cus_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CUS_TYPE', baseInfo.cus_type)
            baseInfo.pay_tax_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_PAY_TAX_TYPE', baseInfo.pay_tax_type)
            baseInfo.cur_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_CUR_TYPE', baseInfo.cur_type)
            baseInfo.save_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_CUS_SAVE_STATUS', baseInfo.save_status)
            baseInfo.bus_natCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_CUS_ENT_PRO', baseInfo.bus_nat)
            baseInfo.if_agricultureCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_YES_NO', baseInfo.if_agriculture)
            baseInfo.cus_bus_featureCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_BUS_FEATURE', baseInfo.cus_bus_feature)
            baseInfo.com_mrk_flgCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_YES_NO', baseInfo.com_mrk_flg)
            baseInfo.in_industryCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_CUS_IN_INDUSTRY', baseInfo.in_industry)
            baseInfo.credit_mearCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_CUS_CREDIT_MEAR', baseInfo.credit_mear)
            baseInfo.economy_natureCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ORG_QLTY', baseInfo.economy_nature)

            //当客户建档时选择的“证件类型”是“统一社会信用代码”时，“统一社会信用代码”字段不可编辑
            if(baseInfo.cert_type == '08'){
              this.isAllInOneDisabled = true
            }

            //当证件类型为“其他”或者“组织机构代码时”时，统一社会信用代码为非必填  
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
                  Toast({
                    message: '保存成功',
                    position: 'middle',
                    iconClass: 'mintui mintui-success',
                    duration: 500
                  })
                  This.editing = false
                  This.getCusBaseInfo()
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
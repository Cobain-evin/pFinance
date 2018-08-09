<template>
  <div class="pad-foot">
    <div v-show="!editing">
      <div class="no-data" v-if="!customerInfoStock.length">没有数据</div>
      <div class="info-block" v-for="(item, index) in customerInfoStock" :key="index">
        <div class="info-title">股权信息{{index+1}}</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">出资人编号</div>
              <div class="info-value">{{item.invt_cus_id}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">出资人名称</div>
              <div class="info-value">{{item.invt_cus_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">出资金额</div>
              <div class="info-value">{{item.invt_amt}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">出资比例</div>
              <div class="info-value">{{item.invt_rate}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">是否控股</div>
              <div class="info-value">{{item.is_holdingCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">是否参与经营</div>
              <div class="info-value">{{item.if_manageCN}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="editing">
      <div class="info-block" v-for="(item,index) in customerInfoStock" :key="index">
        <div class="info-title">
          <span>股权信息{{index+1}}</span>
          <span class="delete h-icon-delete" @click="deleteStock(item.invt_cus_id, index)"></span>
        </div>
        <ul class="info-form">
          <li>
            <div class="info-rows">
              <div class="info-name">出资人编号<span class="required">*</span></div>
              <div class="info-value popupable" @click="showCustomerPopup(index)">
                <input 
                  type="text" 
                  v-model="item.invt_cus_id"
                  name="出资人编号" 
                  v-validate="'required'"
                  readonly
                  v-show="item.invt_cus_id"
                >
                <span class="r">
                  <span v-show="!item.invt_cus_id">点击选择</span> 
                  <span class="h-icon-arrow-right"></span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">出资人名称<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入出资人名称" 
                  v-model="item.invt_cus_name"
                  maxlength="50"
                  name="出资人名称" 
                  v-validate="'required'"
                  readonly
                >
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">出资金额<span class="required">*</span></div>
              <div class="info-value flexbox-sb">
                <input 
                  type="text" 
                  placeholder="请输入出资金额" 
                  v-model="item.invt_amt"
                  maxlength="50"
                  name="出资金额" 
                  v-validate="'required'"
                >
                <span>万元</span>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">出资比例<span class="required">*</span></div>
              <div class="info-value flexbox-sb">
                <input 
                  type="text" 
                  placeholder="请输入出资比例" 
                  v-model="item.invt_rate"
                  maxlength="50"
                  name="出资比例" 
                  v-validate="'required'"
                >
                <span>%</span>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">是否控股<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="yesOrNoDicData" 
                  v-model="item.is_holding"
                  name="是否控股" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">是否参与经营<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="yesOrNoDicData" 
                  v-model="item.if_manage"
                  name="是否参与经营" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="add-block" @click="addStock">
        <span class="h-icon-new"></span>新增股权信息
      </div>
      <div class="btn-box">
        <a class="btn" href="javascript:;" @click="updateStocksInfo">保存</a>
      </div>
    </div>
    <div class="edit h-icon-edit" v-show="!editing && !isOwnedBusi" @click="edit"></div>
    <select-customer 
      :isShow="selectCustomerShow" 
      :index="stockIndex" 
      @select="selectCustomer" 
      :type="popCustomerType"
    ></select-customer>
  </div>
</template>

<script>
  import HSelect from '@/components/HSelect'
  import SelectCustomer from '@/client/popupList/SelectCustomer'
  import { mapState } from 'vuex'
  import { Toast, MessageBox } from 'mint-ui'
  import Server from '@/server'
  export default {
    data(){
      return {
        //从url上获取customerId
        customerId: '',

        //股权信息列表
        customerInfoStock: [],

        //查询客户信息，确定是不是个体工商户，个体工商户不展示股权信息
        isOwnedBusi: false,

        //编辑状态标识
        editing: false,

        //查询客户的类型
        popCustomerType: null,

        //控制选择弹框展示
        selectCustomerShow: false,
        stockIndex: 0
      }
    },
    components: {
      HSelect,
      SelectCustomer
    },
    computed: {

      //字典项查询
      yesOrNoDicData(){ //是否项
        return this.getDIC.STD_ZX_YES_NO.value
      },
      accountTypeDicData(){ //账户类型
        return this.getDIC.STD_ZB_CUS_ACC_TYP.value
      },
      currencyTypeDicData(){ //币种
        return this.getDIC.STD_ZX_CUR_TYPE.value
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

    },
    created(){
      this.customerId = this.$route.params.customerId

      this.getCusBaseInfo()

      this.getCusStockInfo()
    },
    methods: {


      //查询客户基本信息
      getCusBaseInfo(){
        if(this.customerId){
          let param = {cus_id: this.customerId}
          Server.customer.getCusCorpBasicInfo(param)
          .then(res => {
            //判断是否个体工商户
            this.isOwnedBusi = res.returnData.CusComBase.cus_type == '210'
          })
        }
      },

      /*选择出资人客户*/
      showCustomerPopup(index){
        this.popCustomerType = 'stock'
        this.selectCustomerShow = true
        this.stockIndex = index
      },

      selectCustomer(customer){
        if(customer){
          let index = customer.index
          this.customerInfoStock[index].invt_cus_id = customer.cus_id
          this.customerInfoStock[index].invt_cus_name = customer.cus_name
          this.customerInfoStock[index].invt_cert_type = customer.cert_type
          this.customerInfoStock[index].invt_cert_code = customer.cert_code
        }
        this.selectCustomerShow = false
      },

      edit(){
        this.editing = true
        if(!this.customerInfoStock.length){
          this.addStock()
        }
      },

      getCusStockInfo(){
        if(this.customerId){
          let param = {
            'cus_id': this.customerId,
            'pageInfo.maxLine': 10,
            'pageInfo.targetPage': 1
          }
          Server.customer.getCusCorpStockInfo(param)
          .then(res => {
            this.customerInfoStock = res.returnData.CusEquityInfoList

            if(this.customerInfoStock.length){
              _.forEach(this.customerInfoStock, item => {
                item.is_holdingCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_YES_NO', item.is_holding)
                item.if_manageCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_YES_NO', item.if_manage)
                item.isNew = false
              })
            }

          })
        }
      },

      //增加一条股权信息
      addStock(){
        this.customerInfoStock.push({
          "isNew": true,
          "cus_id": this.customerId,  //客户编号
          "invt_cus_id": '',  //出资人客户编号
          "invt_cus_name": '',  //出资人名称
          "invt_cert_type": '', //出资人证件类型
          "invt_cert_code": '', //出资人证件号码
          "cur_type": '', //币种
          "invt_amt": '', //出资金额（万元）
          "invt_rate": '',  //出资比例
          "invt_way": '', //出资方式
          "if_manage": '',  //是否参与经营
          "is_holding": '', //是否控股
          "remark": '', //备注
          "ctrl_per_relation": '',  //与实际控制人关系
          "flag": ''
        })
      },

      //提交股权信息
      updateStocksInfo(){
        let This = this
        let stocks = This.customerInfoStock
        let n = 0, l = stocks.length;
        
        if(!stocks.length){
          This.editing = false
          return
        }
        
        //每条股权信息发送一次新增/更新请求，需要发送多次，这里使用递归
        //某一次请求抛出错误时，即停止后面的请求，所有请求都正确返回时，弹出成功提示框
        This.$validator.validate()
        .then(result => {
          if(result){ //校验通过
            updateStock()
          }
          else{ //校验不通过
            if(This.$validator.errors.items.length){
              MessageBox.alert(This.$validator.errors.items[0].msg)
            }
          }
        })

        function updateStock(){
          let item = stocks[n]
          let param = {
            "CusEquityInfo.cus_id": This.customerId,
            "CusEquityInfo.invt_cus_id": item.invt_cus_id,
            "CusEquityInfo.invt_cus_name": item.invt_cus_name,
            "CusEquityInfo.invt_cert_type": item.invt_cert_type,
            "CusEquityInfo.invt_cert_code": item.invt_cert_code,
            "CusEquityInfo.cur_type": item.cur_type,
            "CusEquityInfo.invt_amt": item.invt_amt,
            "CusEquityInfo.invt_rate": item.invt_rate,
            "CusEquityInfo.invt_way": item.invt_way,
            "CusEquityInfo.if_manage": item.if_manage,
            "CusEquityInfo.is_holding": item.is_holding,
            "CusEquityInfo.remark": item.remark,
            "CusEquityInfo.ctrl_per_relation": item.ctrl_per_relation,
            "CusEquityInfo.flag": item.flag
          }
          if(item.isNew){
            Server.customer.addStockInfo(param)
            .then(res => {
              if(res.returnCode == '000'){
                n++
                if(n >= l){
                  Toast({
                    message: '保存成功',
                    position: 'middle',
                    iconClass: 'mintui mintui-success',
                    duration: 500
                  })
                  This.editing = false
                  This.getCusStockInfo()
                }
                else{
                  updateStock()
                }
                
              }
              else{
                MessageBox.alert('股权信息'+ (n+1) +'：'+ res.returnMsg)
              }
            })
          }
          else{
            Server.customer.updateStockInfo(param)
            .then(res => {
              if(res.returnCode == '000'){
                n++
                if(n >= l){
                  Toast({
                    message: '保存成功',
                    position: 'middle',
                    iconClass: 'mintui mintui-success',
                    duration: 500
                  })
                  This.editing = false
                  This.getCusStockInfo()
                }
                else{
                  updateStock()
                }
                
              }
              else{
                MessageBox.alert('股权信息'+ (n+1) +'：'+ res.returnMsg)
              }
            })
          }
        }
      },

      //删除股权信息
      deleteStock(invtCusId, index){
        let This = this
        MessageBox.confirm('确定删除此条股权信息？')
        .then(action => {
          if(invtCusId){
            let param = {
              "CusEquityInfo.cus_id": this.customerId,
              "CusEquityInfo.invt_cus_id": invtCusId
            }
            Server.customer.deleteCusCorpStockInfo(param)
            .then(res => {
              if(res.returnCode == '000'){
                Toast({
                  message: '删除成功',
                  position: 'middle',
                  iconClass: 'mintui mintui-success',
                  duration: 500
                })
                This.editing = false
                This.getCusStockInfo()
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
            })
          }
          else{
            This.customerInfoStock.splice(index, 1)
          }
        })
        .catch(e => {})
        
      }


    }
  }
</script>
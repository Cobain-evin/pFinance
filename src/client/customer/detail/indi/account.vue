<template>
  <div class="pad-foot">
    <div v-show="!editing">
      <div class="no-data" v-if="!customerInfoAccount.length">没有数据</div>
      <div class="info-block" v-for="(item, index) in customerInfoAccount" :key="index">
        <div class="info-title">账户信息</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">开户银行编号</div>
              <div class="info-value">{{item.recv_bank_id}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">开户行名称</div>
              <div class="info-value">{{item.recv_bank_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">银行地址</div>
              <div class="info-value">{{item.recv_bank_addr}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">账户名称</div>
              <div class="info-value">{{item.recv_acct_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">账号</div>
              <div class="info-value">{{item.recv_acct_no}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">账户类型</div>
              <div class="info-value">{{item.recv_acct_typeCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">币种</div>
              <div class="info-value">{{item.cur_typeCN}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="editing">
      <div class="info-block" v-for="(item, index) in customerInfoAccount" :key="index">
        <div class="info-title">
          <span>账户信息{{index+1}}</span>
          <span class="delete h-icon-delete" @click="deleteAccount(item.recv_acct_no, index)"></span>
        </div>
        <ul class="info-form">
          <li>
            <div class="info-rows">
              <div class="info-name">开户银行编号<span class="required">*</span></div>
              <div class="info-value popupable"  @click="showBankPopup(index)">
                <input 
                  type="text" 
                  v-model="item.recv_bank_id"
                  name="开户银行编号" 
                  v-validate="'required'"
                  readonly
                  v-show="item.recv_bank_id"
                >
                <span class="r">
                  <span v-show="!item.recv_bank_id">点击选择</span> 
                  <span class="h-icon-arrow-right"></span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">开户行名称<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入开户行名称" 
                  v-model="item.recv_bank_name"
                  maxlength="50"
                  name="开户行名称" 
                  v-validate="'required'"
                  readonly
                >
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">银行地址<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入银行地址" 
                  v-model="item.recv_bank_addr"
                  maxlength="50"
                  name="银行地址" 
                  v-validate="'required'"
                  readonly
                >
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">账户名称<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入账号名称" 
                  v-model="item.recv_acct_name"
                  maxlength="50"
                  name="账户名称" 
                  v-validate="'required'"
                  readonly
                >
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">账号<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="tel" 
                  placeholder="请输入账号" 
                  v-model="item.recv_acct_no"
                  maxlength="50"
                  name="账号" 
                  v-validate="'required'"
                  @keydown="saveOldAccount(item)"
                >
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">账户类型<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="accountTypeDicData" 
                  v-model="item.recv_acct_type"
                  name="账户类型" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">币种<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="currencyTypeDicData" 
                  v-model="item.cur_type"
                  name="币种" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="add-block" @click="addAccount">
        <span class="h-icon-new"></span>新增账户信息
      </div>
      <div class="btn-box">
        <a class="btn" href="javascript:;" @click="updateAccountsInfo">保存</a>
      </div>
    </div>
    <div class="edit h-icon-edit" v-show="!editing" @click="edit"></div>
    <select-bank :isShow="selectBankShow" :index="accountIndex" @select="selectBank"></select-bank>
  </div>
</template>

<script>
  import HSelect from '@/components/HSelect'
  import SelectBank from '@/client/popupList/SelectBank'
  import Server from '@/server'
  import { mapState } from 'vuex'
  import { Toast, MessageBox } from 'mint-ui'
  export default {
    data(){
      return {
        //从url上获取customerId
        customerId: '',
        //用customerId获取customerName，用来提交“更新/新增账户信息”接口
        customerName: '',

        //账户列表
        customerInfoAccount: [],

        //控制选择弹框展示
        selectBankShow: false,
        accountIndex: 0,

        //编辑状态标识
        editing: false
      }
    },
    computed: {

      //字典项查询
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
      })

    },
    components: {
      HSelect,
      SelectBank
    },
    created(){
      this.customerId = this.$route.params.customerId
      
      this.getCusBaseInfo()
      this.getCusAccountInfo()
    },
    methods: {

      //选择银行
      showBankPopup(index){
        this.selectBankShow = true
        this.accountIndex = index
      },

      selectBank(bank){
        if(bank){
          let index = bank.index
          this.customerInfoAccount[index].recv_bank_id = bank.bank_id
          this.customerInfoAccount[index].recv_bank_name = bank.bank_name
          this.customerInfoAccount[index].recv_bank_addr = bank.bank_province + bank.bank_city
        }
        this.selectBankShow = false
      },

      //获取用户基本信息
      getCusBaseInfo(){
        if(this.customerId){
          let param = {cus_id: this.customerId}
          Server.customer.getCusIndiBasicInfo(param)
          .then(res => {
            this.customerName = res.returnData.CusIndivBase.cus_name
          })
        }
      },

      //获取账户信息
      getCusAccountInfo(){
        if(this.customerId){
          let param = {
            'cus_id': this.customerId,
            'pageInfo.maxLine': 10,
            'pageInfo.targetPage': 1
          }
          Server.customer.getCusAccountInfo(param)
          .then(res => {
            this.customerInfoAccount = res.returnData.CusSetAccList

            _.forEach(this.customerInfoAccount, item => {
              //账户姓名默认为客户本人，且不可修改
              item.recv_acct_name = this.customerName

              item.recv_acct_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_CUS_ACC_TYP', item.recv_acct_type)
              item.cur_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_CUR_TYPE', item.cur_type)
              item.isNew = false
              item.or_recv_acct_no = null
            })
          })
        }
      },

      edit(){
        this.editing = true
        if(!this.customerInfoAccount.length){
          this.addAccount()
        }
      },

      saveOldAccount(item){
        if(!item.or_recv_acct_no){
          item.or_recv_acct_no = item.recv_acct_no
        }
      },

      //增加一条账户信息
      addAccount(){
        this.customerInfoAccount.push({
          "isNew": true,  //标识
          "id": '', //id
          "cus_id": this.customerId, //客户编号
          "recv_bank_id": '',  //开户银行编号
          "recv_bank_name": '', //开户银行名称
          "recv_bank_addr": '', //银行地址
          "recv_bank_area": '',  //开户地区
          "cus_name": this.customerName,  //客户名称
          "recv_acct_name": this.customerName, //账户名称
          "recv_acct_no": '', //账号
          "recv_acct_type": '', //账户类型
          "cur_type": '',  //币种
          "if_default_acc": '2',
          "or_recv_acct_no": null
        })
      },


      //提交账户信息
      updateAccountsInfo(){
        let This = this
        let accounts = This.customerInfoAccount
        let n = 0, l = accounts.length;

        if(!accounts.length){
          This.editing = false
          return
        }

        //每条账户信息发送一次新增/更新请求，需要发送多次，这里使用递归
        //某一次请求抛出错误时，即停止后面的请求，所有请求都正确返回时，弹出成功提示框
        This.$validator.validate()
        .then(result => {
          if(result){ //校验通过
            updateAccount()
          }
          else{ //校验不通过
            if(This.$validator.errors.items.length){
              MessageBox.alert(This.$validator.errors.items[0].msg)
            }
          }
        })

        function updateAccount(){
          let item = accounts[n]
          let param = {
            "CusSetAcc.id": item.id,
            "CusSetAcc.cus_id": This.customerId,
            "CusSetAcc.recv_bank_name": item.recv_bank_name,
            "CusSetAcc.recv_acct_name": item.recv_acct_name,
            "CusSetAcc.recv_acct_no": item.recv_acct_no,
            "CusSetAcc.cur_type": item.cur_type,
            "CusSetAcc.cus_name": This.customerName,
            "CusSetAcc.recv_acct_type": item.recv_acct_type,
            "CusSetAcc.recv_bank_id": item.recv_bank_id,
            "CusSetAcc.recv_bank_addr": item.recv_bank_addr,
            "CusSetAcc.recv_bank_area": item.recv_bank_area,
            "CusSetAcc.if_default_acc": item.if_default_acc ? item.if_default_acc : '2'
          }
          if(item.isNew){
            Server.customer.addAccountInfo(param)
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
                  This.getCusAccountInfo()
                }
                else{
                  updateAccount()
                }
                
              }
              else{
                MessageBox.alert('账户信息'+ (n+1) +'：'+ res.returnMsg)
              }
            })
          }
          else{
            Server.customer.updateAccountInfo(param)
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
                  This.getCusAccountInfo()
                }
                else{
                  updateAccount()
                }
                
              }
              else{
                MessageBox.alert('账户信息'+ (n+1) +'：'+ res.returnMsg)
              }
            })
          }
        }
      },


      //删除账户信息
      deleteAccount(recvAcctNo, index){
        let This = this
        let param = {
          "CusSetAcc.cus_id": This.customerId,
          "CusSetAcc.recv_acct_no": recvAcctNo
        }
        MessageBox.confirm('确定删除此条账户信息？')
        .then(action => {
          if(recvAcctNo){
            Server.customer.deleteCusAccountInfo(param)
            .then(res => {
              if(res.returnCode == '000'){
                Toast({
                  message: '删除成功',
                  position: 'middle',
                  iconClass: 'mintui mintui-success',
                  duration: 500
                })
                This.editing = false
                This.getCusAccountInfo()
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
            })
          }
          else{
            This.customerInfoAccount.splice(index, 1)
          }
        })
        .catch(e => {})
      }




    }
  }
</script>
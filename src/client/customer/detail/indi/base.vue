<template>
  <div class="pad-foot">
    <div v-show="!editing">
      <div class="info-block">
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
              <div class="info-name">性别</div>
              <div class="info-value">{{customerInfoBase.sexCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">出生日期</div>
              <div class="info-value">{{customerInfoBase.birth_date}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">手机号码</div>
              <div class="info-value">{{customerInfoBase.contact_phone}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title">地址信息</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">户籍所在地</div>
              <div class="info-value">{{customerInfoBase.locationScale}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">详细地址</div>
              <div class="info-value">{{customerInfoBase.locationDetail}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">个人通讯地址</div>
              <div class="info-value">{{customerInfoBase.post_addrScale}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">详细地址</div>
              <div class="info-value">{{customerInfoBase.post_addrDetail}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">邮政编码</div>
              <div class="info-value">{{customerInfoBase.loc_code}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="editing">
      <div class="info-block">
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
          <li>
            <div class="info-rows">
              <div class="info-name">性别<span class="required">*</span></div>
              <div class="info-value">
                <h-select :options="sexDicData" v-model="customerInfoBase.sex"></h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">出生日期<span class="required">*</span></div>
              <div class="info-value">
                <h-datepicker 
                  v-model="customerInfoBase.birth_date"
                  name="出生日期" 
                  v-validate="'required'"
                >
                </h-datepicker>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">手机号码<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="tel" 
                  placeholder="请输入手机号码" 
                  v-model="customerInfoBase.contact_phone"
                  maxlength="11"
                  name="手机号码" 
                  v-validate="'required|phone'"
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title">地址信息</div>
        <ul class="info-form">
          <li>
            <div class="info-rows">
              <div class="info-name">户籍所在地<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入户籍所在地（省市）" 
                  v-model="customerInfoBase.locationScale"
                  maxlength="50"
                  name="户籍所在地" 
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
                  v-model="customerInfoBase.locationDetail"
                  maxlength="50"
                  name="户籍所在地详细地址" 
                  v-validate="'required'"
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li>
            <div class="info-rows">
              <div class="info-name">个人通讯地址<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入个人通讯地址（省市）" 
                  v-model="customerInfoBase.post_addrScale"
                  maxlength="50"
                  name="个人通讯地址" 
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
                  v-model="customerInfoBase.post_addrDetail"
                  maxlength="50"
                  name="个人通讯地址详细地址" 
                  v-validate="'required'"
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-block">
        <div class="info-title"></div>
        <ul class="info-form">
          <li>
            <div class="info-rows">
              <div class="info-name">邮政编码<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="tel" 
                  placeholder="请输入邮政编码" 
                  v-model="customerInfoBase.loc_code"
                  maxlength="6"
                  name="邮政编码" 
                  v-validate="'required'"
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn-box">
        <a class="btn" href="javascript:;" @click="updateCusIndiBaseInfo">保存</a>
      </div>
    </div>
    <div class="edit h-icon-edit" v-show="!editing" @click="edit"></div>
  </div>
</template>

<script>
  import HSelect from '@/components/HSelect'
  import HDatepicker from '@/components/HDatepicker'
  import Server from '@/server'
  import { mapState } from 'vuex'
  import { Toast, MessageBox } from 'mint-ui'
  export default {
    data(){
      return {
        customerInfoBase: {},

        //编辑状态标识
        editing: false
      }
    },
    computed: {

      //字典项查询
      sexDicData(){ //性别
        return this.getDIC.STD_ZX_SEX.value
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
          "CusIndivBase.cus_id": this.customerInfoBase.cus_id,
          "CusIndivBase.cus_name": this.customerInfoBase.cus_name,
          "CusIndivBase.cus_type": this.customerInfoBase.cus_type,
          "CusIndivBase.cert_type": this.customerInfoBase.cert_type,
          "CusIndivBase.cert_code": this.customerInfoBase.cert_code,
          "CusIndivBase.sex": this.customerInfoBase.sex,
          "CusIndivBase.birth_date": this.customerInfoBase.birth_date,
          "CusIndivBase.contact_phone": this.customerInfoBase.contact_phone,
          "CusIndivBase.location": this.$strAction.getJoinedAddress(this.customerInfoBase.locationScale, this.customerInfoBase.locationDetail),
          "CusIndivBase.generally_loc": this.customerInfoBase.generally_loc,
          "CusIndivBase.work_address": this.customerInfoBase.work_address,
          "CusIndivBase.post_addr": this.$strAction.getJoinedAddress(this.customerInfoBase.post_addrScale, this.customerInfoBase.post_addrDetail),
          "CusIndivBase.loc_code": this.customerInfoBase.loc_code,
        }
      }
    },
    components: {
      HSelect,
      HDatepicker
    },
    created(){
      this.getCusBaseInfo()
    },
    methods: {
      getCusBaseInfo(){
        let customerId = this.$route.params.customerId
        if(customerId){
          let param = {cus_id: customerId}
          Server.customer.getCusIndiBasicInfo(param)
          .then(res => {
            this.customerInfoBase = res.returnData.CusIndivBase
            let baseInfo = this.customerInfoBase

            /*对一些字段的返回值做处理（根据code查找对应中文名称、截取字段等操作）*/
            baseInfo.sexCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_SEX', baseInfo.sex)
            baseInfo.cert_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CERT_TYPE', baseInfo.cert_type)
            baseInfo.cus_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_CUS_TYPE', baseInfo.cus_type)
            
            baseInfo.locationScale = this.$strAction.getAddress(baseInfo.location)[0]
            baseInfo.locationDetail = this.$strAction.getAddress(baseInfo.location)[1]
            baseInfo.post_addrScale = this.$strAction.getAddress(baseInfo.post_addr)[0]
            baseInfo.post_addrDetail = this.$strAction.getAddress(baseInfo.post_addr)[1]
          })
        }
      },

      edit(){
        this.editing = true
      },

      //更新客户基本信息
      updateCusIndiBaseInfo(){
        let This = this
        This.$validator.validate()
        .then(result => {
          if(result){ //校验通过
            Server.customer.updateCusIndiBaseInfo(This.param)
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
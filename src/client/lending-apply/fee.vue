<template>
  <div>
    <div class="no-data" v-if="!lendingApplyFeeList.length">没有数据</div>
    <div class="info-block longname" v-for="(item, index) in lendingApplyFeeList" :key="index">
      <div class="info-title"></div>
      <ul class="info-form canFold" :class="{'folded': !item.isShow}">
        <li class="readonly" @click="showOrHide(item)">
          <div class="info-rows">
            <div class="info-name">{{item.fee_typeCN}}</div>
            <div class="info-value">
              <span :class="{'green': item.rec_status=='2'}">
                <!-- 如果已收费，就显示已收费，否则显示预计收费日期 -->
                {{item.rec_status=='2' ? item.rec_statusCN : item.fin_charge_date}}
              </span>
              <span class="h-icon-arrow-right"></span>
            </div>
            <span style="display:none;">{{flag}}</span>
          </div>
        </li>
        <li class="sub-info-box">
          <ul>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">付费主体</div>
                <div class="info-value">{{item.pay_flag_name}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">收费机构</div>
                <div class="info-value">{{item.charge_org_displayname}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">收费金额</div>
                <div class="info-value">{{item.charge_amt}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">收费情况</div>
                <div class="info-value">{{item.rec_statusCN}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">已收费用</div>
                <div class="info-value">{{item.rec_amt}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">预计收费日期</div>
                <div class="info-value">{{item.fin_charge_date}}</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Server from '@/server'
  import { MessageBox } from 'mint-ui'
  import { mapState } from 'vuex'
  export default {
    data(){
      return {
        loanNo: null,
        lendingApplyFeeList: [],
        flag: false
      }
    },
    computed: {
      param(){
        return {
          "pageInfo.maxLine": 20,
          "pageInfo.targetPage": 1,
          "loan_no": this.loanNo
        }
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
    created(){
      this.loanNo = this.$route.params.serno
      this.getLendingApplyFeeList()
    },
    methods: {

      //获取放款申请费用信息列表
      getLendingApplyFeeList(){
        Server.lendingApply.getLendingApplyFeeList(this.param)
        .then(res => {
          if(res.returnCode == '000'){
            if(res.returnData && res.returnData.PvpFeePlanList.length){
              this.lendingApplyFeeList = res.returnData.PvpFeePlanList

              _.forEach(this.lendingApplyFeeList, item => {
                item.isShow = false
                item.rec_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_FEE_REC_STATUS', item.rec_status)
                item.fee_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'FNC_FEE_TYPE_CONF', item.fee_type)
              })
            }
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      },


      //列表展开/隐藏
      showOrHide(item){
        item.isShow = !item.isShow;
        this.flag = !this.flag;
      }

    }
  }
</script>
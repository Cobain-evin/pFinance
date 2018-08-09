<template>
  <div>

    <!-- 抵质押登记 -->
    <div class="info-block">
      <div class="info-title">抵质押登记信息</div>
      <ul class="info-form" v-if="!mortgageRegisterList.length">
        <li>
          <div class="no-data">没有数据</div>
        </li>
      </ul>
      <ul 
        class="info-form canFold" 
        :class="{'folded': !item.isShow}"
        v-for="(item, index) in mortgageRegisterList" 
        :key="index"
      >
        <li class="readonly" @click="showOrHide(item)">
          <div class="info-rows">
            <div class="info-name">物品名称</div>
            <div class="info-value">
              {{item.item_name}}
              <span class="h-icon-arrow-right"></span>
            </div>
            <span style="display:none;">{{flag}}</span>
          </div>
        </li>
        <div class="sub-info sub-info-box">
          <div class="info-rows">
            <div class="info-name">登记证明编号</div>
            <div class="info-value">{{item.prove_code}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">登记机关</div>
            <div class="info-value">{{item.place}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">抵押顺位</div>
            <div class="info-value">{{item.sequenceCN}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">办理登记日期</div>
            <div class="info-value">{{item.handle_date}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">登记状态</div>
            <div class="info-value">{{item.register_statusCN}}</div>
          </div>
        </div>
      </ul>
    </div>

    <!-- 验票登记 -->
    <div class="info-block">
      <div class="info-title">验票登记信息</div>
      <ul class="info-form" v-if="!billList.length">
        <li>
          <div class="no-data">没有数据</div>
        </li>
      </ul>
      <ul 
        class="info-form canFold" 
        :class="{'folded': !item.isShow}"
        v-for="(item, index) in billList" 
        :key="index"
      >
        <li class="readonly" @click="showOrHide(item)">
          <div class="info-rows">
            <div class="info-name">票号</div>
            <div class="info-value">
              {{item.bill_id}}
              <span class="h-icon-arrow-right"></span>
            </div>
            <span style="display:none;">{{flag}}</span>
          </div>
        </li>
        <div class="sub-info sub-info-box">
          <div class="info-rows">
            <div class="info-name">验票专员</div>
            <div class="info-value">{{item.transactor}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">验票日期</div>
            <div class="info-value">{{item.handle_date}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">是否同城</div>
            <div class="info-value">{{item.check_placeCN}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">登记状态</div>
            <div class="info-value">{{item.register_statusCN}}</div>
          </div>
        </div>
      </ul>
    </div>

    <!-- 应收账款登记 -->
    <div class="info-block">
      <div class="info-title">应收账款登记信息</div>
      <ul class="info-form" v-if="!receivableList.length">
        <li>
          <div class="no-data">没有数据</div>
        </li>
      </ul>
      <ul 
        class="info-form canFold" 
        :class="{'folded': !item.isShow}"
        v-for="(item, index) in receivableList" 
        :key="index"
      >
        <li class="readonly" @click="showOrHide(item)">
          <div class="info-rows">
            <div class="info-name">登记编号</div>
            <div class="info-value">
              {{item.register_id}}
              <span class="h-icon-arrow-right"></span>
            </div>
            <span style="display:none;">{{flag}}</span>
          </div>
        </li>
        <div class="sub-info sub-info-box">
          <div class="info-rows">
            <div class="info-name">登记证明编号</div>
            <div class="info-value">{{item.prove_code}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">修改码</div>
            <div class="info-value">{{item.modify_code}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">登记机关</div>
            <div class="info-value">{{item.place}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">登记证明文件</div>
            <div class="info-value"></div>
          </div>
          <div class="info-rows">
            <div class="info-name">登记状态</div>
            <div class="info-value">{{item.statusCN}}</div>
          </div>
        </div>
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

        //抵质押登记
        mortgageRegisterList: [],

        //验票登记
        billList: [],

        //应收账款登记
        receivableList: [],

        //其他登记
        otherList: [],

        flag: false
      }
    },
    computed: {
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
      this.getRegisterList()
    },
    methods: {

      //获取所有登记列表信息
      getRegisterList(){
        Server.lendingApply.getLendingApplyRegInfo({
          "loan_no": this.loanNo,
          "type": 'CtrMortgageRegisterR1,CtrMortgageRegisterR2,CtrReceivablesRegister,CtrLeaseItemRegister'
        })
        .then(res => {
          if(res.returnCode == '000'){

            //抵质押登记
            this.mortgageRegisterList = res.returnData.DZYList
            _.forEach(this.mortgageRegisterList, item => {
              item.isShow = false
              item.sequenceCN = this.$dicAction.getCnNameByCode(this.getDIC, 'CTR_MORTGAGE_REGISTER_SEQUENCE', item.sequence)
              item.register_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_GAGE_REGISTER_STATUS', item.register_status)
            })

            //验票登记
            this.billList = res.returnData.PJList
            _.forEach(this.billList, item => {
              item.isShow = false
              item.check_placeCN = this.$dicAction.getCnNameByCode(this.getDIC, 'CTR_MORTGAGE_CHECK_PLACE', item.check_place)
              item.register_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_GAGE_REGISTER_STATUS', item.register_status)
            })

            //应收还款登记
            this.receivableList = res.returnData.YSZList
            _.forEach(this.receivableList, item => {
              item.isShow = false
              item.statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_REC_REG_STATUS', item.status)
            })

            //其他登记
            this.otherList = res.returnData.QTList
            _.forEach(this.otherList, item => {
              item.isShow = false
            })

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
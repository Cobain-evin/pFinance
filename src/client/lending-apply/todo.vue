<template>
  <div>
    <div class="no-data" v-if="!lendingApplyTodoList.length">没有数据</div>
    <div class="info-block" v-for="(item, index) in lendingApplyTodoList" :key="index">
      <div class="info-title"></div>
      <ul class="info-form canFold" :class="{'folded': !item.isShow}">
        <li class="readonly" @click="showOrHide(item)">
          <div class="info-rows">
            <div class="info-name">追控编号</div>
            <div class="info-value">
              {{item.control_id}}
              <span class="h-icon-arrow-right"></span>
            </div>
            <span style="display:none;">{{flag}}</span>
          </div>
        </li>
        <li class="sub-info-box">
          <ul>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">落实人</div>
                <div class="info-value">{{item.operator_id_displayname}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">是否落实</div>
                <div class="info-value">{{item.op_statusCN}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">确认人</div>
                <div class="info-value">{{item.confirmer_id_displayname}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">是否确认</div>
                <div class="info-value">{{item.confirm_statusCN}}</div>
              </div>
            </li>
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">追控事项</div>
                <div class="info-value">{{item.items}}</div>
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
        lendingApplyTodoList: [],

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
      this.getLendingApplyTodoInfo()
    },
    methods: {

      //获取放款申请待落实事项信息
      getLendingApplyTodoInfo(){
        Server.lendingApply.getLendingApplyRegInfo({
          "loan_no": this.loanNo,
          "type": 'PvpItemsControl' //追控事项
        })
        .then(res => {
          if(res.returnCode == '000'){
            if(res.returnData && res.returnData.PvpItemsControlList.length){
              this.lendingApplyTodoList = res.returnData.PvpItemsControlList

              _.forEach(this.lendingApplyTodoList, item => {
                item.isShow = false
                item.op_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_YES_NO', item.op_status)
                item.confirm_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZX_YES_NO', item.confirm_status)
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
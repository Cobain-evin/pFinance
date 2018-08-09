<template>
  <div class="pad-foot">
    <div class="info-block" v-if="handle=='true'">
      <div class="info-title"></div>
      <ul class="info-form">
        <li>
          <div class="info-rows">
            <div class="info-name">审批意见<span class="required">*</span></div>
            <div class="info-value">
              <h-radio 
                :options="approvalOpinionList" 
                v-model="wfInfo.result"
                name="审批意见" 
                v-validate="'required'"
              ></h-radio>
            </div>
          </div>
        </li>
        <li v-if="wfInfo.result=='30' || wfInfo.result=='40'">
          <div class="info-rows">
            <div class="info-name">打回类型<span class="required">*</span></div>
            <div class="info-value">
              <h-select 
                :options="cbTypeDicData"
                v-model="wfInfo.cbType"
                name="打回类型" 
                v-validate="'required'"
              >
              </h-select>
            </div>
          </div>
        </li>
        <li v-if="isRemarkReasonShow && wfInfo.result=='20'">
          <div class="info-rows">
            <div class="info-name">否决原因<span class="required">*</span></div>
            <div class="info-value">
              <h-select
                :options="disagreeTypeDicData"
                v-model="wfInfo.remark_reason"
                name="否决原因" 
                v-validate="'required'"
              ></h-select>
            </div>
          </div>
        </li>
        <li>
          <div class="info-area">
            <div class="info-name">
              补充意见<span v-if="wfInfo.result && wfInfo.result!=='10'" class="required">*</span>
            </div>
            <div class="info-value">
              <textarea 
                v-model="wfInfo.encode_op"
                placeholder="请输入" 
                maxlength="500"
                name="补充意见" 
                v-validate="{'required': wfInfo.result && wfInfo.result!=='10'}"
              >
              </textarea>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block">
      <div class="info-title">审批历史</div>
      <ul class="flow-list">
        <li v-for="(item, index) in adviceList" :key="index">
          <div class="name">{{item.name}}</div>
          <div class="dep">{{item.dep}}</div>
          <div class="detail">
            <div class="approval">
              <span class="opinion" :class="{'green': item.conclusion=='10'}">{{item.conclusionCN}}</span>
              <span class="time">{{item.time}}</span>
            </div>
            <div class="advice">{{item.advice}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-box" v-if="handle=='true'">
      <a class="btn" @click="submit">提交</a>
    </div>
  </div>
</template>

<script>
  import Server from '@/server'
  import HRadio from '@/components/HRadio'
  import HSelect from '@/components/HSelect'
  import WF from '@/lib/workflow'
  import { mapState } from 'vuex'
  import { MessageBox } from 'mint-ui'
  export default {
    data(){
      return {

        //判断是从任务列表点查看还是处理过来的
        handle: null,

        //提交时所需参数
        wfInfo: {
          "encode_op": null,
          "result": null,
          "flowFlag": 1,
          "chkType": 1,
          "subType": 1,
          "from": 'todo'
        },

        //审批意见选项
        approvalOpinionList: {},

        adviceList: [],

        //当前流程的nodeids如果在下列之中，流程打回时就会有“否决原因”字段
        nodeids: '170_a14,260_a12,260_a62,260_a32,257_a17,258_a5,258_a42,258_a17,258_a30,258_a12,258_a14,255_a12,255_a18,255_a32,256_a17,256_a14,256_a42,254_a61,254_a62,259_a42,259_a32,171_a17,171_a12,171_a5,245_a42,245_a12,245_a5,173_a5,173_a53,173_a62,176_a4,244_a42,244_a14,209_a35,209_a12,209_a5,210_a53,211_a54,211_a18,233_a12,242_a12,247_a12,276_a6,276_a7,276_a53,286_a42,285_a11,285_a14,180_a53,260_a14,257_a6,257_a5,257_a12,258_a32,255_a6,255_a14,256_a12,256_a32,254_a42,254_a14,254_a12,254_a18,259_a62,259_a53,171_a53,171_a61,245_a17,173_a12,173_a14,173_a17,174_a12,244_a12,244_a35,209_a53,210_a14,211_a5,211_a53,212_a4,213_a14,233_a18,247_a17,276_a14,276_a18,286_a14,286_a5,285_a12,285_a35,285_a5,180_a35,180_a30,170_a12,170_a17,260_a15,260_a54,257_a42,257_a18,257_a14,258_a6,258_a18,255_a5,254_a17,259_a12,227_a3,171_a32,171_a35,171_a62,245_a61,245_a7,173_a54,174_a14,209_a62,209_a54,209_a14,209_a17,209_a7,210_a62,210_a5,210_a12,211_a12,213_a35,233_a5,247_a18,276_a12,286_a12,285_a53,285_a17,285_a6,170_a61,170_a62,257_a30,256_a53,256_a30,256_a18,256_a5,259_a14,259_a17,259_a30,245_a14,244_a61,244_a15,210_a7,211_a61,211_a17,213_a6,213_a17,233_a14,276_a5,276_a62,170_a53,170_a35,257_a32,258_a61,258_a35,255_a61,255_a17,255_a54,256_a35,254_a7,259_a5,171_a31,171_a14,173_a61,244_a17,244_a5,210_a17,211_a14,213_a53,213_a18,247_a53,276_a17,286_a18,286_a53,286_a62,286_a61,286_a30,285_a15,285_a19,170_a30,170_a18,260_a61,260_a17,260_a35,257_a35,257_a61,257_a62,254_a5,254_a32,259_a61,259_a35,173_a6,174_a18,174_a17,211_a32,233_a53,247_a35,285_a7,260_a5,260_a18,258_a62,255_a62,259_a18,171_a18,245_a54,173_a18,174_a35,244_a18,209_a18,210_a6,210_a35,210_a18,211_a62,233_a17,242_a11,285_a18,227_a4,227_a5,245_a62,245_a18,173_a35,176_a7,177_a5,209_a61,210_a61,211_a35,211_a30,213_a30,213_a15,242_a8,276_a61,286_a17,260_a42',
        //“否决原因”字段展示标识
        isRemarkReasonShow: false
      }
    },
    computed: {

      //字典项查询
      scspjlDicData(){ //审批意见
        return this.getDIC.SCSPJL.value
      },
      cbTypeDicData(){ //打回类型
        return this.getDIC.STD_CALLBACK_TYPE.value
      },
      disagreeTypeDicData(){ //打回类型
        return this.getDIC.STD_ZB_DISAGREE_KIND.value
      },

      ...mapState({
        getWfInfo: state => {
          return state.wfInfo
        },
        getDIC: state => {
          let localData = JSON.parse(localStorage.getItem('DIC'))
          if(state.DIC==={} && localData){
            this.$tore.commit('updateDic', localData)
          }
          return state.DIC
        },
        getEMP_SID: state => {
          /**
           * 判断state中是否保存有tempEMP_SID
           * 如果是，说明当前是以虚户在操作，EMP_SID取state中的tempEMP_SID
           * 如果否，说明当前是一主户在操作，EMP_SID取localStorage中的EMP_SID
           */
          return state.tempEMP_SID==='' ? localStorage.getItem('EMP_SID') : state.tempEMP_SID
        }
      })

      
    },
    components: {
      HRadio,
      HSelect
    },
    created(){
      this.handle = this.$route.params.handle
      this.getInstanceInfo()
    },
    methods: {

      //获取流程信息
      getInstanceInfo(){
        let param = _.assign(this.getWfInfo, {
          "flowFlag": '1',
          "EMP_SID": this.getEMP_SID
        })
        Server.workflow.getInstanceInfo(param)
        .then(res => {
          if(res.returnCode == '000'){
            this.adviceList = res.adviceList

            _.forEach(this.adviceList, item => {
              item.conclusionCN = this.$dicAction.getCnNameByCode(this.getDIC, 'SCSPJL', item.conclusion)

              //对title字段拆分，分为姓名和部门两个字段
              item.name = item.title.split('——')[1]
              item.dep = item.title.split('——')[0]
            })

            //对审批意见列表进行过滤，根据返回的canNotExeOp字段展示相应审批意见
            this.approvalOpinionList = _.pick(this.scspjlDicData, res.canNotExeOp.split(','))

            //拼接提交所需参数
            this.wfInfo.instanceid = res.instanceid
            this.wfInfo.nodeid = res.nodeid
            this.wfInfo.wfsign = res.wfsign
            this.wfInfo.pkvalue = res.pk_value
            this.wfInfo.pkCol = res.pk_col
            this.wfInfo.modelid = res.table_name
            this.wfInfo.scene = res.scene
            this.wfInfo.applType = res.appl_type

            //判断当审批意见为不同意时，否决原因是否展示
            this.isRemarkReasonShow = this.nodeids.includes(res.nodeid)
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      },

      //提交审批意见
      submit(){

        this.$validator.validate()
        .then(validate => {
          if(validate){

            MessageBox.confirm('确定提交审批信息吗？')
            .then(action => {
              
              //提交前将“补充意见”添加后缀，并转为unicode格式
              if(this.wfInfo.encode_op){
                this.wfInfo.encode_op = this.$strAction.encodeUnicode(this.wfInfo.encode_op + '（来自微信企业号）')
              }

              //审批意见为同意或者退回
              if(this.wfInfo.result == '10' || this.wfInfo.result == '11' || this.wfInfo.result == '30'){
                //携带参数跳转到选择下一节点处理人的页面
                this.$store.dispatch('refreshWfParam', this.wfInfo)
                this.$router.push('/workflow/selectnode')
              }
              //审批意见为不同意
              else if(this.wfInfo.result == '20'){
                this.disagreeWorkFlow()
              }

            })
            .catch(e => {})

          }
          else{ //校验不通过
            if(this.$validator.errors.items.length){
              MessageBox.alert(this.$validator.errors.items[0].msg)
            }
          }
        })

      },


      //流程否决
      disagreeWorkFlow(){
        let param = {
          "instanceid": this.wfInfo.instanceid,
          "nodeid": this.wfInfo.nodeid,
          "sub_type": this.wfInfo.subType,
          "remark_reason": this.wfInfo.remark_reason,
          "encode_op": this.wfInfo.encode_op,
          "result": this.wfInfo.result,
          "wfsign": this.wfInfo.wfsign,
          "modelid": this.wfInfo.modelid,
          "pkVal": this.wfInfo.pkvalue,
          "pkCol": this.wfInfo.pkCol,
          "flowFlag": 1,
          "EMP_SID": this.getEMP_SID
        }
        Server.workflow.disagreeWorkFlow(param)
        .then(res => {
          if(res.returnCode=='000'){
            this.$router.push('/workflow/success/todo')
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      }

    }
  }
</script>
<template>
  <div class="pad-foot">
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
    <div class="info-block">
      <div class="info-title">投票信息</div>
      <ul class="flow-list">
        <li v-for="(item, index) in voteList" :key="index">
          <div class="name">任务执行人：{{item.sv_exe_user_displayname}}</div>
          <div class="detail">
            <ul class="infos">
              <li>
                <span class="l">任务状态</span>
                <span>{{item.sv_statusCN}}</span>
              </li>
              <li>
                <span class="l">投票意见</span>
                <span>{{item.sv_resultCN}}</span>
              </li>
              <li>
                <span class="l">任务开始时间</span>
                <span>{{item.sv_start_time}}</span>
              </li>
              <li>
                <span class="l">任务结束时间</span>
                <span>{{item.sv_end_time}}</span>
              </li>
            </ul>
            <div class="advice">{{item.remark}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info-block" v-if="handle=='true'">
      <div class="info-title">项目审批意见</div>
      <ul class="info-form">
        <li>
          <div class="info-rows">
            <div class="info-name">投票意见<span class="required">*</span></div>
            <div class="info-value">
              <h-select
                :options="resultDicData"
                v-model="voteInfo.sv_result"
                name="投票意见" 
                v-validate="'required'"
              ></h-select>
            </div>
          </div>
        </li>
        <li v-if="voteInfo.sv_result=='120'">
          <div class="info-rows">
            <div class="info-name">否决原因<span class="required">*</span></div>
            <div class="info-value">
              <h-select
                :options="vetoReasonDicData"
                v-model="voteInfo.vote_reason"
                name="否决原因" 
                v-validate="'required'"
              ></h-select>
            </div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">任务开始时间</div>
            <div class="info-value">{{voteInfo.sv_start_time}}</div>
          </div>
        </li>
        <li>
          <div class="info-area">
            <div class="info-name">备注<span v-if="voteInfo.sv_result=='130'" class="required">*</span></div>
            <div class="info-value">
              <textarea 
                v-model="voteInfo.remark"
                placeholder="请输入" 
                maxlength="500"
                name="备注" 
                v-validate="{'required': voteInfo.sv_result=='130'}"
              >
              </textarea>
            </div>
          </div>
        </li>
        <li>
          <div class="info-area">
            <div class="info-name">风险揭示</div>
            <div class="info-value">
              <textarea 
                v-model="voteInfo.risk_detail"
                placeholder="请输入" 
                maxlength="500"
              >
              </textarea>
            </div>
          </div>
        </li>
      </ul>
      <div class="btn-box">
        <a class="btn small light" href="javascript:;" @click="save">保存</a>
        <a class="btn small" href="javascript:;" @click="submit">提交</a>
      </div>
    </div>
    <div class="info-block" v-if="handle=='false'">
      <div class="info-title">项目审批意见</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">投票意见</div>
            <div class="info-value">{{voteInfo.sv_resultCN}}</div>
          </div>
        </li>
        <li v-if="voteInfo.sv_result=='120'">
          <div class="info-rows">
            <div class="info-name">否决原因</div>
            <div class="info-value">{{voteInfo.vote_reasonCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">任务开始时间</div>
            <div class="info-value">{{voteInfo.sv_start_time}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">备注</div>
            <div class="info-value">{{voteInfo.remark}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">风险揭示</div>
            <div class="info-value">{{voteInfo.risk_detail}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Server from '@/server'
  import HSelect from '@/components/HSelect'
  import { mapState } from 'vuex'
  import { Toast, MessageBox } from 'mint-ui'
  export default {
    data(){
      return {

        //判断是从任务列表点查看还是处理过来的
        handle: null,

        //项目审批意见
        voteInfo: {},

        voteList: [],

        //审批历史
        taskInfo: {},
        adviceList: [],

      }
    },
    computed: {
      
      //获取投票信息列表所需参数
      param(){
        return {
          "st_task_id": this.voteInfo.st_task_id,
          "pageInfo.maxLine": 20,
          "pageInfo.targetPage": 1
        }
      },

      //获取审批历史列表所需参数
      instanceParam(){
        return {
          "instanceid": this.taskInfo.wfi_instance_id,
          "nodeid": this.taskInfo.wfi_node_id,
          "wfsign": this.taskInfo.wfi_sign,
          "flowFlag": '1'
        }
      },

      //流程提交所需参数
      submitParam(){
        return this.$objAction.getStringifiedKeyParams(this.voteInfo, 'WfiSignVote')
      },

      //字典项查询
      resultDicData(){ //投票意见
        return this.getDIC.WFI_SIGN_RESULT.value
      },
      vetoReasonDicData(){ //否决原因
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
        }
      })

      
    },
    components: {
      HSelect
    },
    created(){
      this.handle = this.$route.params.handle
      this.getVoteInfo()
    },
    methods: {

      //获取项目审批意见信息
      getVoteInfo(){
        Server.workflow.getVoteInfo(this.getWfInfo)
        .then(res => {
          if(res.returnCode == '000'){
            this.taskInfo = res.returnData.WfiSignTask
            this.voteInfo = res.returnData.WfiSignVote
            //投票意见
            this.voteInfo.sv_resultCN = this.$dicAction.getCnNameByCode(this.getDIC, 'WFI_SIGN_RESULT', this.voteInfo.sv_result)
            //否决原因
            this.voteInfo.vote_reasonCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_DISAGREE_KIND', this.voteInfo.vote_reason)

            this.getInstanceInfo()
            this.getVoteList()
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      },

      //获取投票信息列表
      getVoteList(){
        Server.workflow.getVoteList(this.param)
        .then(res => {
          if(res.returnCode == '000'){
            this.voteList = res.returnData.WfiSignVoteList

            _.forEach(this.voteList, item => {
              //投票意见
              item.sv_resultCN = this.$dicAction.getCnNameByCode(this.getDIC, 'WFI_SIGN_RESULT', item.sv_result)
              //否决原因
              item.vote_reasonCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_ZB_DISAGREE_KIND', item.vote_reason)
              //任务状态
              item.sv_statusCN = this.$dicAction.getCnNameByCode(this.getDIC, 'WFI_VOTE_STATUS', item.sv_status)
            })
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      },

      //获取流程信息
      getInstanceInfo(){
        Server.workflow.getInstanceInfo(this.instanceParam)
        .then(res => {
          if(res.returnCode == '000'){
            this.adviceList = res.adviceList

            _.forEach(this.adviceList, item => {
              item.conclusionCN = this.$dicAction.getCnNameByCode(this.getDIC, 'SCSPJL', item.conclusion)

              //对title字段拆分，分为姓名和部门两个字段
              item.name = item.title.split('——')[1]
              item.dep = item.title.split('——')[0]
            })

          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      },

      //保存
      save(){
        Server.workflow.updateVoteInfo(_.assign(this.submitParam, {
          "opFlag": 'saveTmp'
        }))
        .then(res => {
          Toast({
            message: '保存成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 500
          })
          this.getVoteInfo()
        })
      },

      //提交审批意见
      submit(){
        let This = this
        This.$validator.validate()
        .then(result => {
          if(result){ //校验通过
            MessageBox.confirm('确定提交投票信息吗？')
            .then(action => {

              //提交之前需要先调用一次保存接口
              Server.workflow.updateVoteInfo(_.assign(this.submitParam, {
                "opFlag": 'saveTmp'
              }))
              .then(res => {
                if(res.returnCode=='000'){
                  Server.workflow.updateVoteInfo(_.assign(this.submitParam, {
                    "opFlag": 'save'
                  }))
                  .then(res => {
                    //跳转到成功页面
                    this.$router.push('/workflow/success/vote')
                  })
                }
              })

            })
            .catch(e => {})
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
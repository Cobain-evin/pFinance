<template>
  <div>
    <!-- 正常流程的情况 -->
    <div v-if="!isCb">
      <div class="info-block">
        <div class="info-title">请选择下一节点</div>
        <div class="list-block">
          <div class="item-list">
            <ul>
              <li 
                class="list-checkbox"
                v-for="(item, index) in nextNodeList"
                :key="index"
                @click="selectNextNode(index)"
              >
                <div 
                  class="checkbox-column"
                  :class="{
                    'h-icon-checkbox': nextNodeIndex!==index, 
                    'h-icon-checkbox-active': nextNodeIndex==index
                  }"
                >
                </div>
                <div class="content-column">
                  <div class="item-title">
                    <span class="item-name">{{item.nodename}}</span>
                  </div>
                </div>
              </li>
              <li class="list-checkbox" v-if="noAccess">
                <div class="content-column">
                  <div class="item-title">
                    <span class="item-name">未设置权限，请联系管理员</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="info-block">
        <div class="info-title">请选择下一处理人</div>
        <div class="list-block">
          <div class="item-list">
            <ul>
              <li 
                class="list-checkbox"
                v-for="(item, index) in nextUserList"
                :key="index"
                @click="selectNextUser(item)"
              >
                <div 
                  v-show="item.userid !== 'U.NULL'"
                  class="checkbox-column"
                  :class="{
                    'h-icon-checkbox': !item.selected, 
                    'h-icon-checkbox-active': item.selected
                  }"
                >
                </div>
                <div class="content-column">
                  <div class="item-title">
                    <span class="item-name">{{item.username}}</span>
                    <span style="display:none;">{{flag}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 流程退回的情况 -->
    <div v-if="isCb">
      <div class="info-block">
        <div class="info-title">请选择下一节点</div>
        <div class="list-block">
          <div class="item-list">
            <ul>
              <li 
                class="list-checkbox"
                v-for="(item, index) in nextCbList"
                :key="index"
                @click="selectCbNode(index)"
              >
                <div 
                  class="checkbox-column"
                  :class="{
                    'h-icon-checkbox': nextCbNodeIndex!==index, 
                    'h-icon-checkbox-active': nextCbNodeIndex==index
                  }"
                >
                </div>
                <div class="content-column">
                  <div class="item-title">
                    <span class="item-name">{{item.nodename}}</span>
                    <span style="display:none;">{{flag}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="info-block">
        <div class="info-title">请选择下一处理人</div>
        <div class="list-block">
          <div class="item-list">
            <ul>
              <li class="list-checkbox">
                <div class="checkbox-column h-icon-checkbox-active">
                </div>
                <div class="content-column">
                  <div class="item-title">
                    <span class="item-name">{{nextCbUser.username}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <a class="btn" @click="submitNextInfo">确 定</a>
    </div>
  </div>
</template>

<script>
import Server from '@/server'
import WF from '@/lib/workflow'
import router from '@/router'
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
export default {
  data(){
    return {

      /**
       * 流程处理不同，这里返回的下一节点和处理人的数据类型也不同，页面渲染也不同
       * **流程发起/流程审批时选择“同意”：
       * **流程审批时选择“退回”:
       * isCb:是否为“退回”的标识，通过result字段判断，如果true，单独处理
       */
      isCb: false,

      nextCbList: [],
      nextCbNodeIndex: 0,
      nextCbUser: {},

      //下一节点信息
      nextNodeList: [],
      nextNodeIndex: 0, //用于确定选择了哪个节点

      //下一步处理人信息
      nextUserColl: {},
      nextUserList: [],
      flag: true,  //解决不明原因bug所用,

      //选定的节点和处理人信息
      nextnodeid: '',
      nextuserlist: '',

      //未设置权限，节点和处理人信息都为空，展示提示语
      noAccess: false

    }
  },
  computed: {
    ...mapState({
      getWfParam: state => {
        return state.wfParam
      },
      getEMP_SID: state => {
        /**
         * 判断state中是否保存有tempEMP_SID
         * 如果是，说明当前是以虚户在操作，EMP_SID取state中的tempEMP_SID
         * 如果否，说明当前是一主户在操作，EMP_SID取localStorage中的EMP_SID
         */
        return state.tempEMP_SID==='' ? localStorage.getItem('EMP_SID') : state.tempEMP_SID
      }
    }),
    submitParam(){
      return _.assign(this.getWfParam, {
          "nextnodeuser": this.nextuserlist,
          "nextnodeid": this.nextnodeid
        })
    }
  },
  created(){
    this.getNextInfo()
  },
  methods: {

    //获取下一节点和处理人数据
    getNextInfo(){
      let param = _.pick(this.getWfParam, ['flowFlag', 'instanceid', 'nodeid', 'result'])
      param = _.assign(param, {"EMP_SID": this.getEMP_SID})
      Server.workflow.getNodeAndHandler(param)
      .then(res => {
        if(res.returnCode == '000'){
          if(res.result == '30' || res.result == '40'){

            //“退回”的情况
            this.isCb = true
            this.nextCbList = res._WFI_retObj
            this.initCbUser()

          }
          else{

            //正常流程
            this.nextNodeList = res._WFI_retObj.getNextNodeList
            this.nextUserColl = res._WFI_retObj.getNextUserList

            if(!this.nextNodeList.length){
              this.noAccess = true
            }
            else{
              this.initList()
            }

          }
          
        }
        else{
          MessageBox.alert(res.returnMsg)
        }
      })
    },

    //正常流程下初始化列表
    initList(){
      let key = this.nextNodeList[this.nextNodeIndex].nodeid
      this.nextUserList = this.nextUserColl[key]
      
      _.forEach(this.nextUserList, item => {
        if(item.multeitFlag == 'n'){
          item.selected = true
        }
        else{
          item.selected = false
        }
      })
    },

    //选择正常流程下一节点
    selectNextNode(index){
      this.nextNodeIndex = index
      this.initList()
      this.flag = !this.flag
    },

    //选择正常流程下一处理人
    selectNextUser(user){
      if(user.multeitFlag == 'n'){
        return 
      }
      else{
        user.selected = !user.selected
        //不明原因bug：user.selected取反以后，视图不改变，添加一个冗余变量flag属性并进行取反操作之后即可
        this.flag = !this.flag
      }
    },

    //选择退回流程下一节点
    selectCbNode(index){
      this.nextCbNodeIndex = index
      this.flag = !this.flag
      this.initCbUser()
    },

    initCbUser(){
      this.nextCbUser = this.nextCbList[this.nextCbNodeIndex]
    },

    //提交下一节点和下一处理人信息
    submitNextInfo(){

      //没有节点也没有处理人的情况
      if(this.noAccess){
        this.$router.push('/')
      }
      else{
        //拼接nextuserlist参数
        let arr = []
        let arrName = []
        if(this.isCb){  //退回流程
          this.nextnodeid = this.nextCbList[this.nextCbNodeIndex].nodeid
          this.nextuserlist = 'U.' + this.nextCbList[this.nextCbNodeIndex].userid
        }
        else{
          //正常流程
          if(this.nextUserList.length){

            if(this.nextUserList.length == 1 && this.nextUserList[0].userid == 'U.NULL'){
              //岗位人员没有设置，点击跳转回首页
              this.$router.push('/')
            }
            else{
              _.forEach(this.nextUserList, item => {
                if(item.selected){
                  arr.push(item.userid)
                  arrName.push(item.username)
                }
              })
              this.nextuserlist = arr.join(';')

              this.nextnodeid = this.nextNodeList[this.nextNodeIndex].nodeid

              if(this.nextuserlist){  //正常选择了下一处理人
                
                this.checkBeforeSubmit()
                
              }
              else{ //下一处理人有人，但是未选择
                MessageBox.alert('请选择下一处理人')
              }
            }

          }
          else{
            this.nextnodeid = this.nextNodeList[this.nextNodeIndex].nodeid
            if(this.nextnodeid.includes('_e')){
              //结束流程
              this.nextuserlist = ''

              this.checkBeforeSubmit()
            }
            
          }
        }
      }

    },


    //流程提交前检查
    checkBeforeSubmit(){
      let param = _.assign(this.getWfParam, {
        "nextuserlist": this.nextuserlist,
        "nextnodeid": this.nextnodeid,
        "EMP_SID": this.getEMP_SID
      })
      Server.workflow.checkBeforeWfSubmit(param)
      .then(res => {
        if(res.returnCode == '000'){
          //提交
          this.submitWorkflow()
        }
        else{
          MessageBox.alert(res.returnMsg)
        }
      })
    },


    //提交流程
    submitWorkflow(){

      let param = {
        "result": this.getWfParam.result,
        "wfsign": this.getWfParam.wfsign,
        "nodeid": this.getWfParam.nodeid,
        "pkVal": this.getWfParam.pkvalue,
        "encode_op": this.getWfParam.encode_op,
        "nextnodeid": this.nextnodeid,
        "nextnodeuser": this.nextuserlist,
        "modelid": this.getWfParam.modelid,
        "subType": this.getWfParam.subType,
        "scene": this.getWfParam.scene,
        "pkCol": this.getWfParam.pkCol,
        "instanceid": this.getWfParam.instanceid,
        "flowFlag": '1',
        "EMP_SID": this.getEMP_SID
      }

      if(this.getWfParam.cbType == '1'){
        //流程审批阶段“审批意见”选择“退回”，且“打回类型”选择“被打回人逐级提交”
        Server.workflow.submitWorkflow4Cb(param)
        .then(res => {
          if(res.returnCode == '000'){
            //跳转到成功页面
            this.$router.push('/workflow/success/' + this.getWfParam.from)
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      }
      else if(this.getWfParam.cbType == '2'){
        //流程审批阶段“审批意见”选择“退回”，且“打回类型”选择“被打回人直接提交给我”
        Server.workflow.submitCbWorkflow(param)
        .then(res => {
          if(res.returnCode == '000'){
            //跳转到成功页面
            this.$router.push('/workflow/success/' + this.getWfParam.from)
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      }
      else{
        //正常流程
        Server.workflow.submitWorkflow(_.assign(param, {
          "applType": this.getWfParam.applType
        }))
        .then(res => {
          if(res.returnCode == '000'){
            //跳转到成功页面
            this.$router.push('/workflow/success/' + this.getWfParam.from)
          }
          else{
            MessageBox.alert(res.returnMsg)
          }
        })
      }

    }

  }
}
</script>
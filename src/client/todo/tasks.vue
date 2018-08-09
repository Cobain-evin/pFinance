<template>
  <div>
    <mt-loadmore 
      :top-method="loadMore" 
      ref="loadmore"
    >
      <!-- <div class="allLoaded" v-if="allLoaded">已经全部加载</div> -->
      <div class="no-data" v-if="!taskList.length">没有数据</div>
      <div class="todo-list" v-for="(item, index) in taskList" :key="index">
        <div class="time-box">
          <div class="time">{{item.wb_task_data_date}}</div>
        </div>
        <div class="todo-box">
          <div class="todo-title">{{item.cus_name}}</div>
          <div class="todo-content">
            <h3>{{item.wb_task_desc}}</h3>
            <div class="detail">
              <div class="info">
                <p>
                  <span class="l">所属公司</span>
                  <span>{{item.com_org}}</span>
                </p>
                <p>
                  <span class="l">发起人</span>
                  <span>{{item.previous_userid_displayname}}</span>
                </p>
              </div>
              <div class="actions">
                <a class="btn smaller" @click="gotoDetail(item, false)">查看</a>
                <a class="btn smaller" @click="handle(item, true)">处理</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import Server from '@/server'
  export default {
    data(){
      return {
        taskList: [],
        taskNum: 0,

        /*分页相关参数*/
        allLoaded: false,
        pageSize: 10,
        pageNum: 1
      }
    },
    computed: {
      param(){
        return {
          "wb_item_catagory": 10,
          "pageInfo.maxLine": this.pageSize,
          "pageInfo.targetPage": this.pageNum
        }
      }
    },
    created(){
      this.getTaskList()
    },
    methods: {

      //获取待办事项列表
      getTaskList(){
        Server.todo.getTaskList(this.param)
        .then(res => {
          if(res.returnData && res.returnData.PubWbTaskListList){
            this.taskNum = res.returnData.pageInfo.recordSize
            this.taskList = _.concat(this.taskList, res.returnData.PubWbTaskListList)
            this.allLoaded = this.taskList.length == this.taskNum

            _.forEach(this.taskList, item => {
              //通过判断get_userid中处理人的数量，来确定这个任务是不是已经被当前登录人领取过了
              if(!item.get_userid){
                item.canAccept = false
              }
              else{
                item.canAccept = item.get_userid.includes(';')
              }

              //判断待办是不是走评审会流程
              if(item.wb_task_url=='getWfiSignVoteUpdatePage.do'){
                item.taskType = 'vote'
              }
              else{
                item.taskType = 'instance'
              }
            })

          }
        })
      },

      //下拉加载更多
      loadMore(){
        if(!this.allLoaded){
          this.$refs.loadmore.onTopLoaded()
          this.pageNum++
          this.getTaskList()
        }
        else{
          this.$refs.loadmore.onTopLoaded()
        }
        
      },

      //处理待办
      handle(task){

        //判断该任务是否需要用虚户操作
        if(task.owner_userid.includes('-')){
          Server.todo.getTempEMPSID({
            "actorno": task.owner_userid,
            "createSession": true,
            "wb_task_id": task.wb_task_id
          })
          .then(res => {
            if(res.returnCode == '000'){
              this.$store.dispatch('refreshTempEMP_SID', res.returnData.EMP_SID)
              this.acceptTask(task, res.returnData.EMP_SID)
            }
            else{
              MessageBox.alert(res.returnMsg)
            }
          })
        }
        else{
          this.acceptTask(task, null)
        }

      },


      //领取任务
      acceptTask(task, tempEMP_SID){
        //判断是否已经领取过该任务
        if(task.canAccept){
          MessageBox.confirm('请确认是否领取该任务！')
          .then(action => {

            let param = {}
            if(tempEMP_SID){
              param = {
                "wb_task_id": task.wb_task_id,
                "flowFlag": '1',
                "EMP_SID": tempEMP_SID
              }
            }
            else{
              param = {
                "wb_task_id": task.wb_task_id,
                "flowFlag": '1'
              }
            }

            Server.todo.acceptTask(param)
            .then(res => {  //领取成功
              if(res.returnCode == '000'){
                this.gotoDetail(task, true)
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
            })

          })
          .catch(e => {})
        }
        else{
          this.gotoDetail(task, true)
        }
      },


      //跳转页面(包括查看任务和处理任务)
      gotoDetail(task, handle){
        let query = task.wb_task_url_param
        this.wfInfo = this.$strAction.query2json(query)
        this.$store.dispatch('refreshWfInfo', this.wfInfo)

        this.$router.push('/workflow/approve/'+ task.table_name + '/' + task.taskType + '/'+ task.biz_serno + '/'+ handle)
      }



    }
  }
</script>
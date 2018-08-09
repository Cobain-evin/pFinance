<template>
  <div>
    <div class="login-info">
      <div class="portrait"><img :src="avatarUrl" alt=""></div>
      <div class="info">
        <h3>{{userInfo.actorname}}</h3>
        <h5>{{userInfo.orgid_displayname}}</h5>
      </div>
    </div>
    <router-link class="todo-block" to="/todo">
      <div class="text">
        <h3>工作待办事项</h3>
        <h5>您有<span>{{taskNum}}</span>项待办事项</h5>
      </div>
      <div class="img">
        <img src="@/assets/images/todo.png" alt="">
      </div>
    </router-link>
    <div class="index-list">
      <div class="list-content">
        <div class="title">工作台</div>
        <ul>
          <router-link to="/customer" tag="li" v-if="menuAuthority.cusnamechg">
            <div class="icon blue h-icon-customer"></div>
            <p>客户管理</p>
          </router-link>
          <router-link to="/project" tag="li"  v-if="menuAuthority.xmcx">
            <div class="icon red h-icon-project"></div>
            <p>项目查询</p>
          </router-link>
          <router-link to="/intention-letter" tag="li" v-if="menuAuthority.yxhsq">
            <div class="icon green h-icon-intention-letter"></div>
            <p>意向函申请</p>
          </router-link>
          <router-link to="/lending-apply" tag="li" v-if="menuAuthority.fksq">
            <div class="icon yellow h-icon-lending-apply"></div>
            <p>放款申请</p>
          </router-link>
          <router-link to="/lending-register" tag="li" v-if="menuAuthority.fkdj">
            <div class="icon blue h-icon-lending-register"></div>
            <p>放款登记</p>
          </router-link>
          <router-link to="/repay-register" tag="li" v-if="menuAuthority.hkdj">
            <div class="icon red h-icon-repay-register"></div>
            <p>还款登记</p>
          </router-link>
          <router-link to="/after-check" tag="li" v-if="menuAuthority.dqjcrw">
            <div class="icon green h-icon-after-check"></div>
            <p>保后检查</p>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- <div class="index-list">
      <div class="list-content">
        <div class="title">客户管理</div>
        <ul>
          <router-link to="/customer" tag="li">
            <div class="icon blue h-icon-customer"></div>
            <p>客户管理</p>
          </router-link>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon red h-icon-sale-logs"></div>
            <p>销售日志</p>
          </router-link>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon green h-icon-weekly-report"></div>
            <p>工作周报</p>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="index-list">
      <div class="list-content">
        <div class="title">产品项目管理</div>
        <ul>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon red h-icon-project-progress"></div>
            <p>项目进度</p>
          </router-link>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon green h-icon-setting"></div>
            <p>产品配置</p>
          </router-link>
          <router-link to="/project" tag="li">
            <div class="icon blue h-icon-project"></div>
            <p>项目查询</p>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="index-list">
      <div class="list-content">
        <div class="title">作业管理</div>
        <ul>
          <router-link to="/intention-letter" tag="li">
            <div class="icon green h-icon-intention-letter"></div>
            <p>意向函申请</p>
          </router-link>
          <router-link to="/lending-apply" tag="li">
            <div class="icon red h-icon-lending-apply"></div>
            <p>放款申请</p>
          </router-link>
          <router-link to="/lending-register" tag="li">
            <div class="icon yellow h-icon-lending-register"></div>
            <p>放款登记</p>
          </router-link>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon blue h-icon-due-bill"></div>
            <p>借据台账查询</p>
          </router-link>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon yellow h-icon-contract-apply"></div>
            <p>合同申请</p>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="index-list">
      <div class="list-content">
        <div class="title">贷后管理</div>
        <ul>
          <router-link to="/repay-register" tag="li">
            <div class="icon red h-icon-repay-register"></div>
            <p>还款登记</p>
          </router-link>
          <router-link to="/after-check" tag="li">
            <div class="icon yellow h-icon-after-check"></div>
            <p>保后检查</p>
          </router-link>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon green h-icon-pre-repay"></div>
            <p>提前还款登记</p>
          </router-link>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon green h-icon-bill"></div>
            <p>票据管理</p>
          </router-link>
          <router-link to="/" tag="li" class="disabled">
            <div class="icon blue h-icon-cash-deposit"></div>
            <p>保证金解回登记</p>
          </router-link>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
  import Server from '@/server'
  export default {
    data(){
      return {
        userInfo: {},
        taskNum: 0,
        avatar: null,
        menuAuthorityList: [],
        menuAuthority: {}
      }
    },
    computed: {
      avatarUrl(){
        return this.avatar || localStorage.getItem('avatar') || '@/assets/images/portrait.png'
      }
    },
    created(){
      this.getCurrentUserMenuAuthority()
      this.getUserInfo()
      this.refreshTaskList()
      this.getAvatarUrl()
    },
    methods: {
      //获取用户信息
      getUserInfo(){
        Server.index.getUserInfo()
        .then(res => {
          if(res.returnData.SUser){
            this.userInfo = res.returnData.SUser
            localStorage.setItem('userId', this.userInfo.actorno)
          }
        })
      },

      //刷新待办列表
      refreshTaskList(){
        Server.todo.refreshTaskList()
        .then(res => {
          if(res.returnCode == '000'){
            this.getTaskList()
          }
        })
      },

      //获取待办事项列表
      getTaskList(){
        Server.todo.getTaskList({
          "wb_item_catagory": 10,
          "pageInfo.maxLine": 1,
          "pageInfo.targetPage": 1
        })
        .then(res => {
          if(res.returnData && res.returnData.PubWbTaskListList){
            this.taskNum = res.returnData.pageInfo.recordSize
          }
        })
      },

      //获取登录用户微信头像
      getAvatarUrl(){
        let avatar = this.$route.query.avatar
        if(avatar){
          localStorage.setItem('avatar', avatar)
          this.avatar = avatar
        }
      },

      //获取登录用户菜单权限
      getCurrentUserMenuAuthority(){
         let This =this;
         Server.utils.getCurrentUserMenuAuthority({})
        .then(res => {
          if(res.returnData && res.returnData.MenuAuthorityList){
            //循环数组转json
            _.forEach(res.returnData.MenuAuthorityList, (item, index) => {
              This.menuAuthority[item.resourceid] = true
            })
          }
        })
      },
    }
  }
</script>
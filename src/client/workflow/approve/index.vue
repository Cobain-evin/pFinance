<template>
  <div :class="{'fixed-tab-head': isNavShow}">
    <div class="info-tab" v-if="isNavShow">
      <ul class="flexbox-sb">
        <router-link 
          tag="li" 
          :to="'/workflow/approve/' + params" 
          exact 
          replace
        >基本信息</router-link>

        <!-- 只有 tableType='PrjInfo' || PrjChgInfo 时，才展示方案信息 -->
        <router-link 
          tag="li" 
          :to="'/workflow/approve/plan/' + params" 
          exact 
          replace
          v-if="tableType=='PrjInfo' || tableType=='PrjChgInfo'"
        >
          方案信息
        </router-link>

        <router-link 
          tag="li" 
          :to="'/workflow/approve/approval/' + params" 
          exact 
          replace
        >审批信息</router-link>
      </ul>
    </div>
    <router-view :name="tableType"></router-view>
    <router-view :name="taskType"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        tableType: null,  //业务类型（项目/意向函等）
        taskType: null, //任务类型（一般流程审批/评审会）
        serno: null,  //流水号
        handle: null  //处理方式（查看/处理）
      }
    },
    computed: {
      params(){
        return this.tableType + '/' + this.taskType + '/' + this.serno + '/' + this.handle
      },
      isNavShow(){
        /**
         * null: 不确定什么流程
         * LmtVdrApp：供应链授信审批流程
         */
        if(this.tableType == 'null' || this.tableType == 'LmtVdrApp'){
          return false
        }
        else{
          return true
        }
      }
    },
    created(){
      this.tableType = this.$route.params.tableType
      this.taskType = this.$route.params.taskType
      this.serno = this.$route.params.serno
      this.handle = this.$route.params.handle

      //如果没有tableType，则不展示基本信息页，直接展示审批页面
      if(!this.isNavShow){
        this.$router.replace('/workflow/approve/approval/' + this.params)
      }
    }
  }
</script>
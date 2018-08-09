<template>
  <div class="fixed-tab-head">
    <div class="info-tab">
      <ul class="flexbox-sb">
        <router-link tag="li" :to="'/after-check/detail/' + taskNo + '/' + handle" replace>基本信息</router-link>
        <router-link tag="li" :to="'/after-check/detail/content/' + taskNo + '/' + handle" replace>检查内容</router-link>
        <router-link tag="li" :to="'/after-check/detail/file/' + taskNo + '/' + handle" replace>相关资料</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        taskNo: null,
        handle: null
      }
    },
    created(){
      this.taskNo = this.$route.params.serno
      this.handle = this.$route.params.handle
    }
  }
</script>
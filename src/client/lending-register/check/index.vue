<template>
  <div class="fixed-tab-head">
    <div class="info-tab">
      <ul class="flexbox-sb">
        <router-link tag="li" :to="'/lending-register/check/' + loanInputId" replace>基本信息</router-link>
        <router-link tag="li" :to="'/lending-register/check/file/' + loanInputId" replace>资料信息</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        loanInputId: null
      }
    },
    created(){
      this.loanInputId = this.$route.params.serno
    }
  }
</script>
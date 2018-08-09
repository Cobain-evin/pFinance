<template>
  <div class="fixed-tab-head">
    <div class="info-tab four-tabs">
      <ul class="flexbox-sb">
        <router-link tag="li" :to="'/lending-apply/detail/' + param" replace>放款申请</router-link>
        <router-link tag="li" :to="'/lending-apply/detail/fee/' + param" replace>费用列表</router-link>
        <router-link tag="li" :to="'/lending-apply/detail/todo/' + param" replace>待落实事项</router-link>
        <router-link tag="li" :to="'/lending-apply/detail/register/' + param" replace>登记办理</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        loanNo: null,
        handle: null
      }
    },
    computed: {
      param(){
        return this.loanNo + '/' + this.handle
      }
    },
    created(){
      this.loanNo = this.$route.params.serno
      this.handle = this.$route.params.handle
    }
  }
</script>
<template>
  <div class="fixed-tab-head">
    <div class="info-tab four-tabs">
      <ul class="flexbox-sb">
        <router-link tag="li" :to="'/lending-apply/create/' + loanNo" replace>放款申请</router-link>
        <router-link tag="li" :to="'/lending-apply/create/fee/' + loanNo" replace>费用列表</router-link>
        <router-link tag="li" :to="'/lending-apply/create/todo/' + loanNo" replace>待落实事项</router-link>
        <router-link tag="li" :to="'/lending-apply/create/register/' + loanNo" replace>登记办理</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        loanNo: null
      }
    },
    created(){
      this.loanNo = this.$route.params.serno
    }
  }
</script>
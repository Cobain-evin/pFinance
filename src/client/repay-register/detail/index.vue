<template>
  <div class="fixed-tab-head">
    <div class="info-tab">
      <ul class="flexbox-sb">
        <router-link tag="li" :to="'/repay-register/detail/' + retNo" replace>基本信息</router-link>
        <router-link tag="li" :to="'/repay-register/detail/returned/' + retNo" replace>担保回款</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        retNo: null
      }
    },
    created(){
      this.retNo = this.$route.params.serno;
    }
  }
</script>
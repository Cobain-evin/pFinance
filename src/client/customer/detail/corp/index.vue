<template>
  <div class="fixed-tab-head">
    <div class="info-tab five-tabs">
      <ul class="flexbox-sb">
        <router-link tag="li" :to="'/customer/detail/corp/' + customerId" replace>基本信息</router-link>
        <router-link tag="li" :to="'/customer/detail/corp/contract/' + customerId" replace>联系信息</router-link>
        <router-link tag="li" :to="'/customer/detail/corp/stock/' + customerId" replace>股权信息</router-link>
        <router-link tag="li" :to="'/customer/detail/corp/file/' + customerId" replace>资料信息</router-link>
        <router-link tag="li" :to="'/customer/detail/corp/account/' + customerId" replace>账户信息</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        customerId: ''
      }
    },
    created(){
      this.customerId = this.$route.params.customerId
    }
  }
</script>
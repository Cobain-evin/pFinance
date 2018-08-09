<template>
  <div class="fixed-tab-head">
    <div class="info-tab">
      <ul class="flexbox-sb">
        <router-link tag="li" :to="'/customer/detail/indi/' + customerId" replace>基本信息</router-link>
        <router-link tag="li" :to="'/customer/detail/indi/file/' + customerId" replace>资料信息</router-link>
        <router-link tag="li" :to="'/customer/detail/indi/account/' + customerId" replace>账户信息</router-link>
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
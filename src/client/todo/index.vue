<template>
  <div class="fixed-tab-head">
    <div class="info-tab">
      <ul class="flexbox-sb">
        <router-link tag="li" :to="'/todo'" exact replace>待办事项</router-link>
        <router-link tag="li" :to="'/todo/notice'" exact replace>审批通知</router-link>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    
  }
</script>
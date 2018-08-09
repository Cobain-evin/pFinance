<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Server from '@/server'
import FastClick from 'fastclick'
export default {
  name: 'App',
  methods: {
    getDictionary(){
      Server.utils.getDictionary()
      .then(res => {
        //更新store中DIC的值
        this.$store.dispatch('refreshDic', res.returnData.DIC)
      })
    }
  },
  created(){

    // 存储emp_sid
    let EMP_SID = this.$route.query.EMP_SID  //HISTORY模式下直接取query
    // let EMP_SID = location.search.substring(9)  //HASH模式下采用截取字符串的方式获取
    if(EMP_SID){
      localStorage.setItem('EMP_SID', EMP_SID)
    }

    // 存储字典
    this.getDictionary()

    //引入FastClick，解决click事件点击延迟的问题
    FastClick.attach(document.body)

  }
}
</script>

<style lang="less">
@import 'assets/css/app';
</style>




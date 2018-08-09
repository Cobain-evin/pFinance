<template>
  <div class="fixed-indication-head">
    <div class="step-indication two-steps flexbox-sb">
      <div class="steps" :class="{'active': stepIndex>=1}">
        <div class="indication">
          <div class="num">1</div>
        </div>
        <p>基本信息</p>
      </div>
      <div class="steps" :class="{'active': stepIndex>=2}">
        <div class="indication">
          <div class="num">2</div>
          <div class="line"></div>
        </div>
        <p>担保回款</p>
      </div>
    </div>

    <transition :name="name" mode="out-in">
      <router-view/>
    </transition>
    
  </div>
</template>

<script>
  export default {
    data(){
      return {
        name: 'left',
        stepIndex: 1
      }
    },
    watch: {
      $route(to, from){
        this.stepIndex = to.meta.index
        if(to.meta.index > from.meta.index){
          this.name = 'left'
        }else{
          this.name = 'right'
        }
      }
    }
  }
</script>

<style scoped>
.left-enter{
  transform: translateX(100%)
}
.left-leave-to{
  transform: translateX(-100%)
}
.right-enter{
  transform: translateX(-100%)
}
.right-leave-to{
  transform: translateX(100%)
}
.left-enter-active, 
.left-leave-active,
.right-enter-active, 
.right-leave-active{
  transition: .2s
}
</style>

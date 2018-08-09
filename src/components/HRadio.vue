<!--下拉框模拟-->
<template>
  <div class="radio-box">
    <div 
      class="radio-item"
      v-for="(text, value) in options" 
      :key="value"
      :value="value"
      @click="select(value)"
    >
      <em
        :class="{
          'h-icon-radio': selectedValue !== value, 
          'h-icon-radio-active': selectedValue == value
        }"
      ></em>
      {{text}}
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      selectedValue(){
        return this.value
      }
    },
    props: {
      options: {
        type: Object,
        default(){
          return {}
        }
      },
      value: {
        type: String,
        default(){
          return ''
        }
      },
      // disabled: {
      //   // type: Boolean,
      //   required: false,
      //   default(){
      //     return false
      //   }
      // }
    },
    model: {
      event: 'change'
    },
    methods: {
      select(value){
        this.$emit('change', value)
      }
    }
  }
</script>

<style lang="less" scoped>
@rem: 37.5rem;
.radio-box{
    padding: 15/@rem 0;
    display: flex;
    .radio-item{
        display: flex;
        height: 30/@rem;
        color: #222222;
        margin-right: 45/@rem;
        em{
            display: inline-block;
            margin-right: 10/@rem;
            font-size: 30/@rem;
            &.h-icon-radio{
              color: #d4d4d4;
            }
            &.h-icon-radio-active{
              color: #43bf86;
            }
        }
    }
}
</style>
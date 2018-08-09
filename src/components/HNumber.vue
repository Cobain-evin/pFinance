<template>
  <div class="number-box">
    <input 
      type="number" 
      class="number-input" 
      :max="max" 
      :min="min" 
      :disabled="disabled"
      :value = "value"
      @change="verifyVal($event)"
    >
  </div>
</template>

<script>
  import {  MessageBox } from "mint-ui";
  export default {
    computed: {
     
    },
    props: ['value', 'disabled', 'min', 'max'],
    model: {
      event: 'change'
    },
    disabled: {
        // type: Boolean,
        required: false,
        default(){
          return false
        }
    },
    methods: {
        verifyVal: function($event) {
          let number =  $event.target.value;
          //判断是否为数字
          if(isNaN(number)){
            MessageBox.alert('请输入正确数字！');
          }
          let value = parseFloat(number);
          let max = $event.target.max;
          let min = $event.target.min;
          if(null!=max && ''!=max && value>parseFloat(max)){
            MessageBox.alert('输入值不能超过最大值:'+max);
            return;
          }else  if(null!=min && ''!=min && value<parseFloat(min)){
            MessageBox.alert('输入值不能小于最小值:'+parseFloat(min));
            return;
          }
          //最小值是否有小数位,通过toFixed 补齐小数位
          if(null!=min && ''!=min && min.indexOf(".") != -1 ){
            let length = min.split('.')[1].length;
            value = parseFloat(value).toFixed(length)
          }
          this.$emit('change',value);
        }
    }

  }
</script>

<style lang="less" scoped>
@rem: 37.5rem;
.number-box{
  width: 100%;
  position: relative;
  height: 60/@rem;
  .number-input{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 1;
  }
}
</style>
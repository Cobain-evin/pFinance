<!--下拉框模拟-->
<template>
  <div class="select-box">
    <div class="text-box" :class="{'disabled': disabled}">{{selectText || '请选择'}}</div>
    <div class="arrow-box h-icon-select-arrow"></div>
    <select 
      @change="$emit('change', $event.target.value)" 
      :value="value" 
      :disabled="disabled" 
    >
      <!-- 添加一条隐藏的option，解决选择第一个option不触发select的change事件的问题 -->
      <option disabled value="">请选择</option>
      <option 
        v-for="(text, value) in options"
        :key="value" 
        :value="value" 
      >
        {{text}}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    computed: {
      selectText(){
        return this.options[this.value]
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
      disabled: {
        // type: Boolean,
        required: false,
        default(){
          return false
        }
      }
    },
    model: {
      event: 'change'
    }
  }
</script>

<style lang="less" scoped>
@rem: 37.5rem;
.select-box{
    width: 358/@rem;
    height: 58/@rem;
    border-radius: 8/@rem;
    border: 1/@rem solid #d3d3d3;
    display: flex;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    .text-box{
        width: 252/@rem;
        line-height: 58/@rem;
        font-size: 30/@rem;
        color: #333333;
        padding: 0 24/@rem;
        &.disabled{
          background-color: #ebebe4;
        }
    }
    .arrow-box{
        width: 56/@rem;
        line-height: 58/@rem;
        background-color: #f5f5f5;
        border-left: 1/@rem solid #d3d3d3;
        text-align: center;
        font-size: 14/@rem;
        color: #666666;
    }
    select{
        width: 360/@rem;
        height: 60/@rem;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
}
</style>
<template>
  <div class="datepicker-box">
    <div class="datepicker">
      <span>{{selectedDate || '请选择'}}</span>
    </div>
    <input 
      type="date" 
      class="date-input" 
      :max="max" 
      :min="min" 
      :disabled="disabled"
      @change="$emit('change', $event.target.value)" 
    >
  </div>
</template>

<script>
  export default {
    computed: {
      selectedDate(){
        return this.value
      }
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
    }

  }
</script>

<style lang="less" scoped>
@rem: 37.5rem;
.datepicker-box{
  width: 100%;
  position: relative;
  height: 60/@rem;
  .datepicker{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 60/@rem;
  }
  .date-input{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
}
</style>
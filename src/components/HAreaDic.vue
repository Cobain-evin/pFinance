<template>
  <div>
    <transition name="fade">
      <linkage @getLinkage='_showChildMsg' v-show="showLinkage"></linkage>
    </transition>
    <p v-html="result" class="getCity"  @click="_showLinkage" :value="value" :name="name"></p>
  </div>
</template>

<script type="text/ecmascript-6">
import Linkage from "@/components/HAreaDicChild"; //引入子组件

export default {
  data() {
    return {
      showLinkage: false, //控制子组件的显示隐藏
      result: "请选择所在省市"
    };
  },
  components: {
    Linkage //注册子组件
  },
  props: ["value", "name"],
  model: {
    event: "change"
  },
  methods: {
    _showChildMsg(msg) {
      //接收子组件数据
      this.result = msg.name;
      this.id = msg.id;
      this.showLinkage = false;
    },
    _showLinkage() {
      this.showLinkage = true;
    },
    aaa(value) {
      this.result = value;
    }
  }
};
</script>

<style lang="less" scoped>
@rem: 37.5rem;
.getCity {
  padding: 15 / @rem 0;
  font-size: 30 / @rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
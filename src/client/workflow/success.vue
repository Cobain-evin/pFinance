<template>
  <div>
    <div class="result">
      <div class="h-icon-success"></div>
      <p>{{successInfo.text}}</p>
    </div>

    <div class="btn-box">
      <router-link :to="successInfo.target" class="btn">确定</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      successInfo: {
        text: "节点提交成功",
        target: "/"
      }
    };
  },
  created() {
    let module = this.$route.params.module;
    switch (module) {
      case "customer":
        this.successInfo.text = "客户新增成功";
        // this.successInfo.target = "/customer";
        break;
      case "intentionLetter":
        // this.successInfo.target = "/intention-letter";
        break;
      case "todo":
        // this.successInfo.target = "/todo";
        break;
      case "vote":
        // this.successInfo.target = "/todo";
        this.successInfo.text = "投票成功";
        break;
      case "lending-register":
        this.successInfo.text = "流程提交成功！";
        // this.successInfo.target = "/lending-register";
        break;
    }
  }
};
</script>
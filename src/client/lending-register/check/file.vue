<template>
  <div>
    <div class="no-data" v-if="!fileInfoList.length">没有资料信息</div>
    <div class="info-block" v-for="(item, index) in fileInfoList" :key="index">
      <div class="info-title">
        <span>相关资料{{index+1}}</span>
        <span class="delete h-icon-delete" @click="deleteFile(item.pk, index)"></span>
      </div>
      <ul class="info-form info-photo">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">资料名称</div>
            <div class="info-value">{{item.file_name}}</div>
          </div>
        </li>
        <li>
          <div class="subtitle">资料上传</div>
          <div class="photo-list">
            <div class="photo-block m" v-if="item.file_thumbnailBase64">
              <img :src="'data:image/jpeg;base64,' + item.file_thumbnailBase64" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Server from "@/server";
export default {
  data() {
    return {
      //从url上获取customerId
      serno: "",
      fileInfoList: [],
    };
  },
  created() {
    this.serno = this.$route.params.serno;
    this.getFileInfo();
  },
  methods: {

    //获取资料信息
    getFileInfo() {
      if (this.serno) {
        let param = { busi_no: this.serno, file_class: "16_17" };
        Server.utils.getFileInfo(param).then(res => {
          this.fileInfoList = res.returnData.DocEReceiveList;
        });
      }
    }

  }
};
</script>
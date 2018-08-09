<template>
  <div>
    <div class="info-block">
      <div class="info-title"></div>
      <div class="info-photo">
        <div class="subtitle tc">请上传客户的身份证正反面照片</div>
        <div class="photo-list">
          <ul class="id-card">
            <li
              v-for="(item ,index) in customerInfoFile"
              :key="index"
            >
              <div class="photo-block xm" v-if="!item.file_thumbnailBase64">
                <img src="@/assets/images/bg-photo-sfzzm.jpg" alt="">
                <div class="camera-circle">
                  <div class="h-icon-camera"></div>
                </div>
                <img-inputer
                  accept="image/*"
                  noMask
                  auto-upload
                  :action="actionUrl"
                  @onSuccess="uploadSuc(item, $event)"
                />
              </div>
              <div class="photo-block xm" v-if="item.file_thumbnailBase64">
                <img :src="'data:image/jpeg;base64,' + item.file_thumbnailBase64" alt="">
                <div class="close" @click="deleteFile(item.pk)"><span class="h-icon-close"></span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="info-block">
      <div class="info-title"></div>
      <div class="info-photo needs">
        <div class="subtitle">拍照要求</div>
        <div class="photo-standard">
          <ul class="flexbox-sb">
            <li>
              <div class="img"><img src="@/assets/images/id-model-1.png" alt=""></div>
              <p><span class="h-icon h-icon-ok"></span>标准拍摄</p>
            </li>
            <li>
              <div class="img"><img src="@/assets/images/id-model-2.png" alt=""></div>
              <p><span class="h-icon h-icon-error"></span>边框缺失</p>
            </li>
            <li>
              <div class="img"><img src="@/assets/images/id-model-3.png" alt=""></div>
              <p><span class="h-icon h-icon-error"></span>照片模糊</p>
            </li>
            <li>
              <div class="img"><img src="@/assets/images/id-model-4.png" alt=""></div>
              <p><span class="h-icon h-icon-error"></span>闪光强烈</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-box">
        <router-link :to="'/customer/create/indi/' + customerId" class="btn small light">上一步</router-link>
        <a class="btn small" @click="updateFileInfo">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Server from '@/server'
  import { mapState } from 'vuex'
  import { Toast, MessageBox } from 'mint-ui'
  import environment from '@/server/environment'
  export default {
    data(){
      return {
        customerId: null,
        customerInfoFile: [],

        actionUrl: environment.uploadUrl
      }
    },
    created(){
      this.customerId = this.$route.params.customerId
      this.getCusFileInfo()
    },
    methods: {

      //获取资料信息
      getCusFileInfo(){
        let param = {busi_no: this.customerId, file_class: '01_02'}
        Server.utils.getFileInfo(param)
        .then(res => {
          this.customerInfoFile = res.returnData.DocEReceiveList
          let fileInfo = this.customerInfoFile
        })
      },

      edit(){
        this.editing = true
      },

      //更新资料
      uploadSuc(item, $event){
        if($event){
          item.file_puth = $event.uploadID
          item.file_thumbnail = $event.thumbnailID
          item.if_receive = '1'
          let param = this.$objAction.getStringifiedKeyParams(item, 'DocEReceive')
          Server.utils.updateFiles(param)
          .then(res => {
            if(res.returnCode!=='000'){
              MessageBox.alert(res.returnMsg)
            }
          })
        }
      },

      //删除资料
      deleteFile(pk){
        MessageBox.confirm('确定删除吗？')
        .then(action => {
          Server.utils.deleteFileInfo({"pk": pk})
          .then(res => {
            if(res.returnCode=='000'){
              this.getCusFileInfo()
            }
            else{
              MessageBox.alert(res.returnMsg)
            }
          })
        })
        .catch(e => {})
      },

      //保存资料信息
      updateFileInfo(){
        let flag = true
        _.forEach(this.customerInfoFile, item => {
          if(item.if_must=='1' && item.if_receive=='2'){
            MessageBox.alert(item.file_name + '必须上传')
            flag = false
            return
          }
        })
        if(flag == true){
          this.$router.push('/customer/create/indi/account/' + this.customerId)
        }
        
      }

    }
  }
</script>
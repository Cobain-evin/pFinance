<template>
  <div class="pad-foot">
    <div class="info-block">
      <div class="info-title">资料信息</div>
      <div class="info-photo" v-if="customerInfoFile[0]">
        <div class="subtitle">公司章程<span class="required">*</span></div>
        <div class="photo-list">
          <ul>
            <li>
              <div class="photo-block s" v-if="!customerInfoFile[0].file_thumbnailBase64">
                <img src="@/assets/images/bg-photo-gszc.jpg" alt="">
                <div class="camera">
                  <div class="h-icon-camera"></div>
                  <p>添加图片</p>
                </div>
                <img-inputer
                  accept="image/*"
                  noMask
                  auto-upload
                  :action="actionUrl"
                  @onSuccess="uploadSuc(customerInfoFile[0], $event)"
                />
              </div>
              <div class="photo-block s" v-if="customerInfoFile[0].file_thumbnailBase64">
                <img :src="'data:image/jpeg;base64,' + customerInfoFile[0].file_thumbnailBase64" alt="">
                <div class="close" @click="deleteFile(customerInfoFile[0].pk)"><span class="h-icon-close"></span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="info-block" v-if="customerInfoFile[1]">
      <div class="info-title"></div>
      <div class="info-photo">
        <div class="subtitle">营业执照（正、副本）<span class="required">*</span></div>
        <div class="photo-list">
          <ul>
            <li>
              <div class="photo-block l" v-if="!customerInfoFile[1].file_thumbnailBase64">
                <img src="@/assets/images/bg-photo-yyzz.jpg" alt="">
                <div class="camera">
                  <div class="h-icon-camera"></div>
                  <p>添加图片</p>
                </div>
                <img-inputer
                  accept="image/*"
                  noMask
                  auto-upload
                  :action="actionUrl"
                  @onSuccess="uploadSuc(customerInfoFile[1], $event)"
                />
              </div>
              <div class="photo-block l" v-if="customerInfoFile[1].file_thumbnailBase64">
                <img :src="'data:image/jpeg;base64,' + customerInfoFile[1].file_thumbnailBase64" alt="">
                <div class="close" @click="deleteFile(customerInfoFile[1].pk)"><span class="h-icon-close"></span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="info-block" v-if="customerInfoFile[2]">
      <div class="info-title"></div>
      <div class="info-photo">
        <div class="subtitle">开户许可证<span class="required">*</span></div>
        <div class="photo-list">
          <ul>
            <li>
              <div class="photo-block m" v-if="!customerInfoFile[2].file_thumbnailBase64">
                <img src="@/assets/images/bg-photo-khxkz.jpg" alt="">
                <div class="camera">
                  <div class="h-icon-camera"></div>
                  <p>添加图片</p>
                </div>
                <img-inputer
                  accept="image/*"
                  noMask
                  auto-upload
                  :action="actionUrl"
                  @onSuccess="uploadSuc(customerInfoFile[2], $event)"
                />
              </div>
              <div class="photo-block m" v-if="customerInfoFile[2].file_thumbnailBase64">
                <img :src="'data:image/jpeg;base64,' + customerInfoFile[2].file_thumbnailBase64" alt="">
                <div class="close" @click="deleteFile(customerInfoFile[2].pk)"><span class="h-icon-close"></span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="info-block" v-if="customerInfoFile[3]">
      <div class="info-title"></div>
      <div class="info-photo">
        <div class="subtitle">机构信用代码证</div>
        <div class="photo-list">
          <ul>
            <li>
              <div class="photo-block m" v-if="!customerInfoFile[3].file_thumbnailBase64">
                <img src="@/assets/images/bg-photo-jgxydmz.jpg" alt="">
                <div class="camera">
                  <div class="h-icon-camera"></div>
                  <p>添加图片</p>
                </div>
                <img-inputer
                  accept="image/*"
                  noMask
                  auto-upload
                  :action="actionUrl"
                  @onSuccess="uploadSuc(customerInfoFile[3], $event)"
                />
              </div>
              <div class="photo-block m" v-if="customerInfoFile[3].file_thumbnailBase64">
                <img :src="'data:image/jpeg;base64,' + customerInfoFile[3].file_thumbnailBase64" alt="">
                <div class="close" @click="deleteFile(customerInfoFile[3].pk)"><span class="h-icon-close"></span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="info-block" v-if="customerInfoFile[4]">
      <div class="info-title"></div>
      <div class="info-photo">
        <div class="subtitle">组织机构代码证（正、副本）</div>
        <div class="photo-list">
          <ul>
            <li>
              <div class="photo-block m" v-if="!customerInfoFile[4].file_thumbnailBase64">
                <img src="@/assets/images/bg-photo-zzjgdmz.jpg" alt="">
                <div class="camera">
                  <div class="h-icon-camera"></div>
                  <p>添加图片</p>
                </div>
                <img-inputer
                  accept="image/*"
                  noMask
                  auto-upload
                  :action="actionUrl"
                  @onSuccess="uploadSuc(customerInfoFile[4], $event)"
                />
              </div>
              <div class="photo-block m" v-if="customerInfoFile[4].file_thumbnailBase64">
                <img :src="'data:image/jpeg;base64,' + customerInfoFile[4].file_thumbnailBase64" alt="">
                <div class="close" @click="deleteFile(customerInfoFile[4].pk)"><span class="h-icon-close"></span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="info-block" v-if="customerInfoFile[5]">
      <div class="info-title"></div>
      <div class="info-photo">
        <div class="subtitle">税务登记证（正、副本）</div>
        <div class="photo-list">
          <ul>
            <li>
              <div class="photo-block m" v-if="!customerInfoFile[5].file_thumbnailBase64">
                <img src="@/assets/images/bg-photo-swdjz.jpg" alt="">
                <div class="camera">
                  <div class="h-icon-camera"></div>
                  <p>添加图片</p>
                </div>
                <img-inputer
                  accept="image/*"
                  noMask
                  auto-upload
                  :action="actionUrl"
                  @onSuccess="uploadSuc(customerInfoFile[5], $event)"
                />
              </div>
              <div class="photo-block m" v-if="customerInfoFile[5].file_thumbnailBase64">
                <img :src="'data:image/jpeg;base64,' + customerInfoFile[5].file_thumbnailBase64" alt="">
                <div class="close" @click="deleteFile(customerInfoFile[5].pk)"><span class="h-icon-close"></span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <router-link :to="'/customer/create/corp/stock/' + customerId" class="btn small light">上一步</router-link>
      <a href="javascript:;" class="btn small" @click="updateFileInfo">下一步</a>
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
        let param = {busi_no: this.customerId, file_class: '01_03'}
        Server.utils.getFileInfo(param)
        .then(res => {
          this.customerInfoFile = res.returnData.DocEReceiveList
        })
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
            if(res.returnCode=='000'){
              this.getCusFileInfo()
            }
            else{
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
          this.$router.push('/customer/create/corp/account/' + this.customerId)
        }
        
      }

    }
  }
</script>
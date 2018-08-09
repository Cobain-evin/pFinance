<template>
  <div>
    <div v-show="handle=='edit'">
      <div class="no-data" v-if="!fileInfoList.length">没有资料信息</div>
      <div class="info-block" v-for="(item, index) in fileInfoList" :key="index">
        <div class="info-title">
          <span>相关资料{{index+1}}</span>
          <span class="delete h-icon-delete" @click="deleteFile(item.pk, index)"></span>
        </div>
        <ul class="info-form info-photo">
          <li>
            <div class="info-rows">
              <div class="info-name">资料名称<span v-if="item.if_must=='1'" class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入"
                  v-model="item.file_name"
                  name="资料名称" 
                  v-validate="'required'"
                  :disabled="item.pk"
                >
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">资料等级<span v-if="item.if_must=='1'" class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="fileLevelDicData" 
                  v-model="item.file_level"
                  name="资料等级" 
                  v-validate="'required'"
                  :disabled="item.pk"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="subtitle">资料上传<span v-if="item.if_must=='1'" class="required">*</span></div>
            <div class="photo-list">
              <ul>
                <li>
                  <div class="photo-block m" v-if="!item.file_thumbnailBase64">
                    <div class="camera">
                      <div class="h-icon-camera"></div>
                      <p>添加图片</p>
                    </div>
                    <img-inputer
                      accept="image/*"
                      noMask
                      auto-upload
                      :action="actionUrl"
                      @onSuccess="uploadSuc(arguments, item)"
                    />
                  </div>
                  <div class="photo-block m" v-if="item.file_thumbnailBase64">
                    <img :src="'data:image/jpeg;base64,' + item.file_thumbnailBase64" alt="">
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="add-block" @click="addFile">
        <span class="h-icon-new"></span>新增资料信息
      </div>
      <div class="btn-box">
        <a href="javascript:;" class="btn" @click="submit">提交</a>
      </div>
    </div>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 编 辑 状 态 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->


    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 只 读 状 态 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div v-show="handle=='check'">
      <div class="no-data" v-if="!fileInfoList.length">没有资料信息</div>
      <div class="info-block" v-for="(item, index) in fileInfoList" :key="index">
        <div class="info-title">
          <span>相关资料{{index+1}}</span>
        </div>
        <ul class="info-form info-photo">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">资料名称</div>
              <div class="info-value">{{item.file_name}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">资料等级</div>
              <div class="info-value">{{item.file_levelCN}}</div>
            </div>
          </li>
          <li>
            <div class="subtitle">资料上传</div>
            <div class="photo-list">
              <div class="photo-block m">
                <img :src="'data:image/jpeg;base64,' + item.file_thumbnailBase64">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Server from '@/server'
  import HSelect from '@/components/HSelect'
  import { mapState } from 'vuex'
  import { Toast, MessageBox } from 'mint-ui'
  import environment from '@/server/environment'
  import WF from '@/lib/workflow'
  export default {
    data() {
      return {
        taskNo: null,
        handle: null,

        fileInfoList: [],

        actionUrl: environment.uploadUrl,

        //保后检查信息，只是为了获取prj_no和prj_name用于发起流程
        afterCheckTaskInfo: {},
      };
    },
    components: {
      HSelect
    },
    computed: {

      //字典项查询
      fileLevelDicData(){ //资料等级
        return this.getDIC.STD_PUB_FILE_LEVEL.value
      },

      ...mapState({
        getDIC: state => {
          let localData = JSON.parse(localStorage.getItem('DIC'))
          if(state.DIC==={} && localData){
            this.$store.commit('updateDic', localData)
          }
          return state.DIC
        }
      }),

    },
    created() {
      this.taskNo = this.$route.params.serno;
      this.handle = this.$route.params.handle;
      this.getAfterCheckTaskInfo()
      this.getFileInfo()
    },
    methods: {

      //保后检查任务详情
      getAfterCheckTaskInfo() {
        Server.afterCheck
          .getAfterCheckTaskInfo({ task_no: this.taskNo })
          .then(res => {
            this.afterCheckTaskInfo = res.returnData.PspCkTask;
          });
      },

      //获取资料信息
      getFileInfo(){
        let param = {busi_no: this.taskNo, file_class: '42'}
        Server.utils.getFileInfo(param)
        .then(res => {
          this.fileInfoList = res.returnData.DocEReceiveList
          _.forEach(this.fileInfoList, item => {
            item.file_levelCN = this.$dicAction.getCnNameByCode(this.getDIC, 'STD_PUB_FILE_LEVEL', item.file_level)
          })
        })
      },

      //更新资料
      uploadSuc(event, item){
        if(event){
          item.file_puth = event[0].uploadID
          item.file_thumbnail = event[0].thumbnailID
          item.if_receive = '1'
          item.file_name_r = event[1].name
          item.file_name_s = event[1].name.slice(event[1].name.lastIndexOf('.'))
          item.file_size = event[1].size
          let param = this.$objAction.getStringifiedKeyParams(item, 'DocEReceive')
          if(item.pk){
            Server.utils.updateFiles(param)
            .then(res => {
              if(res.returnCode=='000'){
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
              this.getFileInfo()
            })
          }
          else{
            Server.utils.addFiles(param)
            .then(res => {
              if(res.returnCode=='000'){
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
              this.getFileInfo()
            })
          }
        }
      },

      //新增资料信息
      addFile(){
        this.fileInfoList.push({
          "busi_no": this.taskNo,
          "busi_no2": null,
          "file_class": '42',
          "file_level": null,
          "file_name": null,
          "file_name_r": null,
          "file_name_s": null,
          "file_puth": null,
          "file_thumbnail": null,
          "file_type": null,
          "if_must": '2',
          "if_must_p": '2',
          "if_receive": '2',
          "file_add_way": '2',
          "if_aim_operate": '1',
          "transform_flag": '0',
          "is_trans": '2',
          "creater": localStorage.getItem('userId'),
          "input_id": localStorage.getItem('userId'),
          "file_size": null,
          "pk": null
        })
      },

      //删除资料
      deleteFile(pk, index){
        if(pk){
          MessageBox.confirm('确定删除吗？')
          .then(action => {
            Server.utils.deleteFileInfo({"pk": pk})
            .then(res => {
              if(res.returnCode=='000'){
              }
              else{
                MessageBox.alert(res.returnMsg)
              }
              this.getFileInfo()
            })
          })
          .catch(e => {})
        }
        else{
          this.fileInfoList.splice(index, 1)
        }
      },

      //提交并发起流程
      submit(){
        MessageBox.confirm('确定提交信息吗？')
        .then(action => {
          let wfParam = {
            "prj_no": this.afterCheckTaskInfo.prj_no,
            "prj_name": this.afterCheckTaskInfo.prj_name,
            "applType": "159",
            "wfSign": "03",
            "app_url": "getPspBcAccViewPage.do?task_no=" + this.taskNo,
            "update_url": "",
            "modelId": "PspCkTask",
            "pkCol": "task_no",
            "pkVal": this.taskNo,
            "status": "000",
            "from": 'afterCheck'
          }

          WF.initWFSubmit(wfParam)
        })
        .catch(e => {})
      }

    }
  }
</script>

<template>
  <div>
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
      <router-link :to="'/lending-register/edit/' + serno" class="btn small light">上一步</router-link>
      <a class="btn small" @click="submit">提交</a>
    </div>
  </div>
</template>

<script>
import HSelect from "@/components/HSelect";
import Server from "@/server";
import WF from "@/lib/workflow";
import { MessageBox, Toast } from "mint-ui";
import environment from '@/server/environment'
export default {
  data() {
    return {
      //从url上获取customerId
      serno: "",
      fileInfoList: [],
      lendingRegisterInfo: {},

      actionUrl: environment.uploadUrl

    };
  },
  components: {
    HSelect
  },
  created() {
    this.serno = this.$route.params.serno;
    this.getFileInfo();
  },
  methods: {

    //获取资料信息
    getFileInfo() {
      if (this.serno) {
        let param = { busi_no: this.serno, file_class: "16" };
        Server.utils.getFileInfo(param).then(res => {
          this.fileInfoList = res.returnData.DocEReceiveList;
        });
      }
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
        "busi_no": this.serno,
        "busi_no2": null,
        "file_class": '16',
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

    getLendingRegisterDetailParam() {
      PvpLoanInput.loan_input_id = this.serno;
    },

    updateLendingRegisterDetailParam() {
      /* 参数转成接口需要数据格式 */
      let lendingRegister = this.$objAction.getStringifiedKeyParams(
        this.lendingRegisterInfo,
        "PvpLoanInput"
      );
      lendingRegister.submit='1';
      console.log(lendingRegister);
      return lendingRegister;
    },

    submitPvpLoanInput() {
      let This = this;
      This.$validator.validate().then(result => {
        if (result) {
          //校验通过
          Server.lendingRegister.submitPvpLoanInput(This.updateLendingRegisterDetailParam()).then(res => {
            if (res.returnCode == "000") {
              Toast({
                message: "提交成功",
                position: "middle",
                iconClass: "mintui mintui-success",
                duration: 500
              });
              This.$router.push("/lending-register");
            } else {
              MessageBox.alert(res.returnMsg);
            }
          });
        } else {
          //校验不通过
          if (This.$validator.errors.items.length) {
            MessageBox.alert(This.$validator.errors.items[0].msg);
          }
        }
      });
    },

    updateLendingRegisterDetail() {
      let This = this;
      This.$validator.validate().then(result => {
        if (result) {
          //校验通过
          Server.lendingRegister
            .updateLendingRegisterDetail(This.updateLendingRegisterDetailParam())
            .then(res => {
              if (res.returnCode == "000") {
                This.doWFI();
              } else {
                MessageBox.alert(res.returnMsg);
              }
            });
        } else {
          //校验不通过
          if (This.$validator.errors.items.length) {
            MessageBox.alert(This.$validator.errors.items[0].msg);
          }
        }
      });
    },

    /*提交方法 */
    submit() {
      let This = this;
      This.$validator.validate().then(result => {
        if (result) {
          //校验通过
          MessageBox.confirm("确定提交申请信息吗？")
            .then(action => {
              let param = { loan_input_id: This.serno };
              Server.lendingRegister.getLendingRegisterInfo(param).then(res => {
                if (res.returnCode == "000") {
                  This.lendingRegisterInfo = res.returnData.PvpLoanInput;
                  /*有借据（那就是已经放款了） */
                  if ("1" == this.lendingRegisterInfo.is_have_bill) {
                    if ("3" == this.lendingRegisterInfo.is_loan) {
                      MessageBox.alert("合作渠道未放款");
                    } 
                    else {
                      /*判断是否全部放款或部分放款 */
                      if ("1" == this.lendingRegisterInfo.is_loan) {
                        //全部放款
                        This.submitPvpLoanInput();
                      } 
                      else {
                        //部分放款
                        if ("1" == this.lendingRegisterInfo.temination_loan) {
                          //终止放款
                          //updatePvpLoanInputRecordForDZ
                          This.updateLendingRegisterDetail();
                        } else {
                          This.submitPvpLoanInput();
                        }
                      }
                    }
                  } 
                  else {
                    //没有借据
                    if ("3" == this.lendingRegisterInfo.is_loan) {
                      //没有放款（失效掉）
                      This.updateLendingRegisterDetail();
                    } 
                    else {
                      ///已经放款（提交流程）【先保存数据然后在提交流程】 全部放款、部分放款
                      ////判断是否发起流程（无借据的）：部分放款 --不在放款
                      This.updateLendingRegisterDetail();
                    }
                  }
                } else {
                  MessageBox.alert(res.returnMsg);
                }
              });
            })
            .catch(e => {});
        } else {
          //校验不通过
          if (This.$validator.errors.items.length) {
            MessageBox.alert(This.$validator.errors.items[0].msg);
          }
        }
      });
    },
    
    /*提交流程 */
    doWFI() {
      let This = this;
      let wfParam = {
        cus_id: This.lendingRegisterInfo.cus_id,
        cus_name: This.lendingRegisterInfo.cus_name,
        prj_no: This.lendingRegisterInfo.prj_no,
        prj_name: This.lendingRegisterInfo.prj_name,
        amt: This.lendingRegisterInfo.loan_amt,
        _variable: "", //参数
        _preventIdLst: "", //风险拦截标识
        applType: "156",
        wfSign: "03",
        app_url:
          "getPvpLoanInputViewPage.do?loan_input_id=" +
          This.serno +
          "&is_show=2&type=input",
        update_url:
          "getPvpLoanInputUpdatePage.do?loan_input_id=" +
          This.serno +
          "&type=input&menuId=fkdj",
        modelId: "PvpLoanInput",
        pkCol: "loan_input_id",
        pkVal: this.serno,
        status: "000",
        result: "10",
        chkType: "1",
        subType: "1",
        flowFlag: "1",
        from: "intentionLetter" //用来确定成功页面的按钮返回地址
      };
      //发起流程
      WF.initWFSubmit(wfParam);
    },
  }
};
</script>
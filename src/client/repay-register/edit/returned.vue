<template>
  <div>
      <div class="no-data" v-if="!repayRegisterEditReturned.length">没有数据</div>
      <div class="info-block longname" v-for="(item, index) in repayRegisterEditReturned" :key="index">
        <div class="info-title">期数{{item.ps_due_dt}}</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">还款计划编号</div>
              <div class="info-value">{{item.repay_plan_id}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">还款计划日期</div>
              <div class="info-value">{{item.repay_date}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">应还本金</div>
              <div class="info-value">{{item.ps_prcp_amt}}元</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">已还本金</div>
              <div class="info-value">{{item.setl_prcp}}元</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">应还未还本金</div>
              <div class="info-value">{{item.rem_prcp_amt}}元</div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">本次实还本金<span class="required">*</span></div>
              <div class="info-value flexbox-sb">
                <input type="text" 
                  placeholder="请输入" 
                  v-model="item.real_amt"
                  maxlength="50"
                  name="本次实还本金" 
                  v-validate="'required'"
                >
                <span>元</span>
              </div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">应还正常利息</div>
              <div class="info-value">{{item.ps_norm_int_amt}}元</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">已还正常利息</div>
              <div class="info-value">{{item.setl_norm_int}}元</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">应还未还正常利息</div>
              <div class="info-value">{{item.rem_norm_int}}元</div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">本次实还正常利息<span class="required">*</span></div>
              <div class="info-value flexbox-sb">
                <input type="text" 
                  placeholder="请输入" 
                  v-model="item.real_norm_int"
                  maxlength="50"
                  name="本次实还正常利息" 
                  v-validate="'required'"
                >
                <span>元</span>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">实际还款日期<span class="required">*</span></div>
              <div class="info-value">
                <h-datepicker 
                  v-model="item.repay_date_r"
                  :min="item.repay_date"
                  :max="currentDate"
                  name="实际还款日期"
                  v-validate="'required'"
                >
                </h-datepicker>
              </div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">是否结清</div>
              <div class="info-value">{{item.setl_indCN}}</div>
            </div>
          </li>
        </ul>
        <div v-for="(file, fileIndex) in fileList[index]" :key="fileIndex">
          <div class="info-title">
            <span>相关资料{{fileIndex+1}}</span>
            <span class="delete h-icon-delete" @click="deleteFile(file.pk, fileIndex, index)"></span>
          </div>
          <ul class="info-form info-photo">
            <li>
              <div class="info-rows">
                <div class="info-name">资料名称<span v-if="file.if_must=='1'" class="required">*</span></div>
                <div class="info-value">
                  <input 
                    type="text" 
                    placeholder="请输入" 
                    v-model="file.file_name"
                    maxlength="50"
                    name="资料名称" 
                    v-validate="'required'"
                    :disabled="file.pk"
                  >
                </div>
              </div>
            </li>
            <li>
              <div class="subtitle">资料上传<span v-if="file.if_must=='1'" class="required">*</span></div>
              <div class="photo-list">
                <ul>
                  <li>
                    <div class="photo-block m" v-if="!file.file_thumbnailBase64">
                      <div class="camera">
                        <div class="h-icon-camera"></div>
                        <p>添加图片</p>
                      </div>
                      <img-inputer
                        accept="image/*"
                        noMask
                        auto-upload
                        :action="actionUrl"
                        @onSuccess="uploadSuc(arguments, file, index)"
                      />
                    </div>
                    <div class="photo-block m" v-if="file.file_thumbnailBase64">
                      <img :src="'data:image/jpeg;base64,' + file.file_thumbnailBase64" alt="">
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="add-block" @click="addFile(item, index)">
          <span class="h-icon-new"></span>新增资料信息
        </div>
      </div>
      <div class="btn-box">
        <router-link :to="'/repay-register/edit/' + retNo" class="btn small light">上一步</router-link>
        <a class="btn small" href="javascript:;" @click="submit">提交</a>
      </div>
  </div>
</template>

<script>
import Server from "@/server";
import HSelect from "@/components/HSelect";
import HDatepicker from "@/components/HDatepicker";
import { MessageBox } from "mint-ui";
import { mapState } from "vuex";
import WF from "@/lib/workflow";
import environment from '@/server/environment'
export default {
  data() {
    return {
      //回款编号
      retNo: null,
      repayRegisterEditReturned: [],
      actionUrl: environment.uploadUrl,

      //还款基本信息，用于提交流程
      repayRegisterDetail: {},

      fileList: []
    };
  },
  components: {
    HDatepicker,
    HSelect
  },
  created() {
    this.retNo = this.$route.params.serno;
    this.getRepayRegisterEditReturned();
    this.getRepayRegisterDetail()
  },
  computed: {
    currentDate(){
      return this.$timeAction.formatDate(new Date(), 'yyyy-MM-dd');
    },
    ...mapState({
      getDIC: state => {
        let localData = JSON.parse(localStorage.getItem("DIC"));
        if (state.DIC === {} && localData) {
          this.$tore.commit("updateDic", localData);
        }
        return state.DIC;
      }
    })
  },
  methods: {

    //获取还款信息
    getRepayRegisterDetail() {
      Server.repayRegister.getRepayRegisterDetail({
        ret_no: this.retNo
      })
      .then(res => {
        if (res.returnCode == "000") {
          this.repayRegisterDetail = res.returnData.ArpReturnReg;
          let detailInfo = this.repayRegisterDetail;
        }
      });
    },

    //获取回款期数信息
    getRepayRegisterEditReturned() {
      let This = this;
      Server.repayRegister
        .getRepayRegisterEditReturned({
          ret_no: this.retNo
        })
        .then(res => {
          if (res.returnCode == "000") {
            This.repayRegisterEditReturned = res.returnData.ArpNomGuarantRefundList;
            let repayRegisterEditReturnedInfo = this.repayRegisterEditReturned;

            _.forEach(this.repayRegisterEditReturned, (item, index) => {

              // 是否结清
              item.setl_indCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_ZX_YES_NO", item.setl_ind
              );

              //计算应还未还本金--应还本金-已还本金
              item.rem_prcp_amt = Number(item.ps_prcp_amt) - Number(item.setl_prcp)

              //计算应还未还正常利息--应还正常利息-已还正常利息
              item.rem_norm_int = Number(item.ps_norm_int_amt) - Number(item.setl_norm_int)

              //查询资料信息
              this.getFileInfo(index)

            });

          } else {
            MessageBox.alert(res.returnMsg);
          }
        });
    },

    //获取资料信息
    getFileInfo(index){
      let param = {
        "busi_no": this.retNo,
        "busi_no2": this.repayRegisterEditReturned[index].repay_plan_id,
        "file_class": '20'
      }
      Server.utils.getFileInfo(param)
      .then(res => {
        this.$set(this.fileList, index, res.returnData.DocEReceiveList)
      })
    },

    //提交/下一步
    submit() {
      let This = this;
      This.$validator.validate().then(result => {
        if (result) {//校验通过

          let flag = true
          
          //本次实还本金不大于应还本金
          _.forEach(This.repayRegisterEditReturned, (item, index) => {
            if(Number(item.real_amt) < 0){
              MessageBox.alert('还款计划'+(index+1)+'：【本次实还本金】不能为负数');
              flag = false
            }
            else if(Number(item.real_amt) > Number(item.rem_prcp_amt)){
              MessageBox.alert('还款计划'+(index+1)+'：【本次实还本金】不能大于【应还未还本金】');
              flag = false
            }
          })

          //本次实还正常利息不大于应还未还正常利息
          _.forEach(This.repayRegisterEditReturned, (item, index) => {
            if(Number(item.real_norm_int) < 0){
              MessageBox.alert('还款计划'+(index+1)+'：【本次实还正常利息】不能为负数');
              flag = false
            }
            else if(Number(item.real_norm_int) > Number(item.rem_norm_int)){
              MessageBox.alert('还款计划'+(index+1)+'：【本次实还正常利息】不能大于【应还未还正常利息】');
              flag = false
            }
          })


          //实际还款日期不能小于还款计划日期，且不能大于当前营业日期
          _.forEach(This.repayRegisterEditReturned, (item, index) => {
            if(This.$timeAction.date2timestamp(item.repay_date_r) < This.$timeAction.date2timestamp(item.repay_date)){
              MessageBox.alert('还款计划'+(index+1)+'：【实际还款日期】不能小于【还款计划日期】');
              flag = false
            }
            else if(This.$timeAction.date2timestamp(item.repay_date_r) > This.$timeAction.today2timestamp()){
              MessageBox.alert('还款计划'+(index+1)+'：【实际还款日期】不能大于【当前营业日期】');
              flag = false
            }
          })

          if(flag){
            this.updateRepayRegisterEditReturned();
          }
          
        } else {
          //校验通过
          if (This.$validator.errors.items.length) {
            MessageBox.alert(This.$validator.errors.items[0].msg);
          }
        }
      });
    },

    //更新回款信息
    updateRepayRegisterEditReturned() {
      let This = this;
      let flag = true;
      _.forEach(This.repayRegisterEditReturned, (value, key) => {
        let param = This.$objAction.getStringifiedKeyParams(
          value,
          "ArpNomGuarantRefund"
        );
        Server.repayRegister
          .updateRepayRegisterEditReturned(param)
          .then(res => {
            if (res.returnCode == "000") {
            } else {
              flag = false;
            }
          });
      });
      if (flag) {
        this.preCommitRepayRegisterEditReturned();
      }
    },

    // 提交前处理
    preCommitRepayRegisterEditReturned() {
      let This = this;
      _.forEach(This.repayRegisterEditReturned, (value, key) => {
        let param = value.ret_no;

        Server.repayRegister
          .preCommitRepayRegisterEditReturned(value)
          .then(res => {
            if (res.returnCode == "000") {
              this.doWFI();
            } else {
              MessageBox.alert(res.returnMsg);
            }
          });
      });
    },

    // 提交流程
    doWFI() {
      let This = this;
      let wfParam = {
        prj_no: This.repayRegisterDetail.prj_no,
        amt: This.repayRegisterDetail.total_return_amt,
        cont_no: This.repayRegisterDetail.cont_no,
        loan_no: This.repayRegisterDetail.loan_no,
        cus_name: This.repayRegisterDetail.cus_name,
        applType: "363",
        wfSign: "03",
        app_url:
          "getArpReturnRegUpdatePage.do?ret_no=" +
          This.retNo +
          "&appFlag=appFlag&op=check&return_type=" +
          This.repayRegisterDetail.return_type,
        update_url:
          "getArpReturnRegUpdatePage.do?ret_no=" +
          This.retNo +
          "&appFlag=appFlag&op=upd&return_type=" +
          This.repayRegisterDetail.return_type,
        modelId: "ArpReturnReg",
        pkCol: "ret_no",
        pkVal: this.retNo,
        status: "000",
        from: "repayRegister" //用来确定成功页面的按钮返回地址
      };
      //发起流程
      WF.initWFSubmit(wfParam);
    },

    //更新资料
    uploadSuc(event, item, index){
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
            this.getFileInfo(index)
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
            this.getFileInfo(index)
          })
        }
      }
    },

    //新增资料信息
    addFile(item, index){
      this.fileList[index].push({
        "busi_no": this.retNo,
        "busi_no2": item.repay_plan_id,
        "file_class": '20',
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
    deleteFile(pk, fileIndex, index){
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
            this.getFileInfo(index)
          })
        })
        .catch(e => {})
      }
      else{
        this.fileList[index].splice(fileIndex, 1)
      }
    }

  }
};
</script>

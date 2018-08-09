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
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">本次实还本金</div>
              <div class="info-value">{{item.real_amt}}元</div>
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
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">本次实还正常利息</div>
              <div class="info-value">{{item.real_norm_int}}元</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">实际还款日期</div>
              <div class="info-value">{{item.repay_date_r}}元</div>
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
          <div class="info-title">相关资料{{fileIndex+1}}</div>
          <ul class="info-form info-photo">
            <li class="readonly">
              <div class="info-rows">
                <div class="info-name">资料名称</div>
                <div class="info-value">{{file.file_name}}</div>
              </div>
            </li>
            <li>
              <div class="subtitle">资料上传</div>
              <div class="photo-list">
                <div class="photo-block m" v-if="file.file_thumbnailBase64">
                  <img :src="'data:image/jpeg;base64,' + file.file_thumbnailBase64" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Server from "@/server";
import { MessageBox } from "mint-ui";
import { mapState } from "vuex";
export default {
  data() {
    return {
      //回款编号
      retNo: null,
      repayRegisterEditReturned: [],

      fileList: []
    };
  },
  created() {
    this.retNo = this.$route.params.serno;
    this.getRepayRegisterEditReturned();
  },
  computed: {
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

    //获取回款期数信息
    getRepayRegisterEditReturned() {
      let This = this;
      Server.repayRegister.getRepayRegisterEditReturned({
        ret_no: this.retNo
      })
      .then(res => {
        if (res.returnCode == "000") {
          This.repayRegisterEditReturned =
            res.returnData.ArpNomGuarantRefundList;
          let repayRegisterEditReturnedInfo = this.repayRegisterEditReturned;

          _.forEach(this.repayRegisterEditReturned, (item, index) => {
            // 是否结清
            item.setl_indCN = this.$dicAction.getCnNameByCode(
              this.getDIC,
              "STD_ZX_YES_NO",
              item.setl_ind
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

  }
};
</script>

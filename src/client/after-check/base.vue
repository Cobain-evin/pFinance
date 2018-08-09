<template>
  <div class="pad-foot">
    <div class="info-block longname">
      <div class="info-title">基本信息</div>
      <ul class="info-form">
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">检查任务编号</div>
            <div class="info-value">{{afterCheckTaskInfo.task_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目名称</div>
            <div class="info-value">{{afterCheckTaskInfo.prj_name}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">检查任务规则编号</div>
            <div class="info-value">{{afterCheckTaskInfo.rule_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">项目/借据/产品编号</div>
            <div class="info-value">{{afterCheckTaskInfo.prj_no}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">检查任务生成维度</div>
            <div class="info-value">{{afterCheckTaskInfo.task_dim}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">检查任务类型</div>
            <div class="info-value">{{afterCheckTaskInfo.task_typeCN}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">任务开始时间</div>
            <div class="info-value">{{afterCheckTaskInfo.task_start_date}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">要求完成日期</div>
            <div class="info-value">{{afterCheckTaskInfo.require_end_date}}</div>
          </div>
        </li>
        <li class="readonly">
          <div class="info-rows">
            <div class="info-name">检查任务描述</div>
            <div class="info-value">{{afterCheckTaskInfo.task_desc}}</div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 放款信息 -->
    <div class="info-block">
      <div class="info-title">放款信息</div>
      <ul class="info-form" v-if="!lendingInfoList.length">
        <li>
          <div class="no-data">没有数据</div>
        </li>
      </ul>
      <ul 
        class="info-form canFold" 
        :class="{'folded': !item.isShow}"
        v-for="(item, index) in lendingInfoList" 
        :key="index"
      >
        <li class="readonly" @click="showOrHide(item)">
          <div class="info-rows">
            <div class="info-name">放款编号</div>
            <div class="info-value">
              {{item.loan_no}}
              <span class="h-icon-arrow-right"></span>
            </div>
            <span style="display:none;">{{flag}}</span>
          </div>
        </li>
        <div class="sub-info sub-info-box">
          <div class="info-rows">
            <div class="info-name">放款主体</div>
            <div class="info-value">{{item.cus_name}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">产品</div>
            <div class="info-value">{{item.prdname}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">放款金额</div>
            <div class="info-value">{{item.amt}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">放款日期</div>
            <div class="info-value">{{item.amt_date}}</div>
          </div>
          <div class="info-rows">
            <div class="info-name">资产质量分类</div>
            <div class="info-value">{{item.claCN}}</div>
          </div>
        </div>
      </ul>
    </div>

    <div class="btn-box" v-if="handle=='edit'">
      <a href="javascript:;" class="btn" @click="submit">下一步</a>
    </div>
  </div>
</template>

<script>
import Server from "@/server";
import { mapState } from "vuex";
export default {
  data() {
    return {
      taskNo: null,
      handle: null,

      //保后检查信息
      afterCheckTaskInfo: {},

      //放款信息列表
      lendingInfoList: [],

      flag: false
    };
  },
  computed: {
    ...mapState({
      getDIC: state => {
        let localData = JSON.parse(localStorage.getItem("DIC"));
        if (state.DIC === {} && localData) {
          this.$store.commit("updateDic", localData);
        }
        return state.DIC;
      }
    })
  },
  created() {
    this.taskNo = this.$route.params.serno;
    this.handle = this.$route.params.handle;
    this.getAfterCheckTaskInfo();
    this.getAfterCheckLendingInfoList();
  },
  methods: {
    //保后检查任务详情
    getAfterCheckTaskInfo() {
      Server.afterCheck
        .getAfterCheckTaskInfo({ task_no: this.taskNo })
        .then(res => {
          this.afterCheckTaskInfo = res.returnData.PspCkTask;

          let taskInfo = this.afterCheckTaskInfo;
          taskInfo.task_typeCN = this.$dicAction.getCnNameByCode(
            this.getDIC,
            "STD_PSP_CK_TASK_TYPE",
            taskInfo.task_type
          );
        });
    },

    //保后查询放款信息列表
    getAfterCheckLendingInfoList() {
      Server.afterCheck.getAfterCheckLendingInfoList({
          "task_no": this.taskNo,
          "pageInfo.maxLine": 20,
          "pageInfo.targetPage": 1
      })
      .then(res => {
        if (res.returnData && res.returnData.PspSpecialAccList) {
          this.lendingInfoList = res.returnData.PspSpecialAccList;

          _.forEach(this.lendingInfoList, item => {
            item.claCN = this.$dicAction.getCnNameByCode(
              this.getDIC,
              "STD_PUB_CLA_FIVE",
              item.cla
            );
            item.isShow = false
          });
        }
      });
    },

    //列表展开/隐藏
    showOrHide(item){
      item.isShow = !item.isShow;
      this.flag = !this.flag;
    },

    //下一步
    submit(){
      this.$router.push('/after-check/edit/content/' + this.taskNo + '/' + this.handle)
    }


  }
};
</script>
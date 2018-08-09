<template>
  <div class="pad-foot">
    <div v-show="handle=='edit'">

      <!-- 检查内容 -->
      <div class="info-block longname">
        <div class="info-title">检查内容 </div>
        <ul class="info-form" v-if="!afterCheckContentList.length">
          <li>
            <div class="no-data">没有数据</div>
          </li>
        </ul>
        <ul 
          class="info-form canFold" 
          :class="{'folded': !item.isShow}" 
          v-for="(item, index) in afterCheckContentList" 
          :key="index"
        >
          <li class="readonly" @click="showOrHide(item)">
            <div class="info-rows">
              <div class="info-name">检查对象</div>
              <div class="info-value">
                {{item.co_name}}
                <span class="h-icon-arrow-right"></span>
              </div>
              <span style="display:none;">{{flag}}</span>
            </div>
          </li>
          <li class="sub-info-box">
            <ul>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">检查对象名称</div>
                  <div class="info-value">{{item.co_spe_name}}</div>
                </div>
              </li>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">检查条目名称</div>
                  <div class="info-value">{{item.cte_name}}</div>
                </div>
              </li>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">检查条目描述</div>
                  <div class="info-value">{{item.cte_desc}}</div>
                </div>
              </li>
              <li>
                <div class="info-rows">
                  <div class="info-name">本期是否检查<span class="required">*</span></div>
                  <div class="info-value">
                    <h-select 
                      :options="yesOrNoDicData" 
                      v-model="item.is_check"
                      name="本期是否检查" 
                      v-validate="'required'"
                    >
                    </h-select>
                  </div>
                </div>
              </li>
              <li v-if="item.is_check=='1'">
                <div class="info-rows">
                  <div class="info-name">本次检查结果<span class="required">*</span></div>
                  <div class="info-value">
                    <h-select 
                      :options="item.dic" 
                      v-model="item.check_result"
                      name="本次检查结果" 
                      v-validate="'required'"
                    >
                    </h-select>
                  </div>
                </div>
              </li>
              <li>
                <div class="info-area">
                  <div class="info-name">备注</div>
                  <div class="info-value">
                    <textarea 
                      placeholder="请输入" 
                      v-model="item.remark"
                      maxlength="500"
                    >
                    </textarea>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- 决议中明确的检查内容 -->
      <div class="info-block longname">
        <div class="info-title">决议中明确的检查内容</div>
        <ul class="info-form" v-if="!decsContentList.length">
          <li>
            <div class="no-data">没有数据</div>
          </li>
        </ul>
        <ul 
          class="info-form canFold" 
          :class="{'folded': !item.isShow}" 
          v-for="(item, index) in decsContentList" 
          :key="index"
        >
          <li class="readonly" @click="showOrHide(item)">
            <div class="info-rows">
              <div class="info-name">类型</div>
              <div class="info-value">
                {{item.content_typeCN}}
                <span class="h-icon-arrow-right"></span>
              </div>
              <span style="display:none;">{{flag}}</span>
            </div>
          </li>
          <li class="sub-info-box">
            <ul>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">要求事项</div>
                  <div class="info-value">{{item.ask_matter}}</div>
                </div>
              </li>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">检查要求备注</div>
                  <div class="info-value">{{item.ask_remark}}</div>
                </div>
              </li>
              <li class="readonly">
                <div class="info-rows">
                  <div class="info-name">最近一次结果值</div>
                  <div class="info-value">{{item.plan_no}}</div>
                </div>
              </li>
              <li>
                <div class="info-rows">
                  <div class="info-name">本期是否检查<span class="required">*</span></div>
                  <div class="info-value">
                    <h-select 
                      :options="yesOrNoDicData" 
                      v-model="item.is_check"
                      name="本期是否检查" 
                      v-validate="'required'"
                    >
                    </h-select>
                  </div>
                </div>
              </li>
              <li v-if="item.is_check=='1'">
                <div class="info-rows">
                  <div class="info-name">本次检查结果<span class="required">*</span></div>
                  <div class="info-value">
                    <input 
                      type="text" 
                      placeholder="请输入" 
                      v-model="item.check_result"
                      maxlength="50"
                      name="本次检查结果"
                      v-validate="'required'"
                    >
                  </div>
                </div>
              </li>
              <li>
                <div class="info-area">
                  <div class="info-name">备注</div>
                  <div class="info-value">
                    <textarea 
                      placeholder="请输入" 
                      v-model="item.remark"
                      maxlength="500"
                    >
                    </textarea>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- 检查结果登记 -->
      <div class="info-block longername">
        <div class="info-title">检查结果登记</div>
        <ul class="info-form">
          <li>
            <div class="info-rows">
              <div class="info-name">是否调整任务生成频率<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="yesOrNoDicData" 
                  v-model="resultRegisterInfo.is_adjust_rate"
                  name="是否调整任务生成频率" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
        </ul>
        <ul class="info-form" v-if="resultRegisterInfo.is_adjust_rate=='1'">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">原检查任务生成频率</div>
              <div class="info-value">{{oldResultRegisterInfo.rule_rateCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">频率值</div>
              <div class="info-value">{{oldResultRegisterInfo.rate_val}}</div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">新检查任务生成频率<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="rateDicData" 
                  v-model="resultRegisterInfo.task_new_rate"
                  name="新检查任务生成频率" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="info-rows">
              <div class="info-name">调整值<span class="required">*</span></div>
              <div class="info-value">
                <input 
                  type="text" 
                  placeholder="请输入" 
                  v-model="resultRegisterInfo.rate_val" 
                  maxlength="50"
                  name="调整值" 
                  v-validate="'required'"
                >
              </div>
            </div>
          </li>
        </ul>
        <ul class="info-form">
          <li>
            <div class="info-rows">
              <div class="info-name">检查结果判定<span class="required">*</span></div>
              <div class="info-value">
                <h-select 
                  :options="checkResultDicData" 
                  v-model="resultRegisterInfo.check_result"
                  name="检查结果判定" 
                  v-validate="'required'"
                >
                </h-select>
              </div>
            </div>
          </li>
          <li>
            <div class="info-area">
              <div class="info-name">检查结果描述</div>
              <div class="info-value">
                <textarea 
                  placeholder="请输入" 
                  v-model="resultRegisterInfo.check_desc"
                  maxlength="500"
                >
                </textarea>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="btn-box">
        <a href="javascript:;" class="btn" @click="submit">下一步</a>
      </div>
    </div>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 编 辑 状 态 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->


    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 只 读 状 态 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div v-show="handle=='check'">

      <!-- 检查内容 -->
      <div class="info-block">
        <div class="info-title">检查内容 </div>
        <ul class="info-form" v-if="!afterCheckContentList.length">
          <li>
            <div class="no-data">没有数据</div>
          </li>
        </ul>
        <ul 
          class="info-form canFold" 
          :class="{'folded': !item.isShow}"
           v-for="(item, index) in afterCheckContentList" 
           :key="index"
        >
          <li class="readonly" @click="showOrHide(item)">
            <div class="info-rows">
              <div class="info-name">检查对象</div>
              <div class="info-value">
                {{item.co_name}}
                <span class="h-icon-arrow-right"></span>
              </div>
              <span style="display:none;">{{flag}}</span>
            </div>
          </li>
          <div class="sub-info sub-info-box">
            <div class="info-rows">
              <div class="info-name">检查对象名称</div>
              <div class="info-value">{{item.co_name}}</div>
            </div>
            <div class="info-rows">
              <div class="info-name">检查条目名称</div>
              <div class="info-value">{{item.cte_name}}</div>
            </div>
            <div class="info-rows">
              <div class="info-name">检查条目描述</div>
              <div class="info-value">{{item.cte_desc}}</div>
            </div>
            <div class="info-rows">
              <div class="info-name">本期是否检查</div>
              <div class="info-value">{{item.is_checkCN}}</div>
            </div>
            <div class="info-rows" v-if="item.is_check=='1'">
              <div class="info-name">本次检查结果</div>
              <div class="info-value">{{item.check_resultCN}}</div>
            </div>
            <div class="info-rows">
              <div class="info-name">备注</div>
              <div class="info-value">{{item.remark}}</div>
            </div>
          </div>
        </ul>
      </div>

      <!-- 决议中明确的检查内容 -->
      <div class="info-block longname">
        <div class="info-title">决议中明确的检查内容 </div>
        <ul class="info-form" v-if="!decsContentList.length">
          <li>
            <div class="no-data">没有数据</div>
          </li>
        </ul>
        <ul 
          class="info-form canFold" 
          :class="{'folded': !item.isShow}"
           v-for="(item, index) in decsContentList" 
           :key="index"
        >
          <li class="readonly" @click="showOrHide(item)">
            <div class="info-rows">
              <div class="info-name">类型</div>
              <div class="info-value">
                {{item.content_typeCN}}
                <span class="h-icon-arrow-right"></span>
              </div>
              <span style="display:none;">{{flag}}</span>
            </div>
          </li>
          <div class="sub-info sub-info-box">
            <div class="info-rows">
              <div class="info-name">要求事项</div>
              <div class="info-value">{{item.ask_matter}}</div>
            </div>
            <div class="info-rows">
              <div class="info-name">检查要求备注</div>
              <div class="info-value">{{item.ask_remark}}</div>
            </div>
            <div class="info-rows">
              <div class="info-name">最近一次结果值</div>
              <div class="info-value">{{item.latest_result}}</div>
            </div>
            <div class="info-rows">
              <div class="info-name">本期是否检查</div>
              <div class="info-value">{{item.is_checkCN}}</div>
            </div>
            <div class="info-rows" v-if="item.is_check=='1'">
              <div class="info-name">本次检查结果</div>
              <div class="info-value">{{item.check_result}}</div>
            </div>
            <div class="info-rows">
              <div class="info-name">备注</div>
              <div class="info-value">{{item.remark}}</div>
            </div>
          </div>
        </ul>
      </div>

      <!-- 检查结果登记 -->
      <div class="info-block longername">
        <div class="info-title">检查结果登记</div>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">是否调整任务生成频率</div>
              <div class="info-value">{{resultRegisterInfo.is_adjust_rateCN}}</div>
            </div>
          </li>
        </ul>
        <ul class="info-form" v-if="resultRegisterInfo.is_adjust_rate=='1'">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">原检查任务生成频率</div>
              <div class="info-value">{{oldResultRegisterInfo.rule_rateCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">频率值</div>
              <div class="info-value">{{oldResultRegisterInfo.rate_val}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">新检查任务生成频率</div>
              <div class="info-value">{{resultRegisterInfo.task_new_rateCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">调整值</div>
              <div class="info-value">{{resultRegisterInfo.rate_val}}</div>
            </div>
          </li>
        </ul>
        <ul class="info-form">
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">检查结果判定</div>
              <div class="info-value">{{resultRegisterInfo.check_resultCN}}</div>
            </div>
          </li>
          <li class="readonly">
            <div class="info-rows">
              <div class="info-name">检查结果描述</div>
              <div class="info-value">{{resultRegisterInfo.check_desc}}</div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import Server from "@/server";
import { mapState } from "vuex";
import { MessageBox } from 'mint-ui'
import HSelect from "@/components/HSelect";
export default {
  data() {
    return {
      taskNo: null,
      handle: null,

      //放款信息列表
      afterCheckContentList: [],

      //决议中明确的检查内容
      decsContentList: [],

      //检查结果登记查询
      resultRegisterInfo: {},
      //原检查结果，只用来展示，不需要提交
      oldResultRegisterInfo: {},

      flag: true //解决不明原因bug所用
    };
  },
  components: {
    HSelect
  },
  computed: {
    //字典项查询
    yesOrNoDicData() {  //是否项
      return this.getDIC.STD_ZX_YES_NO.value;
    },
    rateDicData() {  //检查任务生成频率
      return this.getDIC.STD_PUB_TIME_UNIT.value;
    },
    checkResultDicData() {  //检查结果判定
      return this.getDIC.STD_PSP_CK_RES.value;
    },
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
    this.getAfterCheckContentList()
    this.getDecsContentList()
    this.getResultRegisterInfo()
  },
  methods: {

    //获取保后检查内容列表
    getAfterCheckContentList() {
      Server.afterCheck.getAfterCheckContentList({
        task_no: this.taskNo,
        "pageInfo.maxLine": 20,
        "pageInfo.targetPage": 1
      })
      .then(res => {
        if (res.returnData && res.returnData.PspBcCoInfoList) {
          this.afterCheckContentList = res.returnData.PspBcCoInfoList;

          _.forEach(this.afterCheckContentList, item => {
            item.isShow = false;
            item.is_checkCN = this.$dicAction.getCnNameByCode(
              this.getDIC,
              "STD_ZX_YES_NO",
              item.is_check
            );

            //处理动态字典项，并将字典项转成HSelect所需的数据格式
            let dic = res.returnData[item.dic_name]
            item.dic = {}
            _.forEach(dic, dicItem => {
              item.dic[dicItem.enname] = dicItem.cnname
            })
            //当“查看”状态时，将“查询结果”转成中文
            item.check_resultCN = ''
            if(item.check_result && item.dic_name){
              item.check_resultCN = _.filter(res.returnData[item.dic_name], dicItem => {
                return dicItem.enname == item.check_result
              })[0].cnname
            }
          });
        }
      });
    },

    //决议中明确的检查内容列表
    getDecsContentList(){
      Server.afterCheck.getDecsContentList({
        task_no: this.taskNo,
        "pageInfo.maxLine": 20,
        "pageInfo.targetPage": 1
      })
      .then(res => {
        if (res.returnData && res.returnData.PspDecsContentList) {
          this.decsContentList = res.returnData.PspDecsContentList;

          _.forEach(this.decsContentList, item => {
            item.isShow = false;
            item.content_typeCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_PRJ_UNRULE_TYPE", item.content_type);
            item.is_checkCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_ZX_YES_NO", item.is_check);
          });
        }
      })
    },


    //检查结果登记查询
    getResultRegisterInfo(){
      Server.afterCheck.getResultRegisterInfo({"task_no": this.taskNo})
      .then(res => {
        this.resultRegisterInfo = res.returnData.PspCkTask

        let resultRegisterInfo = this.resultRegisterInfo
        resultRegisterInfo.is_adjust_rateCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_ZX_YES_NO", resultRegisterInfo.is_adjust_rate);
        resultRegisterInfo.task_new_rateCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_PUB_TIME_UNIT", resultRegisterInfo.task_new_rate);
        resultRegisterInfo.check_resultCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_PSP_CK_RES", resultRegisterInfo.check_result);

        //原检查结果
        let oldResultRegisterInfo = this.oldResultRegisterInfo
        oldResultRegisterInfo.fileFlag = res.returnData.fileFlag
        oldResultRegisterInfo.rate_val = res.returnData.rate_val
        oldResultRegisterInfo.rule_rate = res.returnData.rule_rate
        oldResultRegisterInfo.rule_rateCN = this.$dicAction.getCnNameByCode(this.getDIC, "STD_ZX_YES_NO", oldResultRegisterInfo.rule_rate);
      })
    },

    //检查内容显示/隐藏
    showOrHide(item) {
      item.isShow = !item.isShow;
      this.flag = !this.flag;
    },

    //提交按钮操作，更新数据
    submit() {

      //提交时，需要依次提交“保后检查结果信息”、“决议中明确的检查内容”和“检查结果登记信息”三个表单，其中前两个表单数据为列表，需要采用递归的方式一个一个提交
      //先进行字段校验
      this.$validator.validate()
      .then(result => {
        if(result){ //校验通过
          //提交“保后检查结果信息”
          this.updateAfterCheckContentList()
        }
        else{ //校验不通过
          if(this.$validator.errors.items.length){
            MessageBox.alert(this.$validator.errors.items[0].msg)
          }
        }
      })

      
    },

    //更新“保后检查结果信息”
    updateAfterCheckContentList(){

      let This = this
      let afterCheckContentList = This.afterCheckContentList
      let n = 0, l = afterCheckContentList.length

      function updateAfterCheckContentList(){
        if(l){
          let item = afterCheckContentList[n]
          let param = This.$objAction.getStringifiedKeyParams(item, 'PspBcCoInfo')

          Server.afterCheck.updateAfterCheckContentList(param)
          .then(res => {
            if(res.returnCode == '000'){
              n++
              if(n >= l){
                //“保后检查结果信息”列表全部提交成功
                //提交“决议中明确的检查内容”列表
                This.updateDecsContentList()
              }
              else{
                updateAfterCheckContentList()
              }
            }
            else{
              MessageBox.alert('检查内容'+ (n+1) +'：'+ res.returnMsg)
            }
          })
        }
        else{
          This.updateDecsContentList()
        }
      }

      updateAfterCheckContentList()

    },


    //更新“决议中明确的检查内容”
    updateDecsContentList(){

      let This = this
      let decsContentList = This.decsContentList
      let n = 0, l = decsContentList.length

      function updateDecsContentList(){
        if(l){
          let item = decsContentList[n]
          let param = This.$objAction.getStringifiedKeyParams(item, 'PspDecsContent')

          Server.afterCheck.updateDecsContentList(param)
          .then(res => {
            if(res.returnCode == '000'){
              n++
              if(n >= l){
                //“决议中明确的检查内容”列表全部提交成功
                //提交“检查结果登记信息”
                This.updateResultRegisterInfo()
              }
              else{
                updateDecsContentList()
              }
            }
            else{
              MessageBox.alert('决议中明确的检查内容'+ (n+1) +'：'+ res.returnMsg)
            }
          })
        }
        else{
          This.updateResultRegisterInfo()
        }
      }

      updateDecsContentList()

    },


    //更新“检查结果登记信息”
    updateResultRegisterInfo(){

      let obj = _.pick(this.resultRegisterInfo, ['task_no', 'is_adjust_rate', 'task_new_rate', 'rate_val', 'check_result', 'check_desc'])
      let param = this.$objAction.getStringifiedKeyParams(obj, 'PspCkTask')
      Server.afterCheck.updateResultRegisterInfo(param)
      .then(res => {
        if(res.returnCode == '000'){
          this.$router.push('/after-check/edit/file/' + this.taskNo + '/' + this.handle)
        }
        else{
          MessageBox.alert('检查结果登记信息：'+ res.returnMsg)
        }
      })

    }



  }
};
</script>
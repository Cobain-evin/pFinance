/**
 * 流程公共方法
 */

import Server from '@/server'
import { MessageBox } from 'mint-ui'
import store from '@/store'
import router from '@/router'


const WF = {

  /**
	 * 初始化流程
	 * @param params 
	 * 流程初始化
     *	_applType：设置申请类型（用于按申请类型启动）
     *	_wfSign：流程标识  在定制流程图时确定
     *	_modelId：设置申请表表模型ID
     *  _pkCol：设置申请表主键名
     *  _pkVal：设置申请表主键值
     *  _variable：流程中可修改的业务要素清单（尚未实现）
     *  _preventIdLst：流程中需检查的风险拦截方案清单	
     *  _status：流程状态
     *  
     */
  initWFSubmit:function(param){
    
		let defaultObj = {
			"cus_id": "",
			"cus_name": "",
			"cus_type": "",
			"prj_no": "",
			"prj_name": "",
      "amt": "",
      "cont_no": "",
      "loan_no": "",
      "flowFlag": "1"
    }

    _.assign(defaultObj, param)

    WF.WFSubmit(defaultObj)
    
  },
  

  //执行流程提交
  WFSubmit(params){

    let status = params.status

    if(status==''){
      MessageBox.alert("审批状态为空")
      return
    }

    if(!(status=='000'|| status=='992')){			
      MessageBox.alert('非待发起和打回不能再次发起!')
      return
    }

    WF.doCheckProcRiskInspect(params)

  },


  //检查是否执行风险拦截
	doCheckProcRiskInspect(params){

		let parameters = {
			"appltype": params.applType,
			"wfsign": params.wfSign,
			"modelId": params.modelId,
			"pkCol": params.pkCol,
			"pkVal": params.pkVal,
      "nodeid": "start",
      "flowFlag": params.flowFlag
    }

    Server.workflow.checkProcRiskInspect(parameters)
    .then(res => {
      if(res.returnCode == '000'){
        let result = res.result

        if(result=='1'){
          //需要执行风险拦截
          // WF.doProcRiskInspect(params)
          MessageBox.alert("需要执行风险拦截")
        }
        else{
          //不需要执行风险拦截，直接提交流程
          WF.doStart(params)
        }
      }
      else{
        MessageBox.alert(res.returnMsg)
      }

    })

  },
  

  //流程开始提交
	doStart(params){
		
		let parameters = {
			"modelid": params.modelId,
			"appltype": params.applType,
			"wfsign": params.wfSign,
			"wfvariable": params._variable,
			"newInst4reSubmit": '0',
			"WfiJoin.table_name": params.modelId,
			"WfiJoin.pk_col": params.pkCol,
			"WfiJoin.pk_value": params.pkVal,
			"WfiJoin.prevent_list": "",
      "WfiJoin.app_url": params.app_url,
      "WfiJoin.update_url": params.update_url,
			"WfiJoin.appl_type": params.applType,
			"WfiJoin.cus_id": params.cus_id,
			"WfiJoin.cus_name": params.cus_name,
			"WfiJoin.cus_type": params.cus_type,
			"WfiJoin.prj_no": params.prj_no,
			"WfiJoin.prj_name": params.prj_name,
			"WfiJoin.cont_no": params.cont_no,
			// "WfiJoin.loan_no": params.loan_no,
      "WfiJoin.amt": params.amt,
      "flowFlag": params.flowFlag
		};
    
    Server.workflow.doInitiateWF(parameters)
    .then(res => {

      if(res.returnCode == '000'){
        let wfResult = res.wfResult
        let wfState = wfResult.wfState

        if(wfState == "1") {

          let param = {
            "instanceid": wfResult.instanceid,
            "nodeid": wfResult.nodeid,
            "wfsign": wfResult.wfsign,
            "pkvalue": wfResult.pk_value,
            "pkCol": params.pkCol,
            "modelid": params.modelId,
            "scene": wfResult.scene,
            "applType": params.applType,
            "encode_op": '',
            "flowFlag": 1,
            
            //下面两个字段用于选择节点页面点击下一步时使用
            "result": 10,
            "chkType": 1,
            "subType": 1,
            "from": params.from
          }
          
          //携带参数跳转到选择下一节点处理人的页面
          store.dispatch('refreshWfParam', param)
          router.push('/workflow/selectnode')
          
        }else{
          MessageBox.alert("流程初始化失败，请联系管理员")
        }
      }
      else{
        MessageBox.alert(res.returnMsg)
      }
      

    })

  }
  

}

export default WF
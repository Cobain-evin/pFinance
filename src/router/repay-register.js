import RepayRegister from "@/client/repay-register";
import RepayRegisterList from "@/client/repay-register/list";
import RepayRegisterDetail from "@/client/repay-register/detail";
import RepayRegisterDetailBase from "@/client/repay-register/detail/base";
import RepayRegisterDetailReturned from "@/client/repay-register/detail/returned";
import RepayRegisterEdit from "@/client/repay-register/edit";
import RepayRegisterEditBase from "@/client/repay-register/edit/base";
import RepayRegisterEditReturned from "@/client/repay-register/edit/returned";

export default [{
  path: "/repay-register",
  component: RepayRegister,
  children: [{
    path: "",
    name: "RepayRegisterList",
    component: RepayRegisterList,
    meta: {
      title: "还款登记"
    }
  },{
    path: "edit",
    component: RepayRegisterEdit,
    children: [{
      path: ":serno",
      name: "RepayRegisterEditBase",
      component: RepayRegisterEditBase,
      meta: {
        title: "基本信息",
        description: "录入个人客户信息-基本信息",
        index: 1
      }
    },{
      path: "returned/:serno",
      name: "RepayRegisterEditReturned",
      component: RepayRegisterEditReturned,
      meta: {
        title: "担保回款",
        description: "还款登记计划-担保回款",
        index: 2
      }
    }]
  },{
    path: "detail",
    component: RepayRegisterDetail,
    children: [{
      path: ":serno",
      name: "RepayRegisterDetailBase",
      component: RepayRegisterDetailBase,
      meta: {
        title: "基本信息",
        description: "查看个人客户信息-基本信息"
      }
    },{
      path: "returned/:serno",
      name: "RepayRegisterDetailReturned",
      component: RepayRegisterDetailReturned,
      meta: {
        title: "担保回款",
        description: "查看还款登记计划-担保回款"
      }
    }]
  }]
}]

import Customer from '@/client/customer'
import CustomerList from '@/client/customer/list'
import CreateCustomer from '@/client/customer/create'
import CreateIndi from '@/client/customer/create/indi'
import CreateIndiBase from '@/client/customer/create/indi/base'
import CreateIndiFile from '@/client/customer/create/indi/file'
import CreateIndiAccount from '@/client/customer/create/indi/account'
import CreateCorp from '@/client/customer/create/corp'
import CreateCorpBase from '@/client/customer/create/Corp/base'
import CreateCorpContact from '@/client/customer/create/Corp/contact'
import CreateCorpStock from '@/client/customer/create/Corp/stock'
import CreateCorpFile from '@/client/customer/create/Corp/file'
import CreateCorpAccount from '@/client/customer/create/Corp/account'
import CustomerDetailIndi from '@/client/customer/detail/indi'
import CustomerDetailIndiBase from '@/client/customer/detail/indi/base'
import CustomerDetailIndiFile from '@/client/customer/detail/indi/file'
import CustomerDetailIndiAccount from '@/client/customer/detail/indi/account'
import CustomerDetailCorp from '@/client/customer/detail/corp'
import CustomerDetailCorpBase from '@/client/customer/detail/corp/base'
import CustomerDetailCorpContact from '@/client/customer/detail/corp/contact'
import CustomerDetailCorpStock from '@/client/customer/detail/corp/stock'
import CustomerDetailCorpFile from '@/client/customer/detail/corp/file'
import CustomerDetailCorpAccount from '@/client/customer/detail/corp/account'

export default [{
    path: '/customer',
    component: Customer,
    children: [{
        path: '',
        name: 'Customer',
        component: CustomerList,
        meta: {
            title: '客户管理',
            description: '客户列表'
        }
    },{
        path: 'create',
        name: 'CreateCustomer',
        component: CreateCustomer,
        meta: {
            title: '新增客户',
            description: '新建客户'
        }
    },{
        path: 'create/indi',
        component: CreateIndi,
        children: [{
            path: ':customerId',
            name: 'CreateIndiBase',
            component: CreateIndiBase,
            meta: {
                title: '新增客户',
                description: '录入个人客户信息-基本信息',
                index: 1
            }
        },{
            path: 'file/:customerId',
            name: 'CreateIndiFile',
            component: CreateIndiFile,
            meta: {
                title: '新增客户',
                description: '录入个人客户信息-资料信息',
                index: 2
            }
        },{
            path: 'account/:customerId',
            name: 'CreateIndiAccount',
            component: CreateIndiAccount,
            meta: {
                title: '新增客户',
                description: '录入个人客户信息-账户信息',
                index: 3
            }
        }]
    },{
        path: 'create/corp',
        component: CreateCorp,
        children: [{
            path: ':customerId',
            name: 'CreateCorpBase',
            component: CreateCorpBase,
            meta: {
                title: '新增客户',
                description: '录入对公客户信息-基本信息',
                index: 1
            }
        },{
            path: 'contact/:customerId',
            name: 'CreateCorpContact',
            component: CreateCorpContact,
            meta: {
                title: '新增客户',
                description: '录入对公客户信息-联系信息',
                index: 2
            }
        },{
            path: 'stock/:customerId',
            name: 'CreateCorpStock',
            component: CreateCorpStock,
            meta: {
                title: '新增客户',
                description: '录入对公客户信息-股权信息',
                index: 3
            }
        },{
            path: 'file/:customerId',
            name: 'CreateCorpFile',
            component: CreateCorpFile,
            meta: {
                title: '新增客户',
                description: '录入对公客户信息-资料信息',
                index: 4
            }
        },{
            path: 'account/:customerId',
            name: 'CreateCorpAccount',
            component: CreateCorpAccount,
            meta: {
                title: '新增客户',
                description: '录入对公客户信息-账户信息',
                index: 5
            }
        }]
    },{
        path: 'detail/indi',
        component: CustomerDetailIndi,
        children: [{
            path: ':customerId',
            name: 'CustomerDetailIndiBase',
            component: CustomerDetailIndiBase,
            meta: {
                title: '客户详情',
                description: '个人客户详情--基本信息'
            }
        },{
            path: 'file/:customerId',
            name: 'CustomerDetailIndiFile',
            component: CustomerDetailIndiFile,
            meta: {
                title: '客户详情',
                description: '个人客户详情--资料信息'
            }
        },{
            path: 'account/:customerId',
            name: 'CustomerDetailIndiAccount',
            component: CustomerDetailIndiAccount,
            meta: {
                title: '客户详情',
                description: '个人客户详情--账户信息'
            }
        }]
    },{
        path: 'detail/corp',
        component: CustomerDetailCorp,
        children: [{
            path: ':customerId',
            name: 'CustomerDetailCorpBase',
            component: CustomerDetailCorpBase,
            meta: {
                title: '客户详情',
                description: '对公客户详情--基本信息'
            }
        },{
            path: 'contract/:customerId',
            name: 'CustomerDetailCorpContact',
            component: CustomerDetailCorpContact,
            meta: {
                title: '客户详情',
                description: '对公客户详情--联系信息'
            }
        },{
            path: 'stock/:customerId',
            name: 'CustomerDetailCorpStock',
            component: CustomerDetailCorpStock,
            meta: {
                title: '客户详情',
                description: '对公客户详情--股权信息'
            }
        },{
            path: 'file/:customerId',
            name: 'CustomerDetailCorpFile',
            component: CustomerDetailCorpFile,
            meta: {
                title: '客户详情',
                description: '对公客户详情--资料信息'
            }
        },{
            path: 'account/:customerId',
            name: 'CustomerDetailCorpAccount',
            component: CustomerDetailCorpAccount,
            meta: {
                title: '客户详情',
                description: '对公客户详情--账户信息'
            }
        }]
    }]
}]
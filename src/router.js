import Login from './views/login.vue'
import List from './views/list.vue'
import Add from './views/add.vue'
import Put from './views/put.vue'
import Out from './views/out.vue'
import Return from './views/return.vue'
import History from './views/history.vue'
import WReport from './views/ware_report.vue'
import WTypeReport from './views/ware_type_report.vue'
import WDeptReport from './views/ware_dept_report.vue'


const routers = [
    {
        path: '/',
        meta: {
            title: '慧勤台'
        },
        component: Login
    }, {
        path: '/index',
        meta: {
            title: '慧勤台'
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
            {
                path: 'bar',
                meta: {
                    title: '慧勤台'
                },
                component: Login
            }, {
                path: 'list',
                meta: {
                    title: '慧勤台'
                },
                component: List
            }, {
                path: 'add',
                meta: {
                    title: '慧勤台'
                },
                component: Add
            }, {
                path: 'put',
                meta: {
                    title: '慧勤台'
                },
                component: Put
            }, {
                path: 'out',
                meta: {
                    title: '慧勤台'
                },
                component: Out
            }, {
                path: 'return',
                meta: {
                    title: '慧勤台'
                },
                component: Return
            }, {
                path: 'history',
                meta: {
                    title: '慧勤台'
                },
                component: History
            }, {
                path: 'w_report',
                meta: {
                    title: '慧勤台'
                },
                component: WReport
            }, {
                path: 'w_dept_report',
                meta: {
                    title: '慧勤台'
                },
                component: WDeptReport
            }, {
                path: 'w_type_report',
                meta: {
                    title: '慧勤台'
                },
                component: WTypeReport
            }
        ]
    }, {
        path: '/orderlist',
        meta: {
            title: '慧勤台'
        },
        component: (resolve) => require(['./views/orderlist.vue'], resolve)
    }, {
        path: '/console',
        meta: {
            title: '慧勤台'
        },
        component: (resolve) => require(['./views/console.vue'], resolve)
    }, {
        path: '/operation',
        meta: {
            title: '慧勤台'
        },
        component: (resolve) => require(['./views/operation.vue'], resolve)
    }, {
        path: '/polling',
        meta: {
            title: '慧勤台'
        },
        component: (resolve) => require(['./views/polling.vue'], resolve)
    }, {
        path: '/feedback',
        meta: {
            title: '慧勤台'
        },
        component: (resolve) => require(['./views/feedback.vue'], resolve)
    }, {
        path: '/makecode',
        meta: {
            title: '慧勤台'
        },
        component: (resolve) => require(['./views/makecode.vue'], resolve)
    }
];

export default routers;

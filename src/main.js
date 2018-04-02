import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import VueQrcode from '@xkeshi/vue-qrcode';

Vue.component('qrcode', VueQrcode);

Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // console.log(el)
        // 聚焦元素
        el.focus()
        // el.children[2].focus()
    }
});

var instance = axios.create({
    // baseURL: 'http://h.xasqkj.com/hqt/',
    // baseURL: 'http://192.168.1.110:888/rdp/',
    baseURL: 'http://203j98021s.imwork.net:17285/rdp/',
    timeout: 80000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic cm9vdDpyb290'}
});

/**
 *
 * @param url 请求地址
 * @param params 数据
 * @param isSuccess 成功回调
 * @param isFail 失败回调
 */
Vue.prototype.get = function (url, params, isSuccess, isFail, iswait) {
    if (iswait == undefined || iswait == true) {
        this.$Spin.show();
    }
    instance.get(url, {params: params}).then(res => {
        isSuccess(res)
        if (iswait == undefined || iswait == true) {
            this.$Spin.hide();
        }
    }, err => {
        console.error(err)
        isFail(err)
        if (iswait == undefined || iswait == true) {
            this.$Spin.hide();
        }
    })
};

Vue.prototype.post = function (url, params, isSuccess, isFail, iswait) {
    if (iswait == undefined || iswait == true) {
        this.$Spin.show();
    }
    instance.post(url, params).then(res => {
        isSuccess(res)
        if (iswait == undefined || iswait == true) {
            this.$Spin.hide();
        }
    }, err => {
        console.error(err.response.data.message)
        isFail(err)
        if (iswait == undefined || iswait == true) {
            this.$Spin.hide();
        }
    })
};
Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

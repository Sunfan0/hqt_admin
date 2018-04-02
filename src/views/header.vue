<style scoped lang="less">
    body * {
        color: #36fe05;
    }

    .menu_item, .body-header, .body-content {
        background-color: black;
    }

    .ivu-input-wrapper {
        margin-left: 10px;
        width: 80%;
    }

    .ivu-page {
        margin-top: 20px;
    }

    .layout-assistant {
        height: 30px;
        line-height: 30px;
        width: 100%;
    }

    .layout-assistant .ivu-menu-item {
        width: 150px !important;
        border-bottom: none;
        padding-left: 45px !important;
        background-size: 100% 100%;
        color: white;
        display: inline-block;
    }
</style>
<style lang="less">
    .body-title {
        background-color: #06251d;
        width: 100%;
        height: 80px;
        text-align: right;
        position: relative;
    }

    .body-title img {
        width: 60px;
        height: 60px;
        float: left;
        margin-left: 40px;
        margin-top: 10px;
    }

    .body-title span {
        font-size: 24px;
        line-height: 80px;
        float: left;
        margin-left: 20px;
        letter-spacing: 2px;
        font-style: italic;
        color: #36fe05;
    }

    .body-title .backLogin, .modifyPassword {
        float: right;
        padding: 10px;
        color: #898c8b;
        text-decoration: underline;
        font-size: 13px;
    }

    .body-title .modifyPassword {
        color: #36fe05;
        text-decoration: unset;
    }

    .body-title .userInfo {
        color: #36fe05;
        position: absolute;
        bottom: 5px;
        right: 15px;
    }

    .body-title .backLogin:hover {
        color: #36fe05 !important;
    }

    .body-title .modifyPassword:hover {
        text-decoration: underline;
    }

    body, .body {
        margin: 0;
        background-color: #000 !important;
        font-size: 16px;
    }

    .body-header {
        margin: 0 15px 0;
        padding: 15px 10px;
        background-color: #000;
        border: 1px solid #36fe05;
        border-bottom: none;
        overflow: inherit !important;
    }

    .body-header .switchBtn {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: white;
        width: 10%;
        margin: 0 auto;
    }

    .body-header .switchBtn:hover {
        color: #36fe05 !important;
    }

    .body-content {
        margin: 0 15px 15px;
        padding-bottom: 15px;
    }

    .body-content .ivu-table:after, .ivu-table:before {
        background-color: #36fe05 !important;
    }

    .body-content .ivu-table-body {
        overflow-x: hidden;
    }

    .body-content .ivu-table-wrapper {
        border: 1px solid #36fe05 !important;
    }

    .body-content .ivu-table td, .ivu-table th {
        background-color: #000 !important;
        color: #36fe05 !important;
        border-bottom: 1px solid #36fe05 !important;
    }

    .ivu-table-row * {
        color: white !important;
    }

    input, textarea {
        background-color: #000 !important;
        border: 1px solid #36fe05 !important;
        color: #36fe05 !important;
    }

    .ivu-select-selection * {
        color: #36fe05 !important;
    }

    .ivu-page-options-elevator {
        color: #36fe05;
    }

    .ivu-page-item-active {
        background-color: #2f682a !important;
        border-color: #0d5405 !important;
    }

    .search-box {
        white-space: nowrap;
        float: left;
        width: 25%;
        position: relative;
        color: #36fe05 !important;
        font-size: 14px;
    }

    .ivu-page-item-jump-prev a {
        color: #36fe05 !important;
    }

    .ivu-page-item-jump-next a {
        color: #36fe05 !important;
    }

    .search-box .ivu-select-selection {
        margin-left: 10px;
    }

    .ivu-btn-ghost:hover {
        border-color: #36fe05 !important;
        color: #36fe05 !important;
    }

    .ivu-table .demo-table-info-row td {
        background-color: #36fe05;
        color: #fff;
    }

    .ivu-table .demo-table-info-row span {
        color: #fff;
    }

    #add_modal .ivu-modal {
        width: 700px !important;
    }

    .body-header .ivu-select .ivu-select-dropdown {
        top: 30px !important;
    }

    .contenteditable {
        border: 1px solid #ccc;
        color: #ccc;
        padding: 5px;
    }

    .menu_item {
        margin-top: 10px;
        padding: 0 30px;
    }

    .ivu-modal-wrap {
        background: rgba(158, 158, 158, 0.4);
    }

    .ivu-modal-content, .ivu-select-selection, .ivu-select-dropdown {
        background-color: #000 !important;
        border: 1px solid #36fe05 !important;
    }

    .ivu-modal-header {
        border-bottom: 1px solid #292929 !important;
    }

    .ivu-modal-footer {
        border-top: 1px solid #292929 !important;
    }

    .ivu-modal-wrap *, .ivu-modal-header-inner, .ivu-modal-header p {
        color: #36fe05 !important;
    }

    .ivu-picker-panel-sidebar {
        background: #000000 !important;
    }

    .ivu-btn-primary {
        background-color: transparent !important;
        border-color: #36fe05 !important;
    }

    .ivu-picker-panel-shortcut {
        width: 98px !important;
        padding: 6px 10px 7px !important;
        overflow: visible !important;
    }
</style>

<template>
    <div class="header-common">
        <div class="body-title">
            <img src="../images/logo.png">
            <span>复旦大学附属中山医院</span>
            <Clock></Clock>
            <iframe style="margin-right: 60px;margin-top: -5px;" allowtransparency="true" frameborder="0" width="410"
                    height="80"
                    scrolling="no"
                    src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=1&v=0&d=2&bd=0&k=&f=00ff40&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=57036&w=410&h=80&align=right"></iframe>
            <a class="backLogin" v-on:click="backLogin">退出登录</a>
            <a class="modifyPassword" v-on:click="modifyPassword">修改密码</a>
            <a class="userInfo">{{userInfo}}</a>
        </div>
        <div class="menu_item">
            <div class="layout-assistant">
                <li class="ivu-menu-item" v-bind:style="menuOrder" v-on:click="switchMenu('/operation')">工单
                </li>
                <li class="ivu-menu-item" v-bind:style="menuPolling" v-on:click="switchMenu('/polling')">巡检
                </li>
                <li class="ivu-menu-item" v-bind:style="menuRepertory" v-on:click="switchMenu('/index')">库房
                </li>
                <li class="ivu-menu-item" v-bind:style="menuFeedBack" v-on:click="switchMenu('/feedback')"
                    style="width: 170px !important;">意见反馈
                </li>
            </div>
        </div>
        <Modal v-model="password_modal" title="修改密码" :loading="password_loading" @on-ok="SubmitPassWord">
            <Form :model="formItem" :label-width="140">
                <FormItem label="原密码">
                    <Input v-model="formItem.oldPassword" placeholder="请输入原密码"></Input>
                </FormItem>
                <FormItem label="设置新密码">
                    <Input v-model="formItem.newPassword1" type="password" placeholder="请输入新密码"></Input>
                </FormItem>
                <FormItem label="确认新密码">
                    <Input v-model="formItem.newPassword2" type="password" placeholder="请再次输入新密码"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!--<a href="https://talkus.cn" style="position: fixed;bottom: 20px;right: 40px;z-index:9999">
            <img src="../images/logo-cn-res.png" width="160" height="60"/>
        </a>-->
    </div>
</template>

<script>
    import Clock from './clock.vue';

    export default {
        components: {Clock},
        data() {
            return {
                userInfo: sessionStorage.name + '(' + sessionStorage.code + ')',
                password_modal: false,
                password_loading: true,
                formItem: {
                    oldPassword: '',
                    newPassword1: '',
                    newPassword2: ''
                },
                menuOrder: {
                    display: 'none',
                    backgroundImage: 'url("../../static/menu_bg0.png")'
                },
                menuPolling: {
                    display: 'none',
                    backgroundImage: 'url("../../static/menu_bg0.png")'

                },
                menuRepertory: {
                    display: 'none',
                    backgroundImage: 'url("../../static/menu_bg0.png")'

                },
                menuFeedBack: {
                    display: 'none',
                    backgroundImage: 'url("../../static/menu_bg0.png")'

                }
            }
        },
        created() {
            //大屏幕显示
            //判断当前链接
            if (this.$route.path.indexOf('orderlist') > -1 || this.$route.path.indexOf('operation') > -1) {
                this.menuOrder.backgroundImage = 'url("../../static/menu_bg1.png")'
            }
            if (this.$route.path.indexOf('polling') > -1) {
                this.menuPolling.backgroundImage = 'url("../../static/menu_bg1.png")'
            }
            if (this.$route.path.indexOf('index') > -1) {
                this.menuRepertory.backgroundImage = 'url("../../static/menu_bg1.png")'
            }
            if (this.$route.path.indexOf('feedback') > -1) {
                this.menuFeedBack.backgroundImage = 'url("../../static/menu_bg1.png")'
            }

            //判断用户登录
            if (!sessionStorage.userId && this.$route.path.indexOf('makecode') < 0) {
                this.$router.replace('/')
            }

            //判断用户身份
            if (sessionStorage.role.indexOf('ALLOT') > -1) {
                this.menuOrder.display = "inline-block"
                this.menuPolling.display = "inline-block"
            }
            if (sessionStorage.role.indexOf('KEEPER') > -1) {
                this.menuRepertory.display = "inline-block"
            }
            if (sessionStorage.role.indexOf('ADMIN') > -1) {
                this.menuOrder.display = "inline-block"
                this.menuPolling.display = "inline-block"
                this.menuFeedBack.display = "inline-block"
            }

            if (this.$route.path.indexOf('makecode') > -1) {
                this.menuOrder.display = "none"
                this.menuPolling.display = "none"
                this.menuRepertory.display = "none"
                this.menuFeedBack.display = "none"
            }
        },
        methods: {
            switchMenu(page) {
                if (this.$route.path.indexOf('console') > -1) {
                    return
                }
                this.$router.replace(page)
            },
            backLogin() {
                sessionStorage.userId = ""
                sessionStorage.codeId = ""
                this.$router.replace('/')
            },
            modifyPassword() {
                this.password_modal = true
                this.formItem.oldPassword = ""
                this.formItem.newPassword1 = ""
                this.formItem.newPassword2 = ""
            },
            SubmitPassWord() {
                if (this.formItem.oldPassword == "") {
                    this.$Message.warning('请输入原密码！');
                    this.password_loading = false;
                    setTimeout(function () {
                        this.password_loading = true;
                    }, 100)
                    return;
                }
                if (this.formItem.newPassword1 == "") {
                    this.$Message.warning('请输入新密码！');
                    this.password_loading = false;
                    setTimeout(function () {
                        this.password_loading = true;
                    }, 100)
                    return;
                }
                if (this.formItem.newPassword1 != this.formItem.newPassword2) {
                    this.$Message.warning('请确保两次输入的密码一致！！');
                    this.password_loading = false;
                    setTimeout(function () {
                        this.password_loading = true;
                    }, 100)
                    return;
                }
                var params = new URLSearchParams();
                params.append("userId", sessionStorage.userId);
                params.append("oldPassword", this.formItem.oldPassword);
                params.append("newPassword", this.formItem.newPassword1);
                this.post("resources/biz/worker/update_password", params, res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        this.password_modal = false
                        this.$Message.success('修改密码成功');
                    }
                }, err => {
                    this.password_loading = false;
                    setTimeout(function () {
                        this.password_loading = true;
                    }, 100)
                    this.$Message.error(err.response.data.message);
                })
            }
        }
    }
</script>

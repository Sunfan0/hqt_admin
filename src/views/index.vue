<style scoped lang="less">
    .layout-menu-left {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        background-color: #000;
    }

    .container {
        position: absolute;
        top: 0;
        left: 15%;
        height: 100%;
        padding: 20px;
        background-color: #000;
        overflow-y: scroll;
    }
</style>
<style>
    /*.ivu-menu-item {
        padding: 0 !important;
    }

    .ivu-menu-item a {
        color: hsla(0, 0%, 100%, .7);
        width: 100%;
        height: 100%;
        display: block;
        padding: 14px 24px !important;
    }

    .ivu-menu-item a:hover {
        color: white;
    }*/

    .ivu-menu-item {
        padding: 0 !important;
    }

    .ivu-menu-submenu-title {
        color: #36fe05;
    }

    .ivu-menu-item a {
        color: white;
        width: 100%;
        height: 100%;
        display: block;
        padding: 14px 24px !important;
    }

    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
        background: rgba(255, 255, 255, 0.08) !important
    }

    .ivu-menu-item a:hover {
        color: #9E9E9E;
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        background-color: #04261e !important;
        border-right: 2px solid #36fe05 !important;
    }
    .layout{
        border-top: 1px solid #36fe05!important;
    }
    .body .title {
        background-color: #06251d !important;
    }

    .body form, .ivu-menu-light {
        background-color: #000 !important;
    }

    .body .ivu-form .ivu-form-item-label {
        color: #36fe05 !important;
        font-size: 13px;
    }

    .body .ivu-input {
        width: 70% !important;
    }

    .body .ivu-select-single .ivu-select-selection {
        width: 70% !important;
    }

    .body .ivu-cascader-rel {
        width: 49% !important;
    }

    .body .ivu-cascader-rel .ivu-input {
        width: 100% !important;
    }

    .body .ivu-cascader-rel .ivu-input-wrapper {
        width: 100% !important;
    }

    .body .ivu-date-picker-editor .ivu-input {
        width: 100% !important;
    }

    .body .ivu-input-number {
        width: 49% !important;
    }

    .body .ivu-select .ivu-select-dropdown {
        width: 210px !important;
        left: 0 !important;
    }

    .body .custom-input {
        width: 49%;
        height: 32px;
        line-height: 32px;
        padding: 0 7px;
        text-align: left;
        outline: 0;
        -moz-appearance: textfield;
        color: #666;
        border: 1px solid #dddee1;
        border-radius: 4px;
        transition: all .2s linear;
    }

    .body .custom-input:hover {
        border-color: #57a3f3;
    }

    .body .custom-input:focus {
        border-color: #57a3f3;
    }

    .layout .ivu-row-flex .layout-menu-left {
        top: 160px !important;
    }

    .layout .ivu-row-flex .container {
        top: 160px !important;
        color: #36fe05;
    }

    .ivu-input-number-disabled .ivu-input-number-input, .ivu-input-disabled {
        background-color: #06251d !important;
    }
</style>

<template>
    <div>
        <div id="index">
            <Header></Header>
            <div class="layout">
                <row type="flex">
                    <i-col span="3" class="layout-menu-left">
                        <!--<i-menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">-->
                        <i-menu active-name="1-1" width="auto" :open-names="['1']">
                            <div class="layout-logo-left"></div>
                            <submenu name="1">
                                <template slot="title">
                                    物料管理
                                </template>
                                <menu-item name="1-1">
                                    <router-link to="/index/add" @click.native="Pagereload()">新增</router-link>
                                </menu-item>
                                <menu-item name="1-2">
                                    <router-link to="/index/list">物料总览</router-link>
                                </menu-item>
                            </submenu>
                            <submenu name="2">
                                <template slot="title">
                                    进销存管理
                                </template>
                                <menu-item name="2-1">
                                    <router-link to="/index/put">入库</router-link>
                                </menu-item>
                                <menu-item name="2-2">
                                    <router-link to="/index/out">出库</router-link>
                                </menu-item>
                                <menu-item name="2-3">
                                    <router-link to="/index/return">退回</router-link>
                                </menu-item>
                                <menu-item name="2-4">
                                    <router-link to="/index/history">历史记录</router-link>
                                </menu-item>
                            </submenu>
                            <submenu name="3">
                                <template slot="title">
                                    报表管理
                                </template>
                                <menu-item name="3-1">
                                    <router-link to="/index/w_report">实时报表</router-link>
                                </menu-item>
                                <menu-item name="3-2">
                                    <router-link to="/index/w_dept_report">部门报表</router-link>
                                </menu-item>
                                <menu-item name="3-3">
                                    <router-link to="/index/w_type_report">分类报表</router-link>
                                </menu-item>
                            </submenu>
                        </i-menu>
                    </i-col>
                    <i-col span="20" class="container">
                        <router-view></router-view>
                    </i-col>
                </row>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './header.vue';

    export default {
        components: {Header},
        created() {
            this.$router.replace('/index/add')
        },
        methods: {
            Pagereload() {
                location.reload()
            }
        }
    }
</script>

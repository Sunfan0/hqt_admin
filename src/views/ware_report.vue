<style scoped lang="less">
    .body {
        margin: 20px auto;
    }

    #qrcode {
        height: 200px;
        width: 200px;
        margin: auto;
    }

    .search-box {
        white-space: nowrap;
        float: left;
        width: 20%;
        margin-right: 20px;
        position: relative;
    }

    .search-box .search-input {
        margin-left: 10px;
        width: 200px;
    }

    .search-box .search-time {
        margin-left: 10px;
        width: 160px;
    }

    .body-header .ivu-select .ivu-select-dropdown {
        top: 30px !important;
    }
</style>
<style>
    .ivu-page-item-jump-prev a {
        color: #2d8cf0 !important;
    }

    .ivu-page-item-jump-next a {
        color: #2d8cf0 !important;
    }

    .search-box .ivu-input-wrapper {
        width: 100% !important;
    }

    .ivu-page {
        margin-top: 20px;
    }
</style>
<template>
    <div class="body">
        <div class="body-header">
            <div class="search-box" style="margin-left: 30px;width: 40%;">
                <DatePicker class="search-time" v-model="starttime" type="datetime" placeholder="开始时间"
                            style="margin-right: 10px">
                </DatePicker>
                <span>--</span>
                <DatePicker class="search-time" v-model="endtime" type="datetime" placeholder="结束时间"></DatePicker>
            </div>
            <Button type="primary" icon="ios-search" v-on:click="updateList" style="margin-left: 10px">搜索</Button>
        </div>
        <div class="body-content">
            <Table size="large" border :columns="columns1" :data="data1"></Table>
            <Page :total="pageCount" show-elevator @on-change="change"></Page>
        </div>
    </div>
</template>
<script>
    import expandRow from './ware_report-info.vue';

    export default {
        components: {expandRow},
        data() {
            return {
                reportdepar: '',
                reporttype: '',
                starttime: '',
                endtime: '',
                deparList: [],
                typeList: [],
                allTypes: {},
                columns1: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '物料名称',
                        key: 'name'
                    },
                    {
                        title: '入库',
                        key: 'wareInSum'
                    },
                    {
                        title: '出库',
                        key: 'wareOutSum'
                    },
                    {
                        title: '退回',
                        key: 'wareBackSum'
                    }

                ],
                data1: [],
                page: 1,
                pageCount: 0
            }
        },
        created() {
            this.getDeparList()
            this.getTypeList()
            this.updateList()
        },
        methods: {
            formatTen: function (num) {
                return num > 9 ? (num + "") : ("0" + num);
            },
            formatDate: function (date) {
                if (date == "") {
                    return;
                }
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                var second = date.getSeconds();
                return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) + " " + this.formatTen(hour) + ":" + this.formatTen(minute) + ":" + this.formatTen(second);
            },
            getTypeList: function () {
                this.get('resources/biz/wareType/type_list', {}, res => {
                    this.typeList = res.data.data
                }, err => {
                })
            },
            getDeparList: function () {
                this.get('resources/biz/department/all_department_list\n', {}, res => {
                    this.deparList = res.data.data
                }, err => {
                })
            },
            updateList: function () {
                this.get('resources/biz/ware/dept_report', {
                    page: this.page,
                    dept: this.reportdepar,
                    type: this.reporttype,
                    start: this.formatDate(this.starttime),
                    end: this.formatDate(this.endtime)
                }, res => {
                    this.pageCount = res.data.data.total;
                    this.data1 = res.data.data.list;
                }, err => {
                })
            },
            change: function (page) {
                this.page = page
                this.updateList()
            }
        }
    }

</script>

<style scoped lang="less">
    .body-header {
        border-bottom: 1px solid #36fe05;
    }
    .body-header .ivu-select .ivu-select-dropdown {
        top: 30px !important;
    }
    .search-box {
        white-space: nowrap;
        float: left;
        width: 25%;
        position: relative;
    }
    .search-box .ivu-select-selection {
        margin-left: 10px;
    }
</style>
<template>
    <div class="body">
        <Header></Header>
        <div class="body-header">
            <div class="search-box" style="width: 25%;margin-left: 300px;">创建时间
                <Date-picker v-model="timeValue" type="daterange" :options="search_time" placement="bottom-end"
                             placeholder="选择创建时间" style="width: 180px;margin-left: 10px"></Date-picker>
            </div>
            <Button type="primary" icon="ios-search" style="margin-right: 10px;"
                    v-on:click="updateList()">搜索
            </Button>
        </div>
        <div class="body-content">
            <Table size="large" :columns="columns1" :data="data1"></Table>
            <Page :total="pageCount" show-elevator @on-change="change"></Page>
        </div>
    </div>
</template>
<script>
    import Header from './header.vue';
    import expandRow from './feedback-info.vue';

    export default {
        components: {expandRow, Header},
        data() {
            return {
                timeValue: '',
                search_time: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
                pageCount: 0,
                page: 1,
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
                        title: '反馈内容',
                        key: '',
                        render: (h, params) => {
                            var str = params.row.content
                            if(str.length>=30){
                                return str.substr(0, 30)+"..."
                            }else{
                                return str.substr(0, 30)
                            }
                        }
                    },
                    {
                        title: '反馈人',
                        width: 300,
                        key: '',
                        render: (h, params) => {
                            if(params.row.name!=undefined){
                                return params.row.name +"("+ params.row.code+")"
                            }
                        }
                    },
                    {
                        title: '时间',
                        width: 300,
                        key: 'feedbackDate'
                    }
                ], data1: []
            }
        },
        created() {
            this.updateList();
        },
        methods: {
            change: function (page) {
                this.page = page
            },
            formatTen: function (num) {
                return num > 9 ? (num + "") : ("0" + num);
            },
            formatDate: function (date) {
                if (date == undefined || date == "") {
                    return "";
                }
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
            },
            updateList: function () {
                this.data1 = [];
                var params = new URLSearchParams();
                params.append("start", this.formatDate(this.timeValue[0]));
                params.append("end", this.formatDate(this.timeValue[1]));
                params.append("page", this.page);
                params.append("limit", 10);
                this.post('resources/biz/feedBack/web_list', params, res => {
                    console.log(res.data.data);
                    this.pageCount = res.data.count
                    this.data1 = res.data.data;
                }, err => {
                })
            }
        },
        watch: {
            page(newValue, oldValue) {
                console.log("oldValue = " + oldValue + " newValue = " + newValue)
                this.updateList()
            }
        }
    }
</script>

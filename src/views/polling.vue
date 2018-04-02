<style scoped lang="less">
    .body {
        margin: 0;
        background-color: #f5f7f9;
    }

    .body-header {
        border-bottom: 1px solid #36fe05;
    }

    .body-content {
        margin: -3px 0 0;
    }

    .con-content {
        margin: 2px 15px 0;
        padding-bottom: 15px;
        position: relative;
    }

    .body-content {
        position: absolute;
        display: inline-block;
        vertical-align: text-top;
    }

    .search-box {
        white-space: nowrap;
        float: left;
        width: 25%;
        position: relative;
    }

    .ivu-input-wrapper {
        margin-left: 10px;
        width: 70% !important;
    }

    .ivu-page {
        margin-top: 20px;
    }

    .demo-circle-custom {
        & h1 {
            color: #36fe05;
            font-size: 26px;
            font-weight: normal;
        }
        & p {
            color: #36fe05;
            font-size: 14px;
            margin: 10px 0 15px;
        }
        & span {
            display: block;
            padding-top: 10px;
            color: #36fe05;
            font-size: 14px;
            &:before {
                content: '';
                display: block;
                width: 50px;
                height: 1px;
                margin: 0 auto;
                background: #36fe05;
                position: relative;
                top: -15px;
            }
        ;
        }
        & span i {
            font-style: normal;
            color: #36fe05;
        }
    }

</style>
<style lang="less">
    .ivu-page-item-jump-prev a {
        color: #2d8cf0 !important;
    }

    .ivu-page-item-jump-next a {
        color: #2d8cf0 !important;
    }

    .search-box .ivu-select-selection {
        margin-left: 10px;
    }

    .ivu-table .demo-table-info-row td {
        background-color: #10293c;
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

    .ivu-table-large {
        border: 1px solid #36fe05 !important;
    }
</style>

<template>
    <div class="body">
        <Header></Header>
        <div class="body-header">
            <div class="search-box">巡检人工号
                <Input v-model="workerCode" placeholder="请输入巡检人工号"></Input>
            </div>
            <div class="search-box" style="width: 25%;margin-right: 17px;">创建时间
                <Date-picker v-model="timeValue" type="daterange" :options="search_time" placement="bottom-end"
                             placeholder="选择创建时间" style="width: 180px;margin-left: 10px"></Date-picker>
            </div>
            <Button type="primary" icon="ios-search" style="margin-right: 10px;"
                    v-on:click="updateList1();updateList3();">搜索
            </Button>
        </div>
        <div class="con-content">
            <div class="body-content" style="left:0;width:60%;">
                <Table size="large" :columns="columns1" :data="data1"></Table>
                <Page :total="pageCount1" show-elevator @on-change="change1"></Page>
            </div>
            <div class="body-content" style="right:0;width:38%;">
                <div style="width:60%;display: inline-block">
                    <Table size="large" :columns="columns2" :data="data2"></Table>
                </div>
                <div style="margin-top:30px;margin-left:8%;width: 30%;display: inline-block">
                    <Circle :size="180" :trail-width="4" :stroke-width="5" :percent="polling_rate"
                            stroke-linecap="square"
                            stroke-color="rgb(255, 72, 0)">
                        <div class="demo-circle-custom">
                            <h1 style="color: rgb(255, 235, 0)">{{polling_sum}}</h1>
                            <p>存疑次数</p>
                            <span>存疑率<i style="color:#f90;font-size: 1.5em;">{{polling_rate}}</i>%</span>
                        </div>
                    </Circle>
                </div>
                <p style="font-size: 18px;text-align: center;color: #36fe05;margin: 60px auto 30px;">
                    存疑巡检</p>
                <Table size="large" :columns="columns3" :data="data3"></Table>
                <Page :total="pageCount3" show-elevator @on-change="change3"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from './header.vue';
    import expandRow from './polling-info.vue';

    export default {
        components: {expandRow, Header},
        data() {
            return {
                polling_sum: '',
                polling_rate: '',
                timeValue: '',
                workerCode: '',
                pageCount1: 0,
                pageCount3: 0,
                page1: 1,
                page3: 1,
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
                        title: '巡检时间',
                        key: 'createdDate',
                        width: 200
                    },
                    {
                        title: '巡检地点',
                        key: 'location'
                    },
                    {
                        title: '巡检人',
                        key: '',
                        width: 230,
                        render: (h, params) => {
                            return params.row.name + "(" + params.row.code + ")"
                        }
                    },
                    {
                        title: '状态',
                        key: 'normal',
                        width: 100,
                        render: (h, params) => {
                            if (params.row.normal.indexOf("0") > -1) {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            color: 'rgb(255, 152, 0) !important'
                                        }
                                    }, '报修')
                                ]);
                            } else {
                                return "正常"
                            }
                        }
                    }
                ],
                columns2: [
                    {
                        title: '巡检存疑次数',
                        key: '',
                        render: (h, params) => {
                            this.polling_sum = params.row.num - params.row.valdNum
                            return this.polling_sum
                        }
                    },
                    {
                        title: '存疑率',
                        key: '',
                        render: (h, params) => {
                            var rateNum = ((params.row.num - params.row.valdNum) / params.row.num).toFixed(4);
                            this.polling_rate = (rateNum * 100).toFixed(2);
                            return this.polling_rate + "%"
                        }
                    }
                ],
                columns3: [
                    {
                        title: '巡检时间',
                        key: 'createdDate',
                        width: 200
                    },
                    {
                        title: '巡检地点',
                        key: 'location'
                    },
                    {
                        title: '巡检人',
                        key: '',
                        width: 230,
                        render: (h, params) => {
                            return params.row.name + "(" + params.row.code + ")"
                        }
                    }
                ],
                data1: [],
                data2: [],
                data3: [],
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
                }
            }
        },
        created() {
            this.updateList1();
            this.updateList2();
            this.updateList3();
            setInterval(() => {
                this.polling_sum = ''
                this.polling_rate = ''
                this.updateList1();
                this.updateList2();
                this.updateList3();
            }, 300000)
        },
        methods: {
            change1: function (page) {
                this.page1 = page
                this.updateList1()
            },
            change3: function (page) {
                this.page3 = page
                this.updateList3()
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
            updateList1: function () {
                this.data1 = [];
                var params = new URLSearchParams();
                params.append("page", this.page1);
                params.append("pageSize", 10);
                params.append("workerCode", this.workerCode);
                params.append("start", this.formatDate(this.timeValue[0]));
                params.append("end", this.formatDate(this.timeValue[1]));
                this.post('resources/biz/inspectionRecord/task_list', params, res => {
                    console.log("---", res.data.data)
                    this.pageCount1 = res.data.count
                    let array = res.data.data;
                    for (var i = 0; i < array.length; i++) {
                        var project = []
                        if (array[i].inspectionId != undefined && array[i].inspectionId != "") {
                            var inspectionId = array[i].inspectionId.split("@")
                            var content = array[i].content.split("@")
                            var normal = array[i].normal.split("@")
                            var orderId = array[i].orderId.split("@")
                            for (var p = 0; p < inspectionId.length; p++) {
                                if (inspectionId[p] != "") {
                                    var isnormal = "否"
                                    var fontColor = {}
                                    var showStyle = {}
                                    fontColor.color = "rgb(255, 152, 0) !important"
                                    showStyle.display = 'block'
                                    if (normal[p] == 1) {
                                        isnormal = "是"
                                        fontColor.color = "#36fe05 !important"
                                    }
                                    if(orderId[p] == 0){
                                        showStyle.display = 'none'
                                    }
                                    project.push({
                                        fontColorStyle: fontColor,
                                        showStyle: showStyle,
                                        name: inspectionId[p],
                                        content: content[p],
                                        normal: isnormal,
                                        orderId: orderId[p],
                                    })
                                }
                            }
                        }
                        var b = {};
                        b.createdDate = array[i].createdDate;
                        b.location = array[i].location;
                        b.name = array[i].name;
                        b.code = array[i].code;
                        b.inspectionId = array[i].inspectionId;
                        b.normal = array[i].normal;
                        b.project = project;
                        this.data1.push(b);
                    }
                }, err => {
                }, false)
            },
            updateList2: function () {
                this.data2 = [];
                var params = new URLSearchParams();
                params.append("workerCode", this.workerCode);
                this.post('resources/biz/inspectionRecord/inspection_count', params, res => {
                    console.log(res.data.data)
                    this.data2.push(res.data.data)
                }, err => {
                }, false)
            },
            updateList3: function () {
                this.data3 = [];
                var params = new URLSearchParams();
                params.append("isActive", false);
                params.append("page", this.page3);
                params.append("pageSize", 10);
                params.append("workerCode", this.workerCode);
                params.append("start", this.formatDate(this.timeValue[0]));
                params.append("end", this.formatDate(this.timeValue[1]));
                this.post('resources/biz/inspectionRecord/task_list', params, res => {
                    this.pageCount3 = res.data.count
                    this.data3 = res.data.data
                }, err => {
                }, false)
            },
        }
    }
</script>

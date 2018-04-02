<style scoped lang="less">
    body {
        margin: 0;
        background-color: #f5f7f9 !important;
    }

    #clock {
        height: auto;
    }

    .body-title {
        background-color: #06251d;
        width: 100%;
        height: 80px;
        text-align: right;
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

    .body-title .backLogin {
        float: right;
        padding: 10px;
        color: #898c8b;
        text-decoration: underline;
        font-size: 13px;
    }

    .body-title .backLogin:hover {
        color: #36fe05 !important;
    }

    .con-content {
        width: 97%;
        margin: 0 auto;
    }

    .body-content {
        display: inline-block;
        /*width: 19%;*/
        vertical-align: text-top;
        margin: 0;
    }

    .body-content:not(:last-child){
        margin-right: 0.5%;
    }

    .body-content_1 {
        width: 16%;
    }

    .body-content_2 {
        width: 15%;
    }

    .body-content_3 {
        width: 15%;
    }

    .body-content_4 {
        width: 29%;
    }

    .body-content_5 {
        width: 21%;
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

    .search-box {
        white-space: nowrap;
        float: left;
        width: 250px;
    }

    .ivu-input-wrapper {
        margin-left: 10px;
    }

    .ivu-page {
        margin-top: 20px;
    }

    .item_menu_1 {
        width: 14%;
    }

    .item_menu_2 {
        width: 21%;
    }

    .item_menu_3 {
        width: 10%;
    }

    .item_menu_4 {
        width: 35%;
    }

    .item_menu_5 {
        width: 18%;
    }

    .model_title {
        display: none;
    }

    @media screen and (max-width: 500px) {
        .pc_div {
            display: none !important;
        }

        .body-title span {
            font-size: 20px !important;
        }

        .body-content {
            width: 100%;
        }

        .model_title {
            display: block;
            text-align: center;
            color: #36fe05;
            line-height: 70px;
        }
    }
</style>
<style>
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

    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
        border-bottom: none !important;
    }

    .ivu-menu-horizontal.ivu-menu-light:after {
        background-color: transparent !important;
    }

    .ivu-chart-circle-inner {
        top: 51% !important;
    }

    ivu-table-cell span {
        white-space: nowrap;
    }

    .console-menu {
        width: 95% !important;
    }

    .console-menu .ivu-menu-item {
        color: #ff4800 !important;
        text-align: center;
        font-size: 1.3em !important;
    }

    .body-content_5 .ivu-table-tbody td:not(:first-child) .ivu-table-cell {
        white-space: nowrap;
        padding-left: 0;
        padding-right: 0;
    }
</style>

<template>
    <div class="body">
        <div class="header">
            <div class="body-title">
                <img src="../images/logo.png">
                <span>复旦大学附属中山医院</span>
                <Clock class="pc_div"></Clock>
                <iframe class="pc_div" style="margin-right: 60px" allowtransparency="true" frameborder="0" width="410"
                        height="98"
                        scrolling="no"
                        src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=1&v=0&d=2&bd=0&k=&f=00ff40&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=57036&w=410&h=98&align=right"></iframe>
                <a class="backLogin pc_div" v-on:click="backLogin">退出登录</a>
            </div>
            <Menu mode="horizontal" active-key="1" class="pc_div">
                <div class="layout-assistant console-menu">
                    <li class="ivu-menu-item item_menu_1">报修单</li>
                    <li class="ivu-menu-item item_menu_2">送水单、保洁单</li>
                    <li class="ivu-menu-item item_menu_3">运送单</li>
                    <li class="ivu-menu-item item_menu_4">巡检记录</li>
                    <li class="ivu-menu-item item_menu_5">统计工单数据</li>
                </div>
            </Menu>
            <!--<a href="https://talkus.cn" style="position: fixed;bottom: 20px;right: 40px;z-index:9999">
                <img src="../images/logo-cn-res.png" width="160" height="60"/>
            </a>-->
        </div>
        <div class="con-content">
            <p class="model_title">报修单</p>
            <div class="body-content body-content_1">
                <!--<Table size="large" :row-class-name="rowClassName" :columns="columns1" :data="data1_1"></Table>-->
                <Table size="default" :row-class-name="rowClassName" :columns="columns1" :data="data1_1"></Table>
                <Page :total="pageCount1_1" show-elevator @on-change="change1_1"></Page>
            </div>
            <p class="model_title">送水单、保洁单</p>
            <div class="body-content body-content_2">
                <Table size="default" :row-class-name="rowClassName" :columns="columns1" :data="data1_2"></Table>
                <Page :total="pageCount1_2" show-elevator @on-change="change1_2"></Page>
            </div>
            <p class="model_title">运送单</p>
            <div class="body-content body-content_3">
                <Table size="default" :row-class-name="rowClassName" :columns="columns1" :data="data1_3"></Table>
                <Page :total="pageCount1_3" show-elevator @on-change="change1_3"></Page>
            </div>
            <p class="model_title">巡检记录</p>
            <div class="body-content body-content_4">
                <Table size="default" :columns="columns2" :data="data2"></Table>
                <Page :total="pageCount2" show-elevator @on-change="change2"></Page>
            </div>
            <p class="model_title">统计工单数据</p>
            <div class="body-content body-content_5">
                <Table size="default" :columns="columns3" :data="data3"></Table>
                <div style="margin-top: 30px;display: flex;justify-content: space-around;">
                    <Circle :size="145" :trail-width="4" :stroke-width="5" :percent="day_rate1" stroke-linecap="square"
                            stroke-color="rgb(255, 72, 0)">
                        <div class="demo-circle-custom">
                            <h1 style="color: rgb(255, 235, 0)">{{day_sum}}</h1>
                            <p>日统计</p>
                            <span>完成率<i style="color:#f90;font-size: 1.5em;">{{day_rate1}}</i>%</span>
                        </div>
                    </Circle>
                    <Circle :size="145" :trail-width="4" :stroke-width="5" :percent="day_rate2" stroke-linecap="square"
                            stroke-color="#2b85e4">
                        <div class="demo-circle-custom">
                            <h1 style="color: rgb(255, 235, 0)">{{day_sum}}</h1>
                            <p>日统计</p>
                            <span>主动报修率<br><i style="color:#f90;font-size: 1.5em;line-height: 1.3em;">{{day_rate2}}</i>%</span>
                        </div>
                    </Circle>
                </div>
                <!--    <div style="margin-top: 30px">
                        <Circle :size="150" :trail-width="4" :stroke-width="5" :percent="75" stroke-linecap="square"
                                stroke-color="#36fe05" style="margin: 0 5%">
                            <div class="demo-circle-custom">
                                <h1>{{month_sum}}</h1>
                                <p>月度统计</p>
                                <span>完成率<i>{{month_rate1}}</i></span>
                            </div>
                        </Circle>
                        <Circle :size="150" :trail-width="4" :stroke-width="5" :percent="75" stroke-linecap="square"
                                stroke-color="#36fe05">
                            <div class="demo-circle-custom">
                                <h1>{{month_sum}}</h1>
                                <p>月度统计</p>
                                <span>主动报修率<i>{{month_rate2}}</i></span>
                            </div>
                        </Circle>
                    </div>
                    <div style="margin-top: 30px">
                        <Circle :size="150" :trail-width="4" :stroke-width="5" :percent="75" stroke-linecap="square"
                                stroke-color="#36fe05" style="margin: 0 5%">
                            <div class="demo-circle-custom">
                                <h1>{{year_sum}}</h1>
                                <p>日统计</p>
                                <span>完成率<i>{{year_rate1}}</i></span>
                            </div>
                        </Circle>
                        <Circle :size="150" :trail-width="4" :stroke-width="5" :percent="75" stroke-linecap="square"
                                stroke-color="#36fe05">
                            <div class="demo-circle-custom">
                                <h1>{{year_sum}}</h1>
                                <p>日统计</p>
                                <span>主动报修率<i>{{year_rate2}}</i></span>
                            </div>
                        </Circle>
                    </div>-->
            </div>
        </div>
    </div>
</template>
<script>
    import expandRow from './console-info.vue';
    import Clock from './clock.vue';

    export default {
        components: {expandRow, Clock},
        data() {
            return {
                day_sum: 0,
                day_rate1: 0,
                day_rate2: 0,
                month_sum: 0,
                month_rate1: 0,
                month_rate2: 0,
                year_sum: 0,
                year_rate1: 0,
                year_rate2: 0,
                assignerid: sessionStorage.userId,
                orderid: '',
                orderType: '',
                pageCount1_1: 0,
                pageCount1_2: 0,
                pageCount1_3: 0,
                pageCount2: 0,
                page1_1: 1,
                page1_2: 1,
                page1_3: 1,
                page2: 1,
                columns1: [
                    {
                        title: '单号',
                        key: 'orderNumber',
                        render: (h, params) => {
                            var str = params.row.orderNumber
                            return str.substr(0, 1) + str.substr(str.length - 4, str.length)
                        }
                    },
                    {
                        title: '发起者',
                        key: 'authorName'
                    },
                    {
                        title: '状态',
                        key: 'state'
                    }
                    /*{
                        title: '工单类型',
                        key: 'orderType'
                    }*/
                ],
                columns2: [
                    {
                        title: '巡检时间',
                        key: 'createdDate'
                    },
                    {
                        title: '巡检地点',
                        key: 'location'
                    },
                    {
                        title: '巡检人',
                        key: 'name',
                        width: 90
                    },
                    {
                        title: '状态',
                        key: 'normal',
                        width: 90,
                        render: (h, params) => {
                            if (params.row.normal.indexOf("0") > -1) {
                                return "报修"
                            } else {
                                return "正常"
                            }
                        }
                    }
                ],
                columns3: [
                    {
                        title: '统计类型',
                        key: 'title',
                        width: 50
                    },
                    {
                        title: '报修总数',
                        key: 'allNum'
                    },
                    {
                        title: '完成数量',
                        key: 'finishNum'
                    },
                    {
                        title: '主动报修数',
                        key: 'activeNum'
                    },
                    {
                        title: '完成率',
                        key: '',
                        render: (h, params) => {
                            return ((params.row.finishNum / params.row.allNum).toFixed(4) * 100).toFixed(0) + "%"
                        }
                    },
                    {
                        title: '主动报修率',
                        key: 'activeNum',
                        render: (h, params) => {
                            return ((params.row.activeNum / params.row.allNum).toFixed(4) * 100).toFixed(0) + "%"
                        }
                    }
                ],
                data1_1: [],
                data1_2: [],
                data1_3: [],
                data2: [],
                data3: []
            }
        },
        created() {
            this.updateList1(1);
            setInterval(() => {
                this.updateList1(1);
            }, 300000)
            this.updateList1(2);
            setInterval(() => {
                this.updateList1(2);
            }, 300000)
            this.updateList1(3);
            setInterval(() => {
                this.updateList1(3);
            }, 300000)

            this.updateList2();
            setInterval(() => {
                this.updateList2();
            }, 300000)

            this.updateList3();
            setInterval(() => {
                this.updateList3();
            }, 300000)
        },
        methods: {
            backLogin() {
                sessionStorage.userId = ""
                sessionStorage.codeId = ""
                this.$router.replace('/')
            },
            rowClassName(row) {
                if (row.state === "已创建" || row.state === "维修员退回") {
                    return 'demo-table-info-row';
                }
                return '';
            },
            change1_1: function (page) {
                this.page1_1 = page
                this.updateList1(1)
            },
            change1_2: function (page) {
                this.page1_2 = page
                this.updateList1(2)
            },
            change1_3: function (page) {
                this.page1_3 = page
                this.updateList1(3)
            },
            change2: function (page) {
                this.page2 = page
                this.updateList2()
            },
            updateList1: function (type) {
                var params = new URLSearchParams();
                params.append("limit", 10);
                switch (type) {
                    case 1:
                        this.data1_1 = [];
                        params.append("page", this.page1_1);
                        params.append("orderType", "REPAIR");
                        break;
                    case 2:
                        this.data1_2 = [];
                        params.append("page", this.page1_2);
                        params.append("orderType", "WATER,CLEANER");
                        break;
                    case 3:
                        this.data1_3 = [];
                        params.append("page", this.page1_3);
                        params.append("orderType", "DELIVER");
                        break;
                }
                this.post('resources/biz/repairOrder/web_order_list', params, res => {
                    console.log(type, res.data.count, res.data.data);
                    let array = res.data.data;
                    switch (type) {
                        case 1:
                            this.pageCount1_1 = res.data.count
                            break;
                        case 2:
                            this.pageCount1_2 = res.data.count
                            break;
                        case 3:
                            this.pageCount1_3 = res.data.count
                            break;
                    }
                    for (var i = 0; i < array.length; i++) {
                        var orderType = "";
                        switch (array[i].orderType) {
                            case "REPAIR":
                                orderType = "报修单";
                                break;
                            case "WATER":
                                orderType = "送水单";
                                break;
                            case "DELIVER":
                                orderType = "运送单";
                                break;
                            case "CLEANER":
                                orderType = "保洁单";
                                break;
                        }
                        var b = {};
                        b.orderNumber = array[i].orderNumber;
                        b.authorName = array[i].authorName;
                        b.orderType = orderType;
                        b.state = array[i].state;
                        switch (type) {
                            case 1:
                                this.data1_1.push(b);
                                break;
                            case 2:
                                this.data1_2.push(b);
                                break;
                            case 3:
                                this.data1_3.push(b);
                                break;
                        }
                    }
                }, err => {
                }, false)
            },
            updateList2: function () {
                this.data2 = [];
                var params = new URLSearchParams();
                params.append("page", this.page2);
                params.append("pageSize", 10);
                this.post('resources/biz/inspectionRecord/task_list', params, res => {
                    let array = res.data.data;
                    // console.log(res.data.data)
                    this.pageCount2 = res.data.count
                    this.data2 = res.data.data
                }, err => {
                }, false)
            },
            updateList3: function () {
                this.data3 = []
                var params = new URLSearchParams();
                params.append("type", "day");
                this.post('resources/biz/repairOrder/repair_order_count', params, res => {
                    // console.log("----------",res.data.data);
                    var b = {};
                    b.title = "日统计";
                    b.allNum = res.data.data.allNum;
                    b.finishNum = res.data.data.finishNum;
                    b.activeNum = res.data.data.activeNum;
                    this.data3.push(b);
                    this.day_sum = res.data.data.allNum;
                    this.day_rate1 = ((res.data.data.finishNum / res.data.data.allNum).toFixed(4) * 100).toFixed(0);
                    this.day_rate2 = ((res.data.data.activeNum / res.data.data.allNum).toFixed(4) * 100).toFixed(0);
                    var params = new URLSearchParams();
                    params.append("type", "month");
                    this.post('resources/biz/repairOrder/repair_order_count', params, res => {
                        console.log(res.data.data);
                        var b = {};
                        b.title = "月度统计";
                        b.allNum = res.data.data.allNum;
                        b.finishNum = res.data.data.finishNum;
                        b.activeNum = res.data.data.activeNum;
                        this.data3.push(b);
                        var params = new URLSearchParams();
                        params.append("type", "year");
                        this.post('resources/biz/repairOrder/repair_order_count', params, res => {
                            console.log(res.data.data);
                            var b = {};
                            b.title = "年度统计";
                            b.allNum = res.data.data.allNum;
                            b.finishNum = res.data.data.finishNum;
                            b.activeNum = res.data.data.activeNum;
                            this.data3.push(b);
                        }, err => {
                        }, false)
                    }, err => {
                    }, false)
                }, err => {
                }, false)
            }
        }
    }
</script>

<style scoped lang="less">
    .body {
        margin: 0;
        background-color: #f5f7f9;
    }

    .body-content {
        margin: 0 15px 15px;
        padding-bottom: 15px;
    }

    .switchBtn {
        margin-bottom: 20px;
    }

    .search-box {
        white-space: nowrap;
        float: left;
        width: 12%;
        position: relative;
    }

    .ivu-input-wrapper {
        margin-left: 10px;
        width: 100% !important;
    }

    .ivu-page {
        margin-top: 20px;
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
        width: 70% !important;
    }

    .search-box .ivu-select-dropdown {
        right: 0;
    }

    .search-box .ivu-cascader-rel {
        width: 100% !important;
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
        left: 60px !important;
    }

    .contenteditable {
        border: 1px solid #ccc;
        color: #ccc;
        padding: 5px;
    }

    .layout-assistant {
        width: 400px;
        margin: 0 auto;
        height: inherit;
    }

    .layout-assistant .itemBtn {
        width: 70px;
        margin: 0 30px;
        text-align: center;
    }

    .ivu-select {
        width: 70% !important;
    }
</style>

<template>
    <div class="body">
        <Header></Header>
        <div class="body-header" style="position: relative;">
            <p class="switchBtn" v-on:click="switchPage">
                <Icon type="arrow-swap" style="margin-right: 10px"></Icon>
                去派送工单
            </p>
            <Dropdown style="position: absolute;right: 10px;top:15px;">
                <Button type="primary">
                    <Icon type="ios-download-outline" style="margin-right: 10px"></Icon>
                    导出工单
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <a v-on:click="exportModal('REPAIR')">
                        <DropdownItem>导出报修工单</DropdownItem>
                    </a>
                    <a v-on:click="exportModal('WATER')">
                        <DropdownItem>导出送水工单</DropdownItem>
                    </a>
                    <a v-on:click="exportModal('CLEANER')">
                        <DropdownItem>导出保洁工单</DropdownItem>
                    </a>
                    <a v-on:click="exportModal('DELIVER')">
                        <DropdownItem>导出运送工单</DropdownItem>
                    </a>
                </DropdownMenu>
            </Dropdown>
            <div class="search-box" style="margin-left: 5px;">工单类型
                <Select v-model="search_orderType">
                    <Option value="">全部</Option>
                    <Option value="REPAIR">报修单</Option>
                    <Option value="WATER">送水单</Option>
                    <Option value="DELIVER">运送单</Option>
                    <Option value="CLEANER">保洁单</Option>
                </Select>
            </div>
            <div class="search-box" style="margin-left: -5px;">报修单类型
                <Select v-model="search_repairType">
                    <Option value="">全部</Option>
                    <Option value="水">水</Option>
                    <Option value="电">电</Option>
                    <Option value="木">木</Option>
                    <Option value="空">空</Option>
                    <Option value="杂">杂</Option>
                    <Option value="弱">弱</Option>
                    <Option value="床">床</Option>
                </Select>
            </div>
            <div class="search-box" style="margin-left: 5px;">工单状态
                <Select v-model="search_state">
                    <Option value="">全部</Option>
                    <Option value="已创建">已创建</Option>
                    <Option value="维修员退回">维修员退回</Option>
                    <Option value="维修小组长退回">维修小组长退回</Option>
                    <Option value="已分配给维修小组长">已分配给维修小组长</Option>
                    <Option value="已分配给维修员">已分配给维修员</Option>
                    <Option value="已完成">已完成</Option>
                    <Option value="待评价">待评价</Option>
                </Select>
            </div>
            <div class="search-box" style="width: 10%;margin-right: 60px;">执行人工号
                <Input v-model="search_executor" placeholder="请输入执行人工号"></Input>
            </div>
            <div class="search-box" style="width: 15%;margin-right: 30px;">创建时间
                <Date-picker v-model="timeValue" type="daterange" :options="search_time" placement="bottom-end"
                             placeholder="选择创建时间" style="width: 180px"></Date-picker>
            </div>
            <div class="search-box" style="width: 15%;margin-left: 5px;">地址
                <Cascader :data="add_location" v-model="search_Location"
                          style="display: inline-block;width: 200px;"></Cascader>
            </div>
            <div style="float: right">
                <Button type="primary" icon="ios-search" style="margin-right: 10px"
                        v-on:click="updateList">搜索
                </Button>
                <Button type="primary" v-on:click="addOrder">
                    <Icon type="plus-round"></Icon>
                    新增工单
                </Button>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="body-content">
            <Table size="large" :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
            <Page :total="pageCount" show-elevator @on-change="change"></Page>
            <Table size="large" :columns="columns2" :data="data2" ref="table"
                   style="background-color: black;display:none;"></Table>
        </div>
        <Modal v-model="modal" title="分配人员选择" :loading="loading" @on-ok="allotSubmit">
            <Row class="expand-row" v-bind:style="deptStyle">
                <Col span="4" style="line-height: 30px;">
                部门选择
                </Col>
                <Col span="20">
                <Select v-model="deptname" style="margin-bottom: 20px" @on-change="allotChoice">
                    <Option v-for="item in deptList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
                </Col>
            </Row>
            <Row class="expand-row" v-bind:style="workerStyle">
                <Col span="4" style="line-height: 30px;">
                人员选择
                </Col>
                <Col span="20">
                <Select v-model="workername" style="margin-bottom: 20px">
                    <Option v-for="item in workerList" :value="item.id" :key="item.id">{{ item.name }} ({{ item.code
                        }})
                    </Option>
                </Select>
                </Col>
            </Row>
            <!--<Row class="expand-row" v-bind:style="styleObject">
                <Col span="4" style="line-height: 30px;">
                类型选择
                </Col>
                <Col span="20">
                <Select v-model="workerstate">
                    <Option value="内修">内修</Option>
                    <Option value="外修">外修</Option>
                </Select>
                </Col>
            </Row>-->
        </Modal>
        <Modal id="add_modal" v-model="add_modal" title="新增工单" :loading="add_loading" @on-ok="addSubmit">
            <Form :model="formItem" :label-width="140" v-bind:style="deliverStyle">
                <FormItem label="">
                    <RadioGroup v-model="formItem.addType" @on-change="selectAddType">
                        <Radio label="报修"></Radio>
                        <Radio label="送水"></Radio>
                        <Radio label="紧急保洁"></Radio>
                        <Radio label="运送"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="初始地点">
                    <Cascader :data="add_get" v-model="formItem.get" style="margin-left: 10px;"></Cascader>
                </FormItem>
                <FormItem label="送达地点">
                    <Cascader :data="add_send" v-model="formItem.send" style="margin-left: 10px;"></Cascader>
                </FormItem>
                <FormItem label="运送类型">
                    <Select v-model="formItem.type" style="margin-left: 10px;">
                        <Option v-for="item in add_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="携带工具">
                    <Select v-model="formItem.carryTools" style="margin-left: 10px;">
                        <Option v-for="item in add_carryTools" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="执行时间段">
                    <Select v-model="formItem.time" style="margin-left: 10px;">
                        <Option v-for="item in add_time" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <!--<FormItem label="运送人员">
                    <Select v-model="formItem.user" style="margin-left: 10px;">
                        <Option v-for="item in add_user" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>-->
                <FormItem label="备注">
                    <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="备注"></Input>
                </FormItem>
            </Form>
            <Form :model="formItem" :label-width="140" v-bind:style="otherStyle">
                <FormItem label="">
                    <RadioGroup v-model="formItem.addType" @on-change="selectAddType">
                        <Radio label="报修"></Radio>
                        <Radio label="送水"></Radio>
                        <Radio label="紧急保洁"></Radio>
                        <Radio label="运送"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="地点">
                    <Cascader :data="add_location" v-model="formItem.other_Location"
                              style="margin-left: 10px;"></Cascader>
                </FormItem>
                <FormItem label="类型" v-bind:style="addCommintStyle">
                    <Select v-model="formItem.other_type" style="margin-left: 10px;">
                        <Option v-for="item in commint_type" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="formItem.other_content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="备注"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="showImgBig" width="360px">
            <img v-bind:src="showImgUrl" ref="headerImg" width="300" height="300" alt="暂无照片">
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="showExportTime" width="450px" ok-text="开始导出" @on-ok="exportList">
            <p style="line-height: 80px">请选择您需要导出工单的创建时间段：</p>
            <Date-picker v-model="exportTime" type="daterange" :options="search_time" placement="bottom-end"
                         placeholder="选择创建时间" style="width: 260px;"></Date-picker>
            <p style="line-height: 50px;margin-bottom: 15px;color: #f90 !important;">(不选时默认导出全部)</p>
        </Modal>
    </div>
</template>
<script>
    import Header from './header.vue';
    import expandRow from './orderlist-info.vue';

    export default {
        components: {expandRow, Header},
        data() {
            return {
                orderDetailId: '',
                showImgBig: false,
                showImgUrl: "",
                timeValue: '',
                deptStyle: {
                    display: 'none'
                },
                workerStyle: {
                    display: 'none'
                },
                formItem: {
                    get: [],
                    send: [],
                    type: '',
                    time: '',
                    // user: '',
                    content: '',
                    carryTools: '',
                    other_Location: [],
                    other_type: '',
                    other_content: '',
                    addType: '报修'
                },
                commint_type: [],
                add_get: [],
                add_send: [],
                add_location: [],
                add_type: [],
                add_carryTools: [],
                add_time: [],
                // add_user: [],
                add_load1: false,
                add_load2: false,
                add_load3: false,
                loading: true,
                add_loading: true,
                styleObject: {
                    display: 'none'
                },
                deliverStyle: {
                    display: 'none'
                },
                otherStyle: {
                    display: ''
                },
                addCommintStyle: {
                    display: ''
                },
                imgurl: "",
                assignerid: sessionStorage.userId,
                orderid: '',
                orderType: '',
                orderTypeStr: '',
                orderState: '',
                modal: false,
                add_modal: false,
                exportTime: "",
                currentExportType: "",
                showExportTime: false,
                workerstate: '',
                deptname: '',
                deptList: [],
                workername: '',
                workerList: [],
                search_orderType: '',
                search_repairType: '',
                search_state: '',
                search_executor: '',
                search_Location: '',
//                isLeader: '',
//                isUrgent: '',
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
                        title: '单号',
                        key: 'orderNumber',
                        render: (h, params) => {
                            var str = params.row.orderNumber
                            if (params.row.isActive) {
                                if (params.row.enabled) {
                                    return h('div', [
                                        h('span', {}, str.substr(0, 1) + str.substr(str.length - 4, str.length)),
                                        h('span', {
                                            style: {
                                                color: '#ff4800  !important',
                                                border: '1px solid #ff4800 ',
                                                fontSize: '1em',
                                                borderRadius: '50%',
                                                padding: '0 0.2em',
                                                display: 'inline-block',
                                                transform: 'scale(0.7)',
                                                marginLeft: '5px'
                                            }
                                        }, '巡')
                                    ]);
                                } else {
                                    return h('div', [
                                        h('span', {}, str.substr(0, 1) + str.substr(str.length - 4, str.length)),
                                        h('span', {
                                            style: {
                                                color: '#ff4800  !important',
                                                border: '1px solid #ff4800 ',
                                                fontSize: '1em',
                                                borderRadius: '50%',
                                                padding: '0 0.2em',
                                                display: 'inline-block',
                                                transform: 'scale(0.7)',
                                                marginLeft: '5px'
                                            }
                                        }, '巡'),
                                        h('span', {
                                            style: {
                                                color: '#ff9800 !important'
                                            }
                                        }, ' ✎')
                                    ]);
                                }
                            } else {
                                if (params.row.enabled) {
                                    return str.substr(0, 1) + str.substr(str.length - 4, str.length)
                                } else {
                                    return h('div', [
                                        h('span', {}, str.substr(0, 1) + str.substr(str.length - 4, str.length)),
                                        h('span', {
                                            style: {
                                                color: '#ff9800 !important'
                                            }
                                        }, ' ✎')
                                    ]);
                                }
                            }
                        }
                    },
                    {
                        title: '发起者',
                        key: 'authorName',
                        render: (h, params) => {
                            if (params.row.isLeader) {
                                return h('p', {
                                    style: {
                                        color: 'rgb(255, 72, 0)  !important'
                                    },
                                    on: {
                                        click: () => {
                                            this.headerImageView(params.row.code);
                                        }
                                    }
                                }, params.row.authorName + "(" + params.row.code + ")")
                            } else {
                                return h('p', {
                                    on: {
                                        click: () => {
                                            this.headerImageView(params.row.code);
                                        }
                                    }
                                }, params.row.authorName + "(" + params.row.code + ")")
                            }
                        }
                    },
                    {
                        title: '状态',
                        key: 'state',
                        render: (h, params) => {
                            if (params.row.state == "维修小组长退回") {
                                return h('p', {
                                    style: {
                                        color: 'rgb(255, 72, 0)  !important'
                                    }
                                }, params.row.state)
                            } else {
                                return params.row.state
                            }
                        }
                    },
                    {
                        title: '工单类型',
                        key: 'orderType'
                    },
                    {
                        title: '创建时间',
                        key: 'createdDate'
                    },
                    {
                        title: '完成时间统计',
                        key: '',
                        render: (h, params) => {
                            if (params.row.state == "已完成") {
                                var date1 = new Date(params.row.createdDate)
                                var date2 = new Date(params.row.finishDate)
                                if (parseInt((date2 - date1) / 1000 / 60 / 60) < 1) {
                                    return parseInt((date2 - date1) / 1000 / 60) + "分钟"
                                } else {
                                    return parseInt((date2 - date1) / 1000 / 60 / 60).toFixed(1) + "小时"
                                }
                            } else {
                                return "---"
                            }
                        }
                    }
                ],
                data1: [],
                columns2: [],
                columnsREPAIR: [
                    {title: '单号', key: 'orderNumber'},
                    {title: '发起者', key: 'authorName'},
                    {title: '发起者工号', key: 'authorCode'},
                    {title: '状态', key: 'state'},
                    {title: '创建时间', key: 'createdDate'},
                    {title: '完成时间统计(小时)', key: 'finshDate'},
                    {title: '报修单类型', key: 'classify'},
                    // {title: '位置', key: 'location'},
                    {title: '院', key: 'fir'},
                    {title: '楼号', key: 'sec'},
                    {title: '层级', key: 'thir'},
                    {title: '位置', key: 'fou'},
                    {title: '描述', key: 'content'},
                    {title: '类型', key: 'type'},
                    {title: '分配者', key: 'assignerName'},
                    {title: '执行者', key: 'executorName'},
                    {title: '来源', key: 'actived'},


                ],
                columnsWATER: [
                    {title: '单号', key: 'orderNumber'},
                    {title: '发起者', key: 'authorName'},
                    {title: '发起者工号', key: 'authorCode'},
                    {title: '状态', key: 'state'},
                    {title: '创建时间', key: 'createdDate'},
                    {title: '完成时间统计(小时)', key: 'finshDate'},
                    // {title: '位置', key: 'location'},
                    {title: '院', key: 'fir'},
                    {title: '楼号', key: 'sec'},
                    {title: '层级', key: 'thir'},
                    {title: '位置', key: 'fou'},
                    {title: '描述', key: 'content'},
                    {title: '分配者', key: 'assignerName'},
                    {title: '执行者', key: 'executorName'}
                ],
                columnsCLEANER: [
                    {title: '单号', key: 'orderNumber'},
                    {title: '发起者', key: 'authorName'},
                    {title: '发起者工号', key: 'authorCode'},
                    {title: '状态', key: 'state'},
                    {title: '创建时间', key: 'createdDate'},
                    {title: '完成时间统计(小时)', key: 'finshDate'},
                    // {title: '位置', key: 'location'},
                    {title: '院', key: 'fir'},
                    {title: '楼号', key: 'sec'},
                    {title: '层级', key: 'thir'},
                    {title: '位置', key: 'fou'},
                    {title: '描述', key: 'content'},
                    {title: '分配者', key: 'assignerName'},
                    {title: '执行者', key: 'executorName'}
                ],
                columnsDELIVER: [
                    {title: '单号', key: 'orderNumber'},
                    {title: '发起者', key: 'authorName'},
                    {title: '发起者工号', key: 'authorCode'},
                    {title: '状态', key: 'state'},
                    {title: '创建时间', key: 'createdDate'},
                    {title: '完成时间统计(小时)', key: 'finshDate'},
                    {title: '初始地点', key: 'takeGoods'},
                    {title: '送达地点', key: 'giveGoods'},
                    {title: '类型', key: 'type'},
                    {title: '执行时间段', key: 'executeTime'},
                    {title: '分配者', key: 'assignerName'},
                    {title: '执行者', key: 'executorName'}
                ],
                data2: [],
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
            if (this.$route.query.orderId) {
                this.orderDetailId = this.$route.query.orderId
            }

            this.addListData();
            this.updateList();

            //类型选择
            var type = []
            type.push('水')
            type.push('电')
            type.push('木')
            type.push('空')
            type.push('杂')
            type.push('弱')
            type.push('床')
            for (var t = 0; t < type.length; t++) {
                this.commint_type.push({value: type[t], label: type[t]})
            }
        },
        methods: {
            exportModal: function (type) {
                this.currentExportType = type
                this.showExportTime = true
                this.exportTime = ''
            },
            exportList: function () {
                switch (this.currentExportType) {
                    case "REPAIR":
                        var filename = "报修工单列表"
                        this.columns2 = this.columnsREPAIR;
                        break;
                    case "WATER":
                        var filename = "送水工单列表"
                        this.columns2 = this.columnsWATER;
                        break;
                    case "CLEANER":
                        var filename = "保洁工单列表"
                        this.columns2 = this.columnsCLEANER;
                        break;
                    case "DELIVER":
                        var filename = "运送工单列表"
                        this.columns2 = this.columnsDELIVER;
                        break;
                }
                this.data2 = [];
                this.get('resources/biz/order/web_order_list', {
                    type: this.currentExportType,
                    start: this.formatDate(this.exportTime[0]),
                    end: this.formatDate(this.exportTime[1])
                }, res => {
                    console.log(res.data.data)
                    for (var i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].fir == '16号楼') {
                            res.data.data[i].fou = res.data.data[i].thir + res.data.data[i].fou
                            res.data.data[i].thir = res.data.data[i].sec
                            res.data.data[i].sec = res.data.data[i].fir
                            res.data.data[i].fir = '东院'
                        }
                        if (i == res.data.data.length - 1) {
                            this.data2 = res.data.data;
                            let self = this;
                            setTimeout(function () {
                                self.$refs.table.exportCsv({
                                    filename: filename
                                });
                            }, 1000)
                        }
                    }
                }, err => {
                })
            },
            selectAddType: function () {
                this.formItem.get = [];
                this.formItem.send = [];
                this.formItem.type = '';
                this.formItem.time = '';
                // this.formItem.user = '';
                this.formItem.content = '';
                this.formItem.carryTools = '';
                this.formItem.other_Location = [];
                this.formItem.other_type = '';
                this.formItem.other_content = '';
                switch (this.formItem.addType) {
                    case "报修":
                        this.deliverStyle.display = "none"
                        this.otherStyle.display = "block"
                        this.addCommintStyle.display = "block"
                        break;
                    case "送水":
                        this.deliverStyle.display = "none"
                        this.otherStyle.display = "block"
                        this.addCommintStyle.display = "none"
                        break;
                    case "紧急保洁":
                        this.deliverStyle.display = "none"
                        this.otherStyle.display = "block"
                        this.addCommintStyle.display = "none"
                        break;
                    case "运送":
                        this.deliverStyle.display = "block"
                        this.otherStyle.display = "none"
                        break;
                }
            },
            headerImageView: function (code) {
                this.showImgUrl = "http://zsr.radioclassical.cn/avatar/" + code + ".jpg";
                this.showImgBig = true;
                this.$refs.headerImg.onerror = () => {
                    this.showImgUrl = "http://zsr.radioclassical.cn/avatar/" + code + ".JPG";
                    this.$refs.headerImg.onerror = () => {
                        this.showImgUrl = "";
                    }
                }
            },
            switchPage() {
                this.$router.replace('/operation')
            },
            rowClassName(row) {
                if (row.state === "已创建" || row.state === "维修小组长退回") {
                    return 'demo-table-info-row';
                }
                return '';
            },
            choiceState() {
                switch (this.orderType) {
                    case "报修单":
                        if (this.orderState === "维修员退回") {
                            this.orderTypeStr = "RESPONSIBLE"
                            this.deptStyle.display = "block"
                            this.workerStyle.display = "none"
                            this.deptChoice()
                        } else {
                            this.orderTypeStr = "FIX"
                            this.deptStyle.display = "none"
                            this.workerStyle.display = "block"
                            this.allotChoice()
                        }
                        break;
                    case "送水单":
                        this.orderTypeStr = "WATER"
                        this.deptStyle.display = "none"
                        this.workerStyle.display = "block"
                        this.allotChoice()
                        break;
                    case "运送单":
                        this.orderTypeStr = "DELIVER"
                        this.deptStyle.display = "none"
                        this.workerStyle.display = "block"
                        this.allotChoice()
                        break;
                    case "保洁单":
                        this.orderTypeStr = "CLEANER"
                        this.deptStyle.display = "none"
                        this.workerStyle.display = "block"
                        this.allotChoice()
                        break;
                }
                this.modal = true
            },
            deptChoice() {
                this.get('resources/biz/department/department_list', {}, res => {
                    this.deptList = res.data.data
                }, err => {
                })
            },
            allotChoice() {
                if (this.orderType == "报修单" && this.orderState == "维修员退回") {
                    if (this.deptname != "") {
                        this.get('resources/biz/worker/get_department', {
                                depart: this.deptname
                            }, res => {
                                if (res.data.data.length == 0) {
                                    this.workerList = []
                                    this.workerStyle.display = "none"
                                    this.$Message.warning('该部门下无负责人，无法进行指派！');
                                } else {
                                    this.workerList = []
                                    this.workerList = res.data.data
                                    this.workerStyle.display = "block"
                                }
                            },
                            err => {
                            })
                    } else {
                        this.workerStyle.display = "none"
                    }
                } else {
                    this.get('resources/biz/worker/get_by_role', {
                            role: this.orderTypeStr
                        }, res => {
                            this.workerList = []
                            this.workerList = res.data.data
                        },
                        err => {
                        })
                }
            },
            allotSubmit: function () {
                if (this.assignerid == "" || this.workername == "") {
                    this.$Message.warning('请选择部门及分配人！');
                    return;
                }

                var url = ""
                var params = new URLSearchParams();
                params.append("assigner", this.assignerid);
                params.append("id", this.orderid);
                switch (this.orderType) {
                    case "报修单":
                        url = "resources/biz/repairOrder/assign_repair_order"
                        params.append("responsible", this.workername);
//                        params.append("type", this.workerstate);
                        break;
                    case "送水单":
                        url = "resources/biz/order/assign_order"
                        params.append("executor", this.workername);
                        break;
                    case "运送单":
                        url = "resources/biz/distributionOrder/assign_order"
                        params.append("executor", this.workername);
                        break;
                    case "保洁单":
                        url = "resources/biz/order/assign_order"
                        params.append("executor", this.workername);
                        break;
                }
                this.post(url, params, res => {
                    this.modal = false
                    this.$Message.success('提交成功');
                    this.updateList();
                }, err => {
                    this.loading = false
                    this.$Message.error(err.response.data.message);
                })
            },
            resetMethod: function () {
                Object.assign(this.$data, this.$options.data())
                this.updateList()
            },
            change: function (page) {
                this.page = page
            },
            editorMethod: function () {
                console.log("编辑");
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
                var search_location = ''
                if (this.search_Location != "" && this.search_Location != undefined) {
                    search_location = this.search_Location[this.search_Location.length - 1]
                }
                this.data1 = [];
                var params = new URLSearchParams();
                params.append("page", this.page);
                params.append("limit", 10);
                params.append("orderId", this.orderDetailId);
                params.append("orderType", this.search_orderType);
                params.append("classify", this.search_repairType);
                params.append("state", this.search_state);
                params.append("location", search_location);
                params.append("executor", this.search_executor);
                params.append("start", this.formatDate(this.timeValue[0]));
                params.append("end", this.formatDate(this.timeValue[1]));
//                params.append("isLeader", this.isLeader);
//                params.append("isUrgent", this.isUrgent);
                this.post('resources/biz/repairOrder/web_order_list', params, res => {
                    let array = res.data.data;
                    console.log(res.data.data)
                    this.pageCount = res.data.count
                    for (var i = 0; i < array.length; i++) {
                        var creadVoiceStyle = "none";
                        var finishVoiceStyle = "none";
                        var creadImgStyle = "none";
                        var finishImgStyle = "none";

                        var picture = []
                        if (array[i].picture != undefined && array[i].picture != "") {
                            creadImgStyle = "block"
                            var imgData = array[i].picture.split(",")
                            for (var m = 0; m < imgData.length; m++) {
                                if (imgData[m] != "") {
                                    picture.push({url: imgData[m]})
                                }
                            }
                        }

                        var finish_picture = []
                        if (array[i].finishPicture != undefined && array[i].finishPicture != "") {
                            finishImgStyle = "block"
                            var finish_imgData = array[i].finishPicture.split(",")
                            for (var m = 0; m < finish_imgData.length; m++) {
                                if (finish_imgData[m] != "") {
                                    finish_picture.push({url: finish_imgData[m]})
                                }
                            }
                        }

                        var cread_voice = []
                        if (array[i].voice != undefined && array[i].voice != "") {
                            creadVoiceStyle = "block"
                            var cread_voiceData = array[i].voice.split(",")
                            for (var v = 0; v < cread_voiceData.length; v++) {
                                if (cread_voiceData[v] != "") {
                                    cread_voice.push({url: cread_voiceData[v]})
                                }
                            }
                        }
                        var finish_voice = []
                        if (array[i].finishVoice != undefined && array[i].finishVoice != "") {
                            finishVoiceStyle = "block"
                            var finish_voiceData = array[i].finishVoice.split(",")
                            for (var v = 0; v < finish_voiceData.length; v++) {
                                if (finish_voiceData[v] != "") {
                                    finish_voice.push({url: finish_voiceData[v]})
                                }
                            }
                        }

                        var orderType = "";
                        var showStyle = "";
                        var sendHide = "";
                        var sendShow = "";
                        var repairStyle = "";
                        switch (array[i].orderType) {
                            case "REPAIR":
                                orderType = "报修单";
                                repairStyle = "block";
                                showStyle = "block";
                                sendHide = "block";
                                sendShow = "none";
                                break;
                            case "WATER":
                                orderType = "送水单";
                                repairStyle = "none";
                                showStyle = "none";
                                sendHide = "block";
                                sendShow = "none";
                                break;
                            case "DELIVER":
                                orderType = "运送单";
                                repairStyle = "none";
                                showStyle = "block";
                                sendHide = "none";
                                sendShow = "block";
                                break;
                            case "CLEANER":
                                orderType = "保洁单";
                                repairStyle = "none";
                                showStyle = "none";
                                sendHide = "block";
                                sendShow = "none";
                                break;
                        }
                        var isUrgent = "否";
                        if (array[i].isUrgent) {
                            isUrgent = "是";
                        }

                        var b = {};
                        b.enabled = array[i].enabled;
                        b.createdDate = array[i].createdDate;
                        b.finishDate = array[i].finishDate;
                        b.orderNumber = array[i].orderNumber;
                        b.authorName = array[i].authorName;
                        b.assignerName = array[i].assignerName;
                        b.executorName = array[i].executorName;
                        b.responsibleName = array[i].responsibleName;
                        b.orderType = orderType;
                        b.state = array[i].state;
                        b.type = array[i].type;
                        b.isActive = array[i].isActive;
                        b.isLeader = array[i].isLeader;
                        b.isUrgent = isUrgent;
                        b.location = array[i].location;
                        b.content = array[i].content;
                        b.classify = array[i].classify;
                        b.id = array[i].id;
                        b.takeGoods = array[i].takeGoods;
                        b.giveGoods = array[i].giveGoods;
                        b.executeTime = array[i].executeTime;
                        b.typeStyle = {};
                        b.typeStyle.display = showStyle;
                        b.sendHideStyle = {};
                        b.sendHideStyle.display = sendHide;
                        b.sendShowStyle = {};
                        b.sendShowStyle.display = sendShow;
                        b.creadVoiceStyle = {};
                        b.creadVoiceStyle.display = creadVoiceStyle;
                        b.finishVoiceStyle = {};
                        b.finishVoiceStyle.display = finishVoiceStyle;
                        b.creadImgStyle = {};
                        b.creadImgStyle.display = creadImgStyle;
                        b.finishImgStyle = {};
                        b.finishImgStyle.display = finishImgStyle;
                        b.repairStyle = {};
                        b.repairStyle.display = repairStyle;
                        b.picture = picture;
                        b.finish_picture = finish_picture;
                        b.cread_voice = cread_voice;
                        b.finish_voice = finish_voice;
                        b.code = array[i].authorCode;
                        b.backStyle = {};
                        b.backStyle.display = "none";
                        b.backContent = "";
                        this.data1.push(b)
                        let self = this
                        if (array[i].orderType == "REPAIR") {
                            (function (i) {
                                var params = new URLSearchParams();
                                params.append("id", array[i].id);
                                self.post('resources/biz/refuseRecord/refuse', params, res => {
                                    if (res.data.data) {
                                        if (res.data.data.reason != "") {
                                            self.data1[i].backContent = res.data.data.reason;
                                            self.data1[i].backStyle.display = "block";
                                        }
                                    }
                                }, err => {
                                })
                            })(i)
                        }
                    }
                }, err => {
                })
            },
            addListData: function () {
                //地点列表
                if (sessionStorage.getItem('locationList') == null || sessionStorage.getItem('locationList') == "") {
                    this.get('resources/biz/building/tree', {}, res => {
                        let array = res.data;
                        var location = [];
                        location.push({value: array.id, label: array.text, children: []})
                        if (array.children) {
                            var children_a = array.children;
                            for (var i = 0; i < children_a.length; i++) {
                                if (children_a[i].text != "") {
                                    location[0].children.push({
                                        value: children_a[i].id,
                                        label: children_a[i].text,
                                        children: []
                                    });
                                }
                                var children_b = array.children[i].children;
                                if (children_b) {
                                    (function (i) {
                                        for (var j = 0; j < children_b.length; j++) {
                                            var textname = children_b[j].text.replace(/(^\s+)|(\s+$)/g, "")
                                            if (textname.length > 0) {
                                                location[0].children[i].children.push({
                                                    value: children_b[j].id,
                                                    label: children_b[j].text,
                                                    children: []
                                                })
                                            }
                                            var children_c = array.children[i].children[j].children;
                                            if (children_c) {
                                                (function (j) {
                                                    for (var k = 0; k < children_c.length; k++) {
                                                        var textname = children_c[k].text.replace(/(^\s+)|(\s+$)/g, "")
                                                        if (textname.length > 0) {
                                                            location[0].children[i].children[j].children.push({
                                                                value: children_c[k].id,
                                                                label: children_c[k].text,
                                                                children: []
                                                            })
                                                        }
                                                        var children_d = array.children[i].children[j].children[k].children;
                                                        if (children_d) {
                                                            (function (k) {
                                                                for (var l = 0; l < children_d.length; l++) {
                                                                    var textname = children_d[l].text.replace(/(^\s+)|(\s+$)/g, "")
                                                                    if (textname.length > 0) {
                                                                        location[0].children[i].children[j].children[k].children.push({
                                                                            value: children_d[l].id,
                                                                            label: children_d[l].text,
                                                                            children: []
                                                                        })
                                                                    }
                                                                }
                                                            })(k);
                                                        }
                                                    }
                                                })(j);
                                            }
                                        }
                                    })(i);
                                }
                            }
                            sessionStorage.setItem('locationList', JSON.stringify(location))
                            this.add_get = location;
                            this.add_send = location;
                            this.add_location = location;
                            this.add_load1 = true;
                        }
                    }, err => {
                    })
                } else {
                    var locationList = JSON.parse(sessionStorage.getItem('locationList'))
                    this.add_get = locationList;
                    this.add_send = locationList;
                    this.add_location = locationList;
                    this.add_load1 = true;
                }


                //运送类型列表
                this.get('resources/biz/distributionType/get_type', {}, res => {
                    this.add_type = []
                    for (var i = 0; i < res.data.data.length; i++) {
                        var d = {}
                        d.value = res.data.data[i].id
                        d.label = res.data.data[i].typeName
                        this.add_type.push(d);
                    }
                    this.add_load2 = true;
                }, err => {
                })

                //携带工具
                var tools = [];
                tools.push('床')
                tools.push('推车')
                tools.push('标本箱')
                for (var ts = 0; ts < tools.length; ts++) {
                    this.add_carryTools.push({value: tools[ts], label: tools[ts]});
                }

                //运送人员列表
                /*  this.get('resources/biz/worker/get_by_role', {
                      role: "DELIVER"
                  }, res => {
                      this.add_user = []
                      for (var i = 0; i < res.data.data.length; i++) {
                          var d = {}
                          d.value = res.data.data[i].id
                          d.label = res.data.data[i].name
                          this.add_user.push(d);
                      }
                      this.add_load3 = true;
                  }, err => {
                  })*/

                //运送时间段
                var time = [];
                time.push('00:00 ~ 01:00')
                time.push('01:00 ~ 02:00')
                time.push('02:00 ~ 03:00')
                time.push('03:00 ~ 04:00')
                time.push('04:00 ~ 05:00')
                time.push('05:00 ~ 06:00')
                time.push('06:00 ~ 07:00')
                time.push('07:00 ~ 08:00')
                time.push('08:00 ~ 09:00')
                time.push('09:00 ~ 10:00')
                time.push('10:00 ~ 11:00')
                time.push('11:00 ~ 12:00')
                time.push('12:00 ~ 13:00')
                time.push('13:00 ~ 14:00')
                time.push('14:00 ~ 15:00')
                time.push('15:00 ~ 16:00')
                time.push('16:00 ~ 17:00')
                time.push('17:00 ~ 18:00')
                time.push('18:00 ~ 19:00')
                time.push('19:00 ~ 20:00')
                time.push('20:00 ~ 21:00')
                time.push('21:00 ~ 22:00')
                time.push('22:00 ~ 23:00')
                time.push('23:00 ~ 00:00')
                for (var t = 0; t < time.length; t++) {
                    this.add_time.push({value: time[t], label: time[t]});
                }
            },
            addOrder: function () {
                this.selectAddType();
                console.log("地址加载", this.add_load1)
                // if (!(this.add_load1 && this.add_load2 && this.add_load3)) {
                if (!(this.add_load1 && this.add_load2)) {
                    this.addListData();
                    this.$Spin.show();
                } else {
                    this.$Spin.hide()
                    this.add_modal = true;
                }
            },
            addSubmit: function () {
                var params = new URLSearchParams();
                var url = "";
                switch (this.formItem.addType) {
                    case "报修":
                        if (this.formItem.other_Location == [] || this.formItem.other_type == "" || this.formItem.other_content == "") {
                            this.$Message.warning('请完善工单信息！');
                            this.add_loading = false;
                            setTimeout(function () {
                                this.add_loading = true;
                            }, 100)
                            return;
                        }
                        params.append("author", this.assignerid);
                        params.append("location", this.formItem.other_Location[this.formItem.other_Location.length - 1]);
                        params.append("classify", this.formItem.other_type);
                        params.append("content", this.formItem.other_content);
                        url = "resources/biz/repairOrder/web_add_order"
                        break;
                    case "送水":
                        if (this.formItem.other_Location == "" || this.formItem.other_content == "") {
                            this.$Message.warning('请完善工单信息！');
                            this.add_loading = false;
                            setTimeout(function () {
                                this.add_loading = true;
                            }, 100)
                            return;
                        }
                        params.append("author", this.assignerid);
                        params.append("location", this.formItem.other_Location[this.formItem.other_Location.length - 1]);
                        params.append("content", this.formItem.other_content);
                        params.append("type", "WATER");
                        url = "resources/biz/order/web_add_order"
                        break;
                    case "紧急保洁":
                        if (this.formItem.other_Location == "" || this.formItem.other_content == "") {
                            this.$Message.warning('请完善工单信息！');
                            this.add_loading = false;
                            setTimeout(function () {
                                this.add_loading = true;
                            }, 100)
                            return;
                        }
                        params.append("author", this.assignerid);
                        params.append("location", this.formItem.other_Location[this.formItem.other_Location.length - 1]);
                        params.append("content", this.formItem.other_content);
                        params.append("type", "CLEANER");
                        url = "resources/biz/order/web_add_order"
                        break;
                    case "运送":
                        // if (this.formItem.get == "" || this.formItem.send == "" || this.formItem.time[0] == ""|| this.formItem.carryTools == "" || this.formItem.type == "" || this.formItem.user == "") {
                        if (this.formItem.get == [] || this.formItem.send == [] || this.formItem.time[0] == "" || this.formItem.carryTools == "" || this.formItem.type == "") {
                            this.$Message.warning('请完善工单信息！');
                            this.add_loading = false;
                            setTimeout(function () {
                                this.add_loading = true;
                            }, 100)
                            return;
                        }
                        params.append("author", this.assignerid);
                        params.append("assigner", this.assignerid);
                        // params.append("executor", this.formItem.user);
                        params.append("takeGoods", this.formItem.get[this.formItem.get.length - 1]);
                        params.append("giveGoods", this.formItem.send[this.formItem.send.length - 1]);
                        params.append("executeTime", this.formItem.time);
                        params.append("typeId", this.formItem.type);
                        params.append("content", this.formItem.content);
                        params.append("carryTools", this.formItem.carryTools);
                        url = "resources/biz/distributionOrder/web_add_order"
                        break;
                }
                this.post(url, params, res => {
                        if (res.data.code === 0) {
                            this.add_modal = false
                            this.$Message.success('新增' + this.formItem.addType + '单成功');
                            this.updateList();
                        }
                    },
                    err => {
                        this.add_loading = false
                        this.$Message.error(err.response.data.message);
                    })
            }
        },
        watch: {
            page(newValue, oldValue) {
                this.updateList()
            }
        }
    }
</script>

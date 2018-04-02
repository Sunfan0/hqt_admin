<style scoped lang="less">
    .body {
        margin: 0;
        background-color: #f5f7f9;
    }

    .ivu-input-wrapper {
        margin-left: 10px;
        width: 80%;
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
        margin-left: 10px;
    }

    .ivu-table .demo-table-info-row td {
        background-color: #10293c !important;
        color: #fff;
    }

    .ivu-table .demo-table-info-row span {
        color: #fff;
    }

    #edit_modal .ivu-modal {
        width: 700px !important;
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

    .edit_footer {

    }

    .edit_footer .ivu-btn-error {
        float: left;
    }

    .edit_footer .ivu-btn-error span {
        color: white !important;
    }
</style>

<template>
    <div class="body">
        <Header></Header>
        <audio id="hintMusic" src="../../static/hintMusic.mp3"></audio>
        <div class="body-header" style="overflow: hidden!important;">
            <p class="switchBtn" v-on:click="switchPage">
                <Icon type="arrow-swap" style="margin-right: 10px"></Icon>
                查看工单列表
            </p>
            <!--<Button type="primary" v-on:click="addOrder" style="float: right;margin-top: 10px">
                <Icon type="plus-round" style="margin-right: 10px"></Icon>
                新增运送单
            </Button>-->
        </div>
        <div class="body-content">
            <Table size="large" :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
            <Page :total="pageCount" show-elevator @on-change="change"></Page>
        </div>
        <Modal v-model="modal" title="分配人员选择" :loading="loading" @on-ok="allotSubmit">
            <Row class="expand-row" v-bind:style="repairChoiceStyle">
                <Col span="6" style="line-height: 30px;">
                报修类型选择
                </Col>
                <Col span="18">
                <Select v-model="repairType" style="margin-bottom: 20px">
                    <Option value="水">水</Option>
                    <Option value="电">电</Option>
                    <Option value="木">木</Option>
                    <Option value="空">空</Option>
                    <Option value="杂">杂</Option>
                    <Option value="弱">弱</Option>
                    <Option value="床">床</Option>
                </Select>
                </Col>
            </Row>
            <Row class="expand-row" v-bind:style="deptStyle">
                <Col span="6" style="line-height: 30px;">
                部门选择
                </Col>
                <Col span="18">
                <Select v-model="deptname" style="margin-bottom: 20px" @on-change="allotChoice">
                    <Option v-for="item in deptList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
                </Col>
            </Row>
            <Row class="expand-row" v-bind:style="workerStyle">
                <Col span="6" style="line-height: 30px;">
                {{allotLabel}}
                </Col>
                <Col span="18">
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
        <Modal v-model="showImgBig" width="360px">
            <img v-bind:src="showImgUrl" ref="headerImg" width="300" height="300" alt="暂无照片">
            <div slot="footer"></div>
        </Modal>
        <Modal id="edit_modal" v-model="edit_modal" title="编辑工单">
            <Form :model="formItem" :label-width="140" v-bind:style="deliverStyle">
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
            <div slot="footer" class="edit_footer">
                <Button type="error" @click="deleteOrder">删除</Button>
                <Button type="primary" :loading="add_loading" @click="editSubmit">保存修改</Button>
            </div>
        </Modal>
        <div style="display: none">{{backContent}}</div>
        <Modal v-model="backModal" title="退回" :loading="backLoading" @on-ok="returnOrder">
            <p style="line-height: 40px">请输入退回原因：</p>
            <Input v-model="backContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."></Input>
        </Modal>
    </div>
</template>
<script>
    import Header from './header.vue';
    import expandRow from './orderlist-info.vue';
    import Input from "iview/src/components/input/input";

    export default {
        components: {
            Input,
            expandRow, Header
        },
        data() {
            return {
                backModal: false,
                backLoading: true,
                backContent: '',
                currentLocation: [],
                currentLocation1: [],
                currentLocation2: [],
                edit_modal: false,
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
                    editId: '',
                    editTypeStr: '',
                    editType: ''
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
                currentData: [],
                showImgBig: false,
                showImgUrl: "",
                allotLabel: "人员选择",
                repairChoiceStyle: {
                    display: 'none'
                },
                deptStyle: {
                    display: 'none'
                },
                workerStyle: {
                    display: 'none'
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
                add_loading: false,
                styleObject: {
                    display: 'none'
                },
                imgurl: "",
                assignerid: sessionStorage.userId,
                orderid: '',
                orderType: '',
                orderTypeStr: '',
                orderState: '',
                modal: false,
                workerstate: '',
                repairType: '',
                deptname: '',
                deptList: [],
                workername: '',
                workerList: [],
                search_orderType: '',
                search_state: '',
                search_executor: '',
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
                            if(params.row.isActive){
                                if (params.row.enabled) {
                                    return h('div', [
                                        h('span', {}, str.substr(0, 1) + str.substr(str.length - 4, str.length)),
                                        h('span', {
                                            style: {
                                                color: '#ff4800  !important',
                                                border:'1px solid #ff4800 ',
                                                fontSize:'1em',
                                                borderRadius:'50%',
                                                padding:'0 0.2em',
                                                display:'inline-block',
                                                transform: 'scale(0.7)',
                                                marginLeft:'5px'
                                            }
                                        }, '巡')
                                    ]);
                                } else {
                                    return h('div', [
                                        h('span', {}, str.substr(0, 1) + str.substr(str.length - 4, str.length)),
                                        h('span', {
                                            style: {
                                                color: '#ff4800  !important',
                                                border:'1px solid #ff4800 ',
                                                fontSize:'1em',
                                                borderRadius:'50%',
                                                padding:'0 0.2em',
                                                display:'inline-block',
                                                transform: 'scale(0.7)',
                                                marginLeft:'5px'
                                            }
                                        }, '巡'),
                                        h('span', {
                                            style: {
                                                color: '#ff9800 !important'
                                            }
                                        }, ' ✎')
                                    ]);
                                }
                            }else{
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
                        title: '操作',
                        key: 'operate',
                        width: 350,
                        align: 'center',
                        render: (h, params) => {
                            var overBtn = 'none'
                            var otherBtn = 'none'
                            var deleteBtn = 'none'
                            var clearReturnBtn = 'none'
                            if (params.row.state === "已创建") {
                                deleteBtn = ''
                            }
                            if (params.row.orderType === "报修单") {
                                otherBtn = ''
                            }
                            if (params.row.state === "已创建" && params.row.orderType === "报修单") {
                                overBtn = ''
                            }
                            // if (params.row.state === "已创建" && params.row.orderType === "保洁单") {
                            if (params.row.state === "已创建") {
                                clearReturnBtn = ''
                            }
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: clearReturnBtn
                                    },
                                    on: {
                                        click: () => {
                                            this.backContent = ""
                                            this.formItem.editId = params.row.id
                                            this.formItem.editTypeStr = params.row.orderTypeStr
                                            this.backModal = true;
                                        }
                                    }
                                }, '退回'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: overBtn
                                    },
                                    on: {
                                        click: () => {
                                            this.overOrder(params.row.author, params.row.id)
                                        }
                                    }
                                }, '完成'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.orderid = params.row.id
                                            this.orderType = params.row.orderType
                                            this.orderState = params.row.state
                                            this.choiceState()
                                        }
                                    }
                                }, '分配'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: otherBtn
                                    },
                                    on: {
                                        click: () => {
                                            this.orderid = params.row.id
                                            this.orderType = params.row.orderType
                                            this.orderState = "维修小组长退回"
                                            this.choiceState()
                                        }
                                    }
                                }, '第三方'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.formItem.editId = params.row.id
                                            this.formItem.editTypeStr = params.row.orderTypeStr
                                            this.formItem.editType = params.row.orderType
                                            this.editOrder(params.row)
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ], data1: []
            }
        },
        created() {
            this.addListData();
            this.updateList();
            setInterval(() => {
                this.updateListChange();
            }, 300000)

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
            getParentId: function (id, location) {
                this.get('resources/biz/building/find_parent', {
                    id: id
                }, res => {
                    switch (location) {
                        case "other_Location":
                            this.currentLocation.push(res.data.data.parentId)
                            break;
                        case "get":
                            this.currentLocation1.push(res.data.data.parentId)
                            break;
                        case "send":
                            this.currentLocation2.push(res.data.data.parentId)
                            break;
                    }
                    if (res.data.data.parentId != "root") {
                        this.getParentId(res.data.data.parentId, location)
                    } else {
                        switch (location) {
                            case "other_Location":
                                var locationData = []
                                for (var i = this.currentLocation.length - 1; i >= 0; i--) {
                                    locationData.push(this.currentLocation[i])
                                }
                                this.formItem.other_Location = locationData
                                break;
                            case "get":
                                var locationData1 = []
                                for (var i = this.currentLocation1.length - 1; i >= 0; i--) {
                                    locationData1.push(this.currentLocation1[i])
                                }
                                this.formItem.get = locationData1
                                break;
                            case "send":
                                var locationData2 = []
                                for (var i = this.currentLocation2.length - 1; i >= 0; i--) {
                                    locationData2.push(this.currentLocation2[i])
                                }
                                this.formItem.send = locationData2
                                break;
                        }
                    }
                }, err => {
                })
            },
            editOrder: function (data) {
                console.log("------sun-------", data)
                this.currentLocation = []
                this.currentLocation1 = []
                this.currentLocation2 = []
                var locationId = data.locationId
                var locationId1 = data.locationId
                var locationId2 = '17d1fd19b92c11e7af8ab888e3382386'

                if (!this.add_load1) {
                    this.addListData();
                    this.$Spin.show();
                } else {
                    this.$Spin.hide()
                    this.edit_modal = true;
                }
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
                switch (this.formItem.editType) {
                    case "报修单":
                        this.currentLocation.push(locationId)
                        this.getParentId(locationId, "other_Location")
                        this.deliverStyle.display = "none"
                        this.otherStyle.display = "block"
                        this.addCommintStyle.display = "block"
                        this.formItem.other_Location = data.location;
                        this.formItem.other_type = data.classify;
                        this.formItem.other_content = data.content;
                        break;
                    case "送水单":
                        this.currentLocation.push(locationId)
                        this.getParentId(locationId, "other_Location")
                        this.deliverStyle.display = "none"
                        this.otherStyle.display = "block"
                        this.addCommintStyle.display = "none"
                        this.formItem.other_Location = data.location;
                        this.formItem.other_content = data.content;
                        break;
                    case "保洁单":
                        this.currentLocation.push(locationId)
                        this.getParentId(locationId, "other_Location")
                        this.deliverStyle.display = "none"
                        this.otherStyle.display = "block"
                        this.addCommintStyle.display = "none"
                        this.formItem.other_Location = data.location;
                        this.formItem.other_content = data.content;
                        break;
                    case "运送单":
                        this.currentLocation1.push(locationId1)
                        this.currentLocation2.push(locationId2)
                        this.getParentId(locationId1, "get")
                        this.getParentId(locationId2, "send")


                        for (var i = 0; i < this.add_type.length; i++) {
                            if (this.add_type[i].label == data.type) {
                                this.formItem.type = this.add_type[i].value;
                            }
                        }
                        this.formItem.time = data.executeTime;
                        this.formItem.content = data.content;
                        this.formItem.carryTools = data.carryTools;
                        this.deliverStyle.display = "block"
                        this.otherStyle.display = "none"
                        break;
                }
            },
            editSubmit: function () {
                var params = new URLSearchParams();
                params.append("id", this.formItem.editId);
                var url = "";
                switch (this.formItem.editType) {
                    case "报修单":
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
                    case "送水单":
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
                    case "保洁单":
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
                    case "运送单":
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
                            this.edit_modal = false;
                            this.$Message.success('修改工单成功');
                            this.updateList();
                        }
                    },
                    err => {
                        this.add_loading = false
                        this.$Message.error(err.response.data.message);
                    })
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
                this.$router.replace('/orderlist')
            },
            rowClassName(row) {
                if (row.state === "已创建" || row.state === "维修小组长退回") {
                    return 'demo-table-info-row';
                }
                return '';
            },
            choiceState() {
                this.deptname = ""
                switch (this.orderType) {
                    case "报修单":
                        this.repairChoiceStyle.display = "block"
                        if (this.orderState === "已创建") {
                            this.allotLabel = "维修小组长选择"
                            this.orderTypeStr = "RESPONSIBLE"
                            this.deptStyle.display = "none"
                            this.workerStyle.display = "block"
                            this.allotChoice()
                        } else if (this.orderState === "维修小组长退回") {
                            this.allotLabel = "人员选择"
                            this.deptStyle.display = "block"
                            this.workerStyle.display = "none"
                            this.deptChoice()
                        }
                        break;
                    case "送水单":
                        this.orderTypeStr = "WATER"
                        this.deptStyle.display = "none"
                        this.workerStyle.display = "block"
                        this.repairChoiceStyle.display = "none"
                        this.allotChoice()
                        break;
                    case "运送单":
                        this.orderTypeStr = "DELIVER"
                        this.deptStyle.display = "none"
                        this.workerStyle.display = "block"
                        this.repairChoiceStyle.display = "none"
                        this.allotChoice()
                        break;
                    case "保洁单":
                        this.orderTypeStr = "CLEANER"
                        this.deptStyle.display = "none"
                        this.workerStyle.display = "block"
                        this.repairChoiceStyle.display = "none"
                        this.allotChoice()
                        break;
                }
                this.modal = true
            },
            returnOrder() {
                if (this.backContent == "") {
                    this.$Message.warning('请输入退回原因！');
                    this.backLoading = false;
                    setTimeout(function () {
                        this.backLoading = true;
                    }, 100)
                    return;
                }
                var params = new URLSearchParams();
                params.append("workerId", this.assignerid);
                params.append("id", this.formItem.editId);
                params.append("type", this.formItem.editTypeStr);
                params.append("reason", this.backContent);
                this.post('resources/biz/repairOrder/order_refuse', params, res => {
                    this.$Message.success('退回成功！');
                    this.backModal = false;
                    this.updateList();
                }, err => {
                    this.$Message.error(err.response.data.message);
                    this.backLoading = false;
                    setTimeout(function () {
                        this.backLoading = true;
                    }, 100)
                    return;
                })
            },
            overOrder(userId, orderId) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认该工单已经执行并完成？</p>',
                    onOk: () => {
                        this.get('resources/biz/repairOrder/web_finish', {
                            userId: userId,
                            orderId: orderId
                        }, res => {
                            this.$Message.success('操作成功！');
                            this.updateList();
                        }, err => {
                        })
                    }
                });
            },
            deleteOrder() {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>工单删除后将无法恢复，确认删除？</p>',
                    onOk: () => {
                        this.get('resources/biz/repairOrder/delete_order', {
                            id: this.formItem.editId,
                            type: this.formItem.editTypeStr
                        }, res => {
                            this.$Message.success('删除成功！');
                            this.updateList();
                            this.edit_modal = false;
                        }, err => {
                        })
                    }
                });
            },
            deptChoice() {
                this.get('resources/biz/department/department_list', {}, res => {
                    this.deptList = res.data.data
                }, err => {
                })
            },
            allotChoice() {
                if (this.orderType == "报修单" && this.orderState == "维修小组长退回") {
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
                if (this.orderType == "报修单" && this.orderState === "已创建") {
                    if (this.workername == "") {
                        this.$Message.warning('请选择维修小组长！');
                        return;
                    }
                } else {
                    if (this.workername == "") {
                        this.$Message.warning('请选择分配人！');
                        return;
                    }
                }

                var url = ""
                var params = new URLSearchParams();
                params.append("assigner", this.assignerid);
                params.append("id", this.orderid);
                switch (this.orderType) {
                    case "报修单":
                        if (this.orderState === "已创建") {
                            url = "resources/biz/repairOrder/assign_repair_order"
                            params.append("responsible", this.workername);
                            params.append("classify", this.repairType);
                        } else if (this.orderState === "维修小组长退回") {
                            url = "resources/biz/repairOrder/assign_repair_orderRespon"
                            params.append("responsible", this.workername);
                            params.append("classify", this.repairType);
                        }
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
            updateListChange: function () {
                // console.log("-------------")
                var params = new URLSearchParams();
                params.append("page", this.page);
                params.append("limit", 10);
                this.post('resources/biz/repairOrder/web_create_order_list', params, res => {
                    let updata_Array = res.data.data;
                    // console.log("当前的数据---", this.currentData)
                    // console.log("获取的数据---", updata_Array)
                    if (updata_Array.length > 0) {
                        if (this.currentData.length != updata_Array.length) {
                            if (this.currentData.length < updata_Array.length) {
                                var music = document.getElementById("hintMusic");
                                music.play();
                            }
                            this.updateList();
                        }
                    }
                }, err => {
                }, false)
            },
            updateList: function () {
                this.currentData = [];
                this.data1 = [];
                var params = new URLSearchParams();
                params.append("page", this.page);
                params.append("limit", 10);
                this.post('resources/biz/repairOrder/web_create_order_list', params, res => {
                    let array = res.data.data;
                    console.log(res.data.data)
                    this.pageCount = res.data.count
                    for (var i = 0; i < array.length; i++) {
                        var voiceStyle = "none";
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

                        var voice = []
                        if (array[i].voice != undefined && array[i].voice != "") {
                            voiceStyle = "block"
                            var voiceData = array[i].voice.split(",")
                            for (var v = 0; v < voiceData.length; v++) {
                                if (voiceData[v] != "") {
                                    voice.push({url: voiceData[v]})
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

                        //当前数据状态
                        var c = {}
                        c.id = array[i].id;
                        c.state = array[i].state;
                        this.currentData.push(c);

                        var b = {};
                        b.enabled = array[i].enabled;
                        b.createdDate = array[i].createdDate;
                        b.orderNumber = array[i].orderNumber;
                        b.author = array[i].author;
                        b.authorName = array[i].authorName;
                        b.assignerName = array[i].assignerName;
                        b.executorName = array[i].executorName;
                        b.orderType = orderType;
                        b.orderTypeStr = array[i].orderType;
                        b.state = array[i].state;
                        b.type = array[i].type;
                        b.isActive = array[i].isActive;
                        b.isLeader = array[i].isLeader;
                        b.isUrgent = isUrgent;
                        b.location = array[i].location;
                        b.locationId = array[i].locationId;
                        b.content = array[i].content;
                        b.carryTools = array[i].carryTools;
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
                        b.voiceStyle = {};
                        b.voiceStyle.display = voiceStyle;
                        b.creadImgStyle = {};
                        b.creadImgStyle.display = creadImgStyle;
                        b.finishImgStyle = {};
                        b.finishImgStyle.display = finishImgStyle;
                        b.repairStyle = {};
                        b.repairStyle.display = repairStyle;
                        b.picture = picture;
                        b.finish_picture = finish_picture;
                        b.voice = voice;
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
            addOrder: function () {
                if (!(this.add_load1 && this.add_load2 && this.add_load3)) {
                    this.addListData();
                    this.$Spin.show();
                } else {
                    this.$Spin.hide()
                    this.edit_modal = true;
                }
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
            }
        },
        watch: {
            page(newValue, oldValue) {
                this.updateList()
            }
        }
    }
</script>

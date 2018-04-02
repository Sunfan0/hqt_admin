<style scoped lang="less">
    .body {
        margin: 20px auto;
    }

    .search-box {
        white-space: nowrap;
        float: left;
        width: 300px;
    }

    .ivu-input-wrapper {
        margin-left: 10px;
    }

    .search-box .ivu-input-wrapper {
        width: 70% !important;
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
</style>
<template>
    <div class="body">
        <div class="body-header">
            <div class="search-box">物料名称<Input v-model="name" placeholder="物料名称"></Input></div>
            <!--<div class="search-box">物料类型<Input v-model="type" placeholder="物料类型"></Input></div>
            <div class="search-box">品牌<Input v-model="brand" placeholder="品牌"></Input></div>-->
            <Button type="primary" icon="ios-search" style="margin-right: 10px" v-on:click="updateList">搜索</Button>
            <!--<Button type="ghost" v-on:click="resetMethod">重置</Button>-->
        </div>
        <div class="body-content">
            <Table size="large" border :columns="columns1" :data="data1"></Table>
            <Page :total="pageCount" show-elevator @on-change="change"></Page>
        </div>
        <Modal v-model="codeModal" width="250">
            <qrcode v-bind:value="codestr" :options="{ size: 200 }"></qrcode>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import expandRow from './list-info.vue';

    export default {
        components: {expandRow},
        data() {
            return {
                wareid: '',
                codeModal: false,
                codestr: '',
                name: '',
                type: '',
                brand: '',
                pageCount: 0,
                page: 0,
                typeName: "",
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
                        title: '物料类型',
                        key: 'typeName'
                    },
                    {
                        title: '规格',
                        key: 'brand'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 230,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.strToCode(params);
                                        }
                                    }
                                }, '查看二维码'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editorMethod(params);
                                        }
                                    }
                                }, '编辑')
                                /* h('Button', {
                                     props: {
                                         type: 'error',
                                         size: 'small'
                                     },
                                     on: {
                                         click: () => {
                                             this.deleteMethod(params);
                                         }
                                     }
                                 }, '删除')*/
                            ]);
                        }
                    }
                ], data1: []
            }
        },
        created() {
            this.updateList();
        },
        methods: {
            deleteMethod: function (data) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "您确定要删除该物料信息？",
                    onOk: () => {
                        this.get('resources/biz/ware/drop', {
                            id: data.row.wareid
                        }, res => {
                            this.$Message.success('成功删除！');
                            this.updateList();
                        }, err => {
                            this.$Message.error(err.response.data.message);
                        })
                    }
                });
            },
            editorMethod: function (data) {
                this.$router.push({path: "/index/add", query: {"wareid": data.row.wareid}})
            },
            resetMethod: function () {
                Object.assign(this.$data, this.$options.data())
                this.updateList()
            },
            change: function (page) {
                console.log(page);
                this.page = page
            },
            updateList: function () {
                this.data1 = [];
                var params = new URLSearchParams();
                params.append("page", this.page);
                params.append("limit", 10);
                params.append("name", this.name);
                params.append("type", this.type);
                params.append("brand", this.brand);
                this.get('resources/biz/wareType/list', {}, res => {
                    let arrayTypes = res.data
                    this.post('resources/biz/ware/list', params, res => {
                        let array = res.data.data;
                        this.pageCount = res.data.count

                        for (var i = 0; i < array.length; i++) {
                            var b = {};
                            b.wareid = array[i].id;
                            b.name = array[i].name;
                            // b.type = this.idToName(array[i].type, arrayTypes)
                            b.typeName = array[i].typeName;
                            b.classify = array[i].classify;
                            b.brand = array[i].brand;
                            b.model = array[i].model;
                            b.unit = array[i].unit;
                            b.wareNowSum = array[i].wareNowSum;
                            b.alertNum = array[i].alertNum;
                            this.data1.push(b);
                        }
                    }, err => {
                    })


                }, err => {
                })
            },
            idToName: function (typeid, allTypes) {
                for (var i = 0; i < allTypes.length; i++) {
                    let types = allTypes[i].children
                    if (typeid == allTypes[i].id) {
                        return allTypes[i].name
                    }
                    if (typeof(types) != 'undefined') {
                        for (var j = 0; j < types.length; j++) {
                            let type = types[j]
                            if (typeid === type.id) {
                                return allTypes[i].name
                            }
                        }
                    }

                }
            },
            strToCode: function (data) {
                this.codeModal = true;
//                console.log(data.row.wareid);
                this.codestr = data.row.wareid;
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

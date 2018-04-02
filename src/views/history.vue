<style scoped lang="less">
    .body {
        margin: 20px auto;
    }

    .search-box {
        white-space: nowrap;
        float: left;
    }

    .ivu-input-wrapper {
        margin-left: 10px;
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

    .body .ivu-input {
        width: 70% !important;
    }

    .body .ivu-select-single .ivu-select-selection {
        width: 70% !important;
    }

    .body .ivu-cascader-rel {
        width: 70% !important;
    }

    .body .ivu-cascader-rel .ivu-input {
        width: 100% !important;
    }
</style>

<template>
    <div class="body">
        <!--<div class="body-header">
            <div class="search-box">物料名称<Input placeholder="物料名称"></Input></div>
            <div class="search-box">物料类型<Input placeholder="物料类型"></Input></div>
            <div class="search-box">品牌<Input placeholder="品牌"></Input></div>
            <Button type="primary" icon="ios-search" style="margin-right: 10px" v-on:click="updateList">搜索</Button>
            <Button type="ghost" v-on:click="resetMethod">重置</Button>
        </div>-->
        <div class="body-content">
            <Table size="large" border :columns="columns1" :data="data1"></Table>
            <Page :total="pageCount" show-elevator @on-change="change"></Page>
        </div>
    </div>
</template>
<script>
    import expandRow from './history-info.vue';

    export default {
        components: {expandRow},
        data() {
            return {
                /*name: '',
                type: '',
                brand: '',*/
                pageCount: 0,
                page: 0,
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
                        key: 'wareName'
                    },
                    {
                        title: '操作',
                        key: 'type'
                    },
                    {
                        title: '时间',
                        key: 'createdDate'
                    }
                ], data1: []
            }
        },
        created() {
            this.updateList();
        },
        methods: {
            resetMethod: function () {
                Object.assign(this.$data, this.$options.data())
                this.updateList()
            },
            change: function (page) {
                console.log(page);
                this.page = page
            },
            updateList: function () {
                console.log(this.page);
                this.data1 = [];
                var params = new URLSearchParams();
                params.append("page", this.page);
                params.append("limit", 10);
                /* params.append("name", this.name);
                 params.append("type", this.type);
                 params.append("brand", this.brand);*/
                this.post('resources/biz/batches/list', params, res => {
                    console.log(res.data.data);
                    let array = res.data.data;
                    this.pageCount = res.data.count

                    for (var i = 0; i < array.length; i++) {
                        this.data1.push(array[i]);
                    }
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

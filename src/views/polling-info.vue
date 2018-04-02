<style scoped lang="less">
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<style lang="less">
    td.ivu-table-expanded-cell {
        padding: 20px 5px 20px 70px !important;
    }
</style>

<template>
    <div class="table-detail">
        <Row class="expand-row" style="font-weight: 600;">
            <Col span="4">
            <span class="expand-key">项目名称</span>
            </Col>
            <Col span="10" style="text-align: center">
            <span class="expand-key">详情</span>
            </Col>
            <Col span="4">
            <span class="expand-key">是否正常</span>
            </Col>
            <Col span="4">
            <span class="expand-key">操作</span>
            </Col>
        </Row>
        <Row class="expand-row" v-bind:style="item.fontColorStyle" v-for="item in row.project" :value="item.id"
             :key="item.id">
            <Col span="4">
            <span class="expand-value">{{ item.name }}</span>
            </Col>
            <Col span="10" style="text-align: center">
            <span class="expand-value">&nbsp;{{ item.content }}</span>
            </Col>
            <Col span="4">
            <span class="expand-value">{{ item.normal }}</span>
            </Col>
            <Col span="4">
            <Button type="primary" size="small" v-on:click="OrderDetail(item.orderId)" v-bind:style="item.showStyle">查看工单</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        props: {
            row: Object
        },
        methods: {
            OrderDetail: function (orderId) {
                console.log(orderId)
                if (orderId != 0) {
                    this.$router.push({path: 'orderlist', query: {'orderId': orderId}})
                }
            }
        }
    };
</script>

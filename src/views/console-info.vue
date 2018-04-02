<style scoped lang="less">
    .expand-row {
        margin-bottom: 16px;
    }
</style>

<template>
    <div class="table-detail">
        <Row class="expand-row">
            <Col span="8" v-bind:style="row.typeStyle">
            <span class="expand-key">类型: </span>
            <span class="expand-value">{{ row.type }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">分配者: </span>
            <span class="expand-value">{{ row.assignerName }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">执行者: </span>
            <span class="expand-value">{{ row.executorName }}</span>
            <span class="expand-value" style="display: none">{{ row.id }}</span>
            </Col>
        </Row>
        <Row class="expand-row" v-bind:style="row.sendHideStyle">
            <Col span="8">
            <span class="expand-key">位置: </span>
            <span class="expand-value">{{ row.location }}</span>
            </Col>
            <Col span="16">
            <span class="expand-key">描述: </span>
            <span class="expand-value">{{ row.content }}</span>
            </Col>
        </Row>

        <Row class="expand-row" v-bind:style="row.sendShowStyle">
            <Col span="8">
            <span class="expand-key">初始地点: </span>
            <span class="expand-value">{{ row.takeGoods }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">送达地点: </span>
            <span class="expand-value">{{ row.giveGoods }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">执行时间段: </span>
            <span class="expand-value">{{ row.executeTime }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        props: {
            row: Object
        },
        data(){
            return {
                typeStyle: {
                    display: 'none'
                },
                sendHideStyle: {
                    display: 'block'
                },
                sendShowStyle: {
                    display: 'none'
                }
            }
        }
    };
</script>

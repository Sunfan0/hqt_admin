<style scoped lang="less">
    .expand-row{
        margin-bottom: 16px;
    }
</style>

<template>
    <div class="table-detail">
        <Row class="expand-row">
            <Col span="8">
            <span class="expand-key">所有者信息: </span>
            <span class="expand-value">{{ row.classify }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">型号: </span>
            <span class="expand-value">{{ row.model }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">单位: </span>
            <span class="expand-value">{{ row.unit }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
            <span class="expand-key">库存数: </span>
            <span class="expand-value">{{ row.wareNowSum }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">警报数: </span>
            <span class="expand-value">{{ row.alertNum }}</span>
            </Col>
            <Col span="8" style="color: transparent;">
            <span>{{ row.wareid }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        props: {
            row: Object
        }
    };
</script>

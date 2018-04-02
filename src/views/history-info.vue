<style scoped lang="less">
    .expand-row{
        margin-bottom: 16px;
    }
</style>

<template>
    <div class="table-detail">
        <Row class="expand-row">
            <Col span="8">
            <span class="expand-key">价格: </span>
            <span class="expand-value">{{ row.price }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">操作数量: </span>
            <span class="expand-value">{{ row.wareInSum }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">当前数量: </span>
            <span class="expand-value">{{ row.wareNowSum }}</span>
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

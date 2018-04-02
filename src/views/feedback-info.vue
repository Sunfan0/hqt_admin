<style scoped lang="less">
    .expand-row{
        margin-bottom: 16px;
    }
</style>

<template>
    <div class="table-detail">
        <Row class="expand-row">
            <span class="expand-key" style="font-size: 16px">反馈内容详情: </span><br>
            <span class="expand-value" style="margin-left: 20px;margin-top: 20px;color: white">{{ row.content }}</span>
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

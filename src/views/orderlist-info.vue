<style scoped lang="less">
    .expand-row {
        margin-bottom: 16px;
    }
</style>

<template>
    <div class="table-detail">
        <Row class="expand-row">
            <Col span="6" v-bind:style="row.typeStyle">
            <span class="expand-key">类型: </span>
            <span class="expand-value">{{ row.type }}</span>
            </Col>
            <Col span="6">
            <span class="expand-key">分配者: </span>
            <span class="expand-value">{{ row.assignerName }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">执行者: </span>
            <span class="expand-value">{{ row.executorName }}</span>
            <span class="expand-value" style="display: none">{{ row.id }}</span>
            </Col>
            <Col span="4" v-bind:style="row.repairStyle">
            <span class="expand-key">部门负责人: </span>
            <span class="expand-value">{{ row.responsibleName }}</span>
            </Col>
        </Row>
        <div v-bind:style="row.sendHideStyle">
            <Row class="expand-row" >
                <Col span="12">
                <span class="expand-key">位置: </span>
                <span class="expand-value">{{ row.location }}</span>
                </Col>
                <Col span="8">
                <span class="expand-key">描述: </span>
                <span class="expand-value">{{ row.content }}</span>
                </Col>
                <Col span="4" v-bind:style="row.repairStyle">
                <span class="expand-key">报修单类型: </span>
                <span class="expand-value">{{ row.classify }}</span>
                </Col>
            </Row>
        </div>
        <Row class="expand-row" v-bind:style="row.backStyle">
            <Col span="2">
            退回原因:
            </Col>
            <Col span="22">
            {{ row.backContent }}
            </Col>
        </Row>
        <Row class="expand-row" v-bind:style="row.creadVoiceStyle">
            <Col span="2" style="height: 50px;line-height: 50px">
            创建语音:
            </Col>
            <Col span="22">
            <audio  v-for="item in row.cread_voice" :value="item.id" :key="item.id" v-bind:src="item.url" controls="controls" style="display: block">您的浏览器不支持 audio 标签。</audio>
            </Col>
        </Row>
        <Row class="expand-row" v-bind:style="row.creadImgStyle">
            <Col span="2" style="height: 50px;line-height: 50px">
            创建照片:
            </Col>
            <Col span="22">
            <img style="margin-right: 20px" v-for="item in row.picture" :value="item.id" :key="item.id"  v-bind:src="item.url" width="50" height="50" v-on:click="imageView(item.url)"/>
            <Modal v-model="showImgBig" width="350px">
                <img v-bind:src="showImgUrl" width="300" height="300"/>
                <div slot="footer"></div>
            </Modal>
            </Col>
        </Row>
        <Row class="expand-row" v-bind:style="row.finishVoiceStyle">
            <Col span="2" style="height: 50px;line-height: 50px">
            完成语音:
            </Col>
            <Col span="22">
            <audio  v-for="item in row.finish_voice" :value="item.id" :key="item.id" v-bind:src="item.url" controls="controls" style="display: block">您的浏览器不支持 audio 标签。</audio>
            </Col>
        </Row>
        <Row class="expand-row" v-bind:style="row.finishImgStyle">
            <Col span="2" style="height: 50px;line-height: 50px">
            完成照片:
            </Col>
            <Col span="22">
            <img style="margin-right: 20px" v-for="item in row.finish_picture" :value="item.id" :key="item.id"  v-bind:src="item.url" width="50" height="50" v-on:click="imageView(item.url)"/>
            <Modal v-model="showImgBig" width="550px">
                <img v-bind:src="showImgUrl" width="500"/>
                <div slot="footer"></div>
            </Modal>
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
    import Radio from "../../node_modules/iview/src/components/radio/radio.vue";

    export default {
        components: {Radio},
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
                },
                creadVoiceStyle: {
                    display: 'none'
                },
                finishVoiceStyle: {
                    display: 'none'
                },
                creadImgStyle: {
                    display: 'none'
                },
                finishImgStyle: {
                    display: 'none'
                },
                repairStyle: {
                    display: 'none'
                },
                backStyle: {
                    display: 'none'
                },
                showImgBig:false,
                showImgUrl:""
            }
        },
        methods: {
            imageView: function (url) {
                this.showImgUrl = url;
                this.showImgBig = true;
            }
        }
    };
</script>

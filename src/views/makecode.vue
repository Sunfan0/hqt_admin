<style scoped lang="less">
    .make_code {
        color: white;
    }
</style>
<template>
    <div class="body">
        <Header></Header>
        <div class="make_code" style="padding:50px 100px">
            <Button type="primary" long v-on:click="makeCode('goods')">（物料） 二维码生成</Button>
            <Progress :percent="percent_goods" status="active" v-bind:style="GoodsStyle"></Progress>
            <Button type="primary" long style="margin-top: 30px" v-on:click="makeCode('polling')">（巡检） 二维码生成</Button>
            <Progress :percent="percent_polling" status="active" v-bind:style="PollingStyle"></Progress>
            <div class="content" v-bind:style="GoodsStyle" style="margin-top: 30px;font-size: 12px">
                <qrcode v-for="item in qrcodeList1" v-bind:value="item.value" :id="item.value" :options="{padding:30,size: 300}"
                        style="display: none"></qrcode>

            </div>
            <div class="content" v-bind:style="PollingStyle" style="margin-top: 30px;font-size: 12px">
                <qrcode v-for="item in qrcodeList2" v-bind:value="item.value" :id="item.value" :options="{padding:30,size: 300}"
                        style="display: none"></qrcode>

            </div>
        </div>
    </div>
</template>
<script>
    import Header from './header.vue';

    export default {
        components: {Header},
        data() {
            return {
                percent_goods: 0,
                percent_polling: 0,
                GoodsStyle: {
                    display: 'none'
                },
                PollingStyle: {
                    display: 'none'
                },
                qrcodeList1: [],
                qrcodeList2: []
            }
        },
        created() {

        },
        methods: {
            makeCode: function (type) {
                if (type == "goods") {
                    this.get('resources/biz/ware/download', {}, res => {
                        this.qrcodeList1 = []
                        this.$Spin.hide();
                        console.log(res.data.data)
                        var length = res.data.data.length
                        this.GoodsStyle.display = "block"
                        this.PollingStyle.display = "none"
                        let array = res.data.data;
                        for (var i = 0; i < array.length; i++) {
                            if (array[i].brand == "" || array[i].brand == undefined) {
                                var imgName = array[i].name
                            } else {
                                var imgName = array[i].name + array[i].brand
                            }
                            this.qrcodeList1.push({"value": array[i].id})
                            this.strToCode(i, length, array[i].id, imgName,"goods")
                        }
                    }, err => {
                    })
                } else {
                    this.get('resources/biz/inspectionSpot/download', {}, res => {
                        this.qrcodeList2 = []
                        this.$Spin.hide();
                        console.log(res.data.data)
                        var length = res.data.data.length
                        this.GoodsStyle.display = "none"
                        this.PollingStyle.display = "block"
                        let array = res.data.data;
                        for (var i = 0; i < array.length; i++) {
                            var imgName = array[i].name
                            this.qrcodeList2.push({"value": array[i].id})
                            this.strToCode(i, length, array[i].id, imgName,"polling")
                        }
                    }, err => {
                    })
                }
            },
            strToCode: function (num, length, id, imgName,type) {
                let self = this
                setTimeout(function () {
                    var canvas = document.getElementById(id)
                    var ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#000';
                    ctx.textAlign = "center";
                    ctx.font = '18px Arial';
                    ctx.fillText(imgName,150,285);
                    // ctx.stroke();
                    var content = canvas.toDataURL("image/png")
                    var aLink = document.createElement('a');
                    var node = document.createTextNode(imgName + "下载; ");
                    var parts = content.split(';base64,');
                    var contentType = parts[0].split(':')[1];
                    var raw = window.atob(parts[1]);
                    var rawLength = raw.length;
                    var uInt8Array = new Uint8Array(rawLength);
                    for (var i = 0; i < rawLength; ++i) {
                        uInt8Array[i] = raw.charCodeAt(i);
                    }
                    var blob = new Blob([uInt8Array], {type: contentType});
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("click", false, false);
                    aLink.id = "img" + id;
                    aLink.download = imgName;
                    aLink.href = URL.createObjectURL(blob);
                    aLink.dispatchEvent(evt);
                    aLink.appendChild(node);
                    canvas.after(aLink);
                    var imgId = document.getElementById("img" + id);
                    imgId.click();
                    // imgId.parentNode.removeChild(imgId);
                    if(type=="goods"){
                        self.percent_goods = ((num + 1) / length).toFixed(4) * 100;
                    }else{
                        self.percent_polling = ((num + 1) / length).toFixed(4) * 100;
                    }
                }, 50)
            }
        }
    }
</script>

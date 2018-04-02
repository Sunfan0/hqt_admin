<style scoped lang="less">
    .body {
        margin: 20px auto;
    }

    .body .title {
        font-size: 18px;
        padding: 10px;
        background-color: hsla(0, 0%, 100%, .7);
    }

    .body Form {
        background-color: white;
        padding: 40px 10px;
    }
</style>

<template>
    <div class="body">
        <p class="title">{{titletext}}</p>
        <Form :model="formItem" :label-width="80">
            <Row>
                <Col span="12">
                <FormItem label="物料名称">
                    <Input v-model="formItem.name" placeholder="物料名称"></Input>
                </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span="12">
                <FormItem label="规格">
                    <Input v-model="formItem.brand" placeholder="规格"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="型号">
                    <Input v-model="formItem.model" placeholder="型号"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="物料类型">
                    <Cascader :data="datatype" v-model="formItem.type"></Cascader>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="所有者信息">
                    <Select v-model="formItem.classify">
                        <Option value="1">自有</Option>
                        <Option value="2">暂存</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row v-bind:style="styleObject">
                <Col span="12">
                <FormItem label="数量">
                    <InputNumber v-model="formItem.wareNowSum"></InputNumber>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="单价">
                    <InputNumber v-model="formItem.price"></InputNumber>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="单位">
                    <Input v-model="formItem.unit" placeholder="单位"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="库存警报数">
                    <InputNumber v-model="formItem.alertNum"></InputNumber>
                </FormItem>
                </Col>
            </Row>
            <FormItem label="备注">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="备注"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" v-on:click="addMethod">提交</Button>
                <Button type="error" v-on:click="resetMethod" style="margin-left: 8px">重置</Button>
                <Button v-bind:style="styleBtn" v-on:click="backMethod" style="margin-left: 150px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                editorid: "",
                styleObject: {
                    display: ''
                },
                styleBtn: {
                    display: 'none'
                },
                titletext: '新增物料',
                typeid: '',
                datatype: [],
                formItem: {
                    name: '',
                    brand: '',
                    model: '',
                    type: [],
                    classify: '',
                    wareNowSum: 0,
                    price: 0,
                    unit: '',
                    alertNum: 0,
                    remark: ''
                }
            }
        },
        created() {
            if (this.$route.query) {
                this.editorid = this.$route.query.wareid
            }
            if (this.editorid) {
                this.styleObject.display = "none"
                this.styleBtn.display = ""
                this.titletext = "编辑物料"
                this.get('resources/biz/ware/findById', {
                    id: this.editorid
                }, res => {
                    console.log(res.data.data);
                    this.typeid = res.data.data.type
                    this.formItem.classify = "1";
                    if (res.data.data.classify == "暂存") {
                        this.formItem.classify = "2";
                    }
                    this.formItem.name = res.data.data.name
                    this.formItem.brand = res.data.data.brand
                    this.formItem.model = res.data.data.model
                    this.formItem.unit = res.data.data.unit
                    this.formItem.alertNum = res.data.data.alertNum
                    this.formItem.remark = res.data.data.remark
                }, err => {
                })
            }

            this.datatype = [];
            this.get('resources/biz/wareType/list', {}, res => {
                let array = res.data;
                for (var i = 0; i < array.length; i++) {
                    this.datatype.push({value: array[i].id, label: array[i].name})

                    if (array[i].id == this.typeid) {
                        this.formItem.type.push(array[i].id);
                    }
                    if (array[i].children) {
                        this.datatype[i].children = [];
                        var children = array[i].children;
                        for (var j = 0; j < children.length; j++) {
                            this.datatype[i].children.push({value: children[j].id, label: children[j].name})

                            if (children[j].id == this.typeid) {
                                this.formItem.type.push(array[i].id, children[j].id);
                            }
                        }
                    }
                }
            }, err => {
            })
        },
        methods: {
            addMethod: function () {
                if (this.formItem.name == "" || (this.formItem.type[this.formItem.type.length - 1]) == "" || this.formItem.classify == "" || this.formItem.brand == "" || this.formItem.model == "" || this.formItem.unit == "") {
                    this.$Message.error("物料信息不完整，无法提交！");
                    return;
                }

                var url = ""
                var params = new URLSearchParams();
                params.append("name", this.formItem.name);
                params.append("type", this.formItem.type[this.formItem.type.length - 1]);
                params.append("classify", this.formItem.classify);
                params.append("brand", this.formItem.brand);
                params.append("model", this.formItem.model);
                params.append("unit", this.formItem.unit);
                params.append("alertNum", this.formItem.alertNum);
                params.append("remark", this.formItem.remark);
                params.append("price", this.formItem.price);
                params.append("num", this.formItem.wareNowSum);
                if (this.editorid) {
                    params.append("id", this.editorid);
                    url = "resources/biz/ware/save"
                } else {
                    url = "resources/biz/ware/add"
                }

                if (this.editorid) {
                    this.post(url, params, res => {
                        if (this.editorid) {
                            this.$router.replace('/index/list')
                        } else {
                            Object.assign(this.$data, this.$options.data())
                            this.$Message.success('提交成功！');
                        }
                    }, err => {
                        this.$Message.error(err.response.data.message);
                    })
                } else {
                    this.$Modal.confirm({
                        title: "注意",
                        content: "物料新增后无法删除，确定要新增吗？",
                        onOk: () => {
                            this.post(url, params, res => {
                                if (this.editorid) {
                                    this.$router.replace('/index/list')
                                } else {
                                    this.$Message.success('提交成功！');
                                    this.resetMethod();
                                }
                            }, err => {
                                this.$Message.error(err.response.data.message);
                            })
                        }
                    });
                }


            },
            resetMethod: function () {
//                Object.assign(this.$data, this.$options.data())
                this.formItem.name=""
                this.formItem.type=[]
                this.formItem.classify=""
                this.formItem.brand=""
                this.formItem.model=""
                this.formItem.unit=""
                this.formItem.alertNum=0
                this.formItem.remark=""
                this.formItem.price=0
                this.formItem.wareNowSum=0
            },
            backMethod: function () {
                this.$router.replace('/index/list')
            }
        }
    }
</script>

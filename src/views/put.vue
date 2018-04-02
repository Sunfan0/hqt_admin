<style scoped lang="less">
    .body {
        margin: 20px auto;
    }
</style>
<template>
    <div class="body">
        <Form :model="formItem" :label-width="80">
            <Row>
                <Col span="12">
                <FormItem label="物料名称">
                    <Input v-model="formItem.name" disabled></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="规格">
                    <Input v-model="formItem.brand" disabled></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="型号">
                    <Input v-model="formItem.model" disabled></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="物料类型">
                    <Input v-model="formItem.type" disabled></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="所有者信息">
                    <Input v-model="formItem.classify" disabled></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem label="单位">
                    <Input v-model="formItem.monad" disabled></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="库存警报数">
                    <InputNumber v-model="formItem.inventory" disabled></InputNumber>
                </FormItem>
                </Col>
            </Row>
            <FormItem label="备注">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" disabled></Input>
            </FormItem>
            <FormItem label="物料ID">
                <!--<Input v-model="formItem.id" placeholder="物料ID(可扫码输入)" autofocus v-focus></Input>-->
                <input class="custom-input" v-model="formItem.id" placeholder="物料ID(可扫码输入)" v-focus/>
            </FormItem>
            <FormItem label="单价">
                <InputNumber v-model="formItem.price"></InputNumber>
            </FormItem>
            <FormItem label="数量">
                <InputNumber v-model="formItem.number"></InputNumber>
            </FormItem>
            <FormItem>
                <Button type="primary" v-on:click="putMethod">提交</Button>
                <Button type="error" v-on:click="resetMethod" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        created() {
            let component = this;
            document.onkeydown = function () {
                var key = window.event.keyCode
                if (key == 13) {
                    if(component.formItem.id==""){
                        component.$Message.error("请输入物料ID！");
                        return;
                    }
                    if(!(component.formItem.id.length==32)){
                        component.$Message.error("物料ID长度不正确，请检查是否包含空格或其他字符！");
                        return;
                    }
                    component.get('resources/biz/ware/findById', {
                        id: component.formItem.id
                    }, res => {
                        component.goodsType(res.data.data.type)
                        console.log(res.data.data);
                        component.formItem.name = res.data.data.name;
                        component.formItem.brand = res.data.data.brand;
                        component.formItem.model = res.data.data.model;
                        component.formItem.classify = res.data.data.classify;
                        component.formItem.monad = res.data.data.unit;
                        component.formItem.inventory = res.data.data.alertNum;
                        component.formItem.remark = res.data.data.remark;
                    }, err => {
                        this.$Message.error("物料ID不正确！");
                    })
                }
            }
        },
        data() {
            return {
                formItem: {
                    name: '',
                    brand: '',
                    type: '',
                    model: '',
                    classify: '',
                    monad: '',
                    inventory: 0,
                    remark: '',
                    id: '',
                    price: 0,
                    number: 0
                }
            }
        },
        methods: {
            putMethod: function () {
                if(this.formItem.id==""){
                    this.$Message.error("请输入物料ID！");
                    return;
                }
                if(this.formItem.price==""||this.formItem.price<=0){
                    this.$Message.error("单价必须大于0！");
                    return;
                }
                if(this.formItem.number==""||this.formItem.number<=0){
                    this.$Message.error("数量必须大于0！");
                    return;
                }

                var params = new URLSearchParams();
                params.append("wareId", this.formItem.id);
                params.append("price", this.formItem.price);
                params.append("num", this.formItem.number);
                this.post('resources/biz/batches/save', params, res => {
                    this.$Message.success('提交成功！');
                    Object.assign(this.$data, this.$options.data())
                }, err => {
                    this.$Message.error(err.response.data.message);
                })
            },
            resetMethod: function () {
                Object.assign(this.$data, this.$options.data())
            },
            goodsType: function (id) {
                this.get('resources/biz/wareType/list', {}, res => {
                    let array = res.data;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].id == id) {
                            this.formItem.type = array[i].name;
                        } else if (array[i].children) {
                            var children = array[i].children;
                            for (var j = 0; j < children.length; j++) {
                                if (children[j].id == id) {
                                    this.formItem.type = children[i].name;
                                }
                            }
                        }
                    }
                }, err => {
                })
            }
        }
    }
</script>

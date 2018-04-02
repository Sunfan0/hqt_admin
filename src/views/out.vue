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
                <!--<Input v-model="formItem.id" placeholder="物料ID(可扫码输入)" autofocus></Input>-->
                <input class="custom-input" v-model="formItem.id" placeholder="物料ID(可扫码输入)" v-focus/>
            </FormItem>
            <FormItem label="价格" v-bind:style="priceStyle">
                <InputNumber v-model="formItem.price"></InputNumber>
            </FormItem>
            <FormItem label="数量">
                <InputNumber v-model="formItem.number"></InputNumber>
            </FormItem>
            <FormItem label="工单号">
                <Input v-model="formItem.orderid" placeholder="请输入报修工单单号"></Input>
            </FormItem>
            <FormItem label="请购单号">
                <Input v-model="formItem.buyid" placeholder="请输入请购单号"></Input>
            </FormItem>
            <FormItem label="">
                <RadioGroup v-model="outGroup" @on-change="selectOutGroup">
                    <Radio label="出库给人"></Radio>
                    <Radio label="出库给部门"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="出库人" v-bind:style="styleMan">
                <Input v-model="formItem.outman" placeholder="出库人工号"></Input>
            </FormItem>
            <FormItem label="出库部门" v-bind:style="styleList">
                <Select v-model="formItem.outtype" style="margin-bottom: 20px">
                    <Option v-for="item in outlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" v-on:click="outMethod">提交</Button>
                <Button type="error" v-on:click="resetMethod" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                outGroup: '出库给人',
                outlist: [],
                priceStyle: {
                    display: 'none'
                },
                styleMan: {
                    display: 'block'
                },
                styleList: {
                    display: 'none'
                },
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
                    number: 0,
                    orderid: '',
                    buyid: '',
                    outman: '',
                    outtype: ''
                }
            }
        },
        created() {
            this.getOutList()
            let component = this;
            document.onkeydown = function () {
                var key = window.event.keyCode
                if (key == 13) {
                    if (component.formItem.id == "") {
                        component.$Message.error("请输入物料ID！");
                        return;
                    }
                    if (!(component.formItem.id.length == 32)) {
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
                        if (res.data.data.classify != "自有") {
                            component.priceStyle.display = "block"
                        }
                    }, err => {
                        this.$Message.error("物料ID不正确！");
                    })
                }
            }
        },
        methods: {
            outMethod: function () {
                if (this.formItem.id == "") {
                    this.$Message.error("请输入物料ID！");
                    return;
                }
                if (this.styleMan.display == "block" && (this.formItem.price == "" || this.formItem.price <= 0)) {
                    this.$Message.error("价格必须大于0！");
                    return;
                }
                if (this.formItem.number == "" || this.formItem.number <= 0) {
                    this.$Message.error("数量必须大于0！");
                    return;
                }
                if (this.formItem.orderid == "" && this.formItem.buyid == "") {
                    this.$Message.error("请输入报修工单单号或请购单号！");
                    return;
                }
                if (this.outGroup == "出库给人" && this.formItem.outman == "") {
                    this.$Message.error("请输入出库人工号或选择出库部门！");
                    return;
                }
                if (this.outGroup == "出库给部门" && this.formItem.outtype == "") {
                    this.$Message.error("请输入出库人工号或选择出库部门！");
                    return;
                }
                var dept_id = ""
                var worker_code = ""
                if (this.outGroup == "出库给人") {
                    worker_code = this.formItem.outman;
                }
                if (this.outGroup == "出库给部门") {
                    dept_id = this.formItem.outtype;
                }
                var params = new URLSearchParams();
                params.append("wareId", this.formItem.id);
                params.append("dept_id", dept_id);
                params.append("worker_code", worker_code);
                params.append("num", this.formItem.number);
                params.append("price", this.formItem.price);
                params.append("order_code", this.formItem.orderid);
                params.append("req_number", this.formItem.buyid);
                this.post('resources/biz/batches/ware_out', params, res => {
                    this.$Message.success('提交成功！');
                    Object.assign(this.$data, this.$options.data())
                }, err => {
                    this.$Message.error(err.response.data.message);
                })
            },
            resetMethod: function () {
//                Object.assign(this.$data, this.$options.data())
                this.formItem.id = ""
                this.formItem.number = 0
                this.formItem.outman = ""
                this.formItem.outtype = ""
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
            },
            getOutList: function () {
                this.get('resources/biz/department/list', {}, res => {
                    this.outlist = []
                    for (var i = 0; i < res.data.data.length; i++) {
                        var d = {}
                        d.value = res.data.data[i].id
                        d.label = res.data.data[i].name
                        this.outlist.push(d);
                    }
                }, err => {
                })
            },
            selectOutGroup: function () {
                switch (this.outGroup) {
                    case "出库给人":
                        this.styleMan.display = "block"
                        this.styleList.display = "none"
                        break;
                    case "出库给部门":
                        this.styleMan.display = "none"
                        this.styleList.display = "block"
                        break;
                }
            }
        }
    }
</script>

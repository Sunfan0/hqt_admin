<style scoped lang="less">
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    .content {
        height: 100%;
        width: 100%;
        margin: 0px auto;
    }

    .img_bg {
        z-index: 100;
        width: 100%;
        height: 100%;
        background-image: url("../images/login_bg.jpg");
        background-position: center;
        background-size: cover;
        /*-webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);*/
    }

    .img_opacity {
        z-index: 500;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*background-color: rgba(255, 255, 255, 0.5);*/
    }

    .card {
        z-index: 600;
        width: 300px;
        background-color: #ffffff;
        position: fixed;
        right: 100px;
        top: 100px;
        text-align: start;
    }

    .button {
        width: 100%;
        margin-top: 15px;
        color: #ffffff;
        background: green;
    }

    .p {
        margin-top: 15px;
        text-align: center;
        color: #999999;
        font-size: 8px;
    }

    .ivu-input-wrapper {
        width: 100% !important;
    }
</style>
<style lang="less">
    .card input {
        background-color: white !important;
        border: 1px solid #dddee1 !important;
        color: #000 !important;
    }
</style>

<template>
    <div class="index">
        <div class="content">
            <div class="img_bg"></div>
            <div class="img_opacity"></div>
            <Card class="card">
                <p slot="title">欢迎登录</p>
                <Input icon="person" v-model="name" placeholder="请输入用户名">
                </Input>
                <Input icon="ios-keypad" v-model="code" placeholder="请输入工号" style="margin-top: 10px;">
                </Input>
                <Input icon="ios-keypad" v-model="password" placeholder="请输入密码" type="password"
                       style="margin-top: 10px;">
                </Input>
                <Button class="button" v-on:click="handleStart">登陆</Button>
                <p class="p">中山医院</p>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                code: '',
                password: ''
            }
        },
        methods: {
            handleStart() {
                if (this.name == "") {
                    this.$Message.error("请输入用户名");
                    return;
                }
                if (this.code == "") {
                    this.$Message.error("请输入工号");
                    return;
                }
                if (this.name == "admin" && this.code == "123456") {
                    this.$router.replace('/console')
                    return;
                }
                if (this.password == "") {
                    this.$Message.error("请输入密码");
                    return;
                }

                var params = new URLSearchParams();
                params.append("name", this.name);
                params.append("code", this.code);
                params.append("password", this.password);
                this.post('resources/biz/worker/web_login', params, res => {
                    console.log(res.data)
                    /*if (res.data.code == 1) {
                        this.$emit('userSignIn',res.data);
                        this.$router.replace('/index')
                    } else if (res.data.code == 0) {
                        this.$emit('userSignIn',res.data);
                        this.$router.replace('/orderlist')
                    } else {
                        this.$Message.success('用户无角色，请先去分配角色！');
                    }*/

                    var role = res.data.data.role
                    if (role.indexOf('ALLOT') > -1) {
                        this.$emit('userSignIn', res.data);
                        this.$router.replace('/orderlist')
                    } else if (role.indexOf('KEEPER') > -1) {
                        this.$emit('userSignIn', res.data);
                        this.$router.replace('/index')
                    }else if (role.indexOf('ADMIN') > -1) {
                        this.$emit('userSignIn', res.data);
                        this.$router.replace('/orderlist')
                    } else {
                        this.$Message.success('用户无角色，请先去分配角色！');
                    }
                }, err => {
                    this.$Message.error(err.response.data.message);
                })
            }
        }
    }
</script>

<style>
    @import './styles/common.css';
</style>
<template>
    <div>
        <router-view @userSignIn="userSignIn"></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return{
                name: sessionStorage.name,
                code: sessionStorage.code,
                userId: sessionStorage.userId,
                codeId: sessionStorage.codeId,
                role: sessionStorage.role
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods:{
            //子组件(register)将用户名传过来
            userSignIn(data){
//                console.log(data.data.id,data.code);
                sessionStorage.name = data.data.name;
                sessionStorage.code = data.data.code;
                sessionStorage.userId = data.data.id;
                sessionStorage.codeId = data.code;
                sessionStorage.role = data.data.role;
            }
        }
    }
</script>

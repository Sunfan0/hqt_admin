<style scoped lang="less">
    #clock {
        font-family: 'Share Tech Mono', monospace;
        text-align: center;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        color: #36fe05;
        text-shadow: 0 0 20px rgb(27, 138, 109), 0 0 20px rgba(10,175,230,0);
        display: inline-block;
        height: 20px;
    }
    #clock .time {
        letter-spacing: 0.05em;
        padding: 5px 0;
        font-size: 24px;
    }
    #clock .date {
        letter-spacing: 0.1em;
        font-size: 12px;
    }
</style>

<template>
    <div id="clock">
        <p class="date">{{ date }}</p>
        <p class="time">{{ time }}</p>
    </div>
</template>
<script>
    export default {
        created(){
            //setInterval(this.updateTime(),1000)
            setInterval(() => {
                this.updateTime();
            }, 1000)
        },
        data() {
            return {
                week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                time: '',
                date: ''
            }
        },
        methods: {
            updateTime: function () {
                var cd = new Date();
                this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
                this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
            },
            zeroPadding: function (num, digit) {
                var zero = '';
                for (var i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            }
        }
    }
</script>

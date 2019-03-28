<style lang="scss">
    @import '../../../../src/style/variable.scss';

    @-webkit-keyframes ball-beat {
        50% {
            opacity: 0.2;
            -webkit-transform: scale(0.75, 0.75);
            transform: scale(0.75, 0.75);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    
    @keyframes ball-beat {
        50% {
            opacity: 0.2;
            -webkit-transform: scale(0.75, 0.75);
            transform: scale(0.75, 0.75);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    
    .wui-ball-beat{
        display: flex;
        justify-content: space-around;
    }

    .wui-ball-beat>div {
        background-color: $color-blue;
        border-radius: 100%;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
        -webkit-animation: ball-beat 0.7s 0s infinite linear;
        animation: ball-beat 0.7s 0s infinite linear;
    }
    
    .wui-ball-beat>div:nth-child(2n-1) {
        -webkit-animation-delay: 0.35s !important;
        animation-delay: 0.35s !important;
    }
</style>

<template>
    <div v-if="visiable" class="wui-ball-beat" :style="{width: width+'px'}">
        <div :style="styles"></div>
        <div :style="styles"></div>
        <div :style="styles"></div>
    </div>
</template>

<script>
    /**
     * wui-ball-beat
     * @desc 圆形跳动动画
     * @param {Number} width=24 - 组件宽度
     * @param {String} color=#ffffff - 组件颜色, css color
     * @example
     *      <w-ball-beat></w-ball-beat>
     **/
    export default {
        name: 'w-ball-beat',
        props: {
            width: {
                type: Number,
                default: 24
            },
            color: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        computed: {
            styles() {
                const w = this.width * 0.3334 * 0.8;
                var s = {
                    width: w + 'px',
                    height: w + 'px'
                }

                if (this.color){
                    s.backgroundColor = this.color;
                }

                return s;
            }
        },
        methods: {
            show() {
                this.visiable = true;
                this.$emit('show');
            },
            hide() {
                this.visiable = false;
                this.$emit('hide');
            }
        },
        mounted() {
            this.$parent && this.$parent.$on('visiable-change', function (vis) {
                this[vis? 'show' : 'hide']();
            }.bind(this));
        }
    }
</script>

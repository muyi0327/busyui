<style lang="scss">
    @import "../../../../src/style/variable.scss";
    @-webkit-keyframes line-scale-pulse-out {
        0% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
        50% {
            -webkit-transform: scaley(0.4);
            transform: scaley(0.4);
        }
        100% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
    }

    @keyframes line-scale-pulse-out {
        0% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
        50% {
            -webkit-transform: scaley(0.4);
            transform: scaley(0.4);
        }
        100% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
    }

    .busy-line-scale-pulse-out {
        text-align: center;
        display: inline-block;
    }

    .busy-line-scale-pulse-out > div {
        background-color: $color-blue;
        border-radius: 2px;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
        -webkit-animation: line-scale-pulse-out 0.9s 0s infinite
            cubic-bezier(0.85, 0.25, 0.37, 0.85);
        animation: line-scale-pulse-out 0.9s 0s infinite
            cubic-bezier(0.85, 0.25, 0.37, 0.85);
    }

    .busy-line-scale-pulse-out > div:nth-child(2),
    .busy-line-scale-pulse-out > div:nth-child(4) {
        -webkit-animation-delay: 0.2s !important;
        animation-delay: 0.2s !important;
    }

    .busy-line-scale-pulse-out > div:nth-child(1),
    .busy-line-scale-pulse-out > div:nth-child(5) {
        -webkit-animation-delay: 0.4s !important;
        animation-delay: 0.4s !important;
    }
</style>
<template>
    <div v-if="visiable" class="busy-line-scale-pulse-out">
        <div :style="itemStyles"></div>
        <div :style="itemStyles"></div>
        <div :style="itemStyles"></div>
        <div :style="itemStyles"></div>
        <div :style="itemStyles"></div>
    </div>
</template>
<script>
    /**
     * busy-line-scale-pulse-out
     * @desc 跳动线条动画组件
     * @param {String} color - 组件颜色, css color [hex, rgb, rgba], 默认 #ffffff
     * @param {Number} width - 组件宽度, 默认 30 <px>
     * @param {Number} height - 组件高度, 默认 10 <px>
     * @param {Boolean} visiable - 是否可见, 默认 true
     * @example
     *      <busy-line-scale-pulse-out></busy-line-scale-pulse-out>
     **/
    export default {
        name: 'busy-line-scale-pulse-out',
        props: {
            color: {
                type: String,
                default: ''
            },
            width: {
                type: Number,
                default: 30
            },
            height: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        computed: {
            itemStyles: function () {
                var w = Math.ceil(this.width / 5);
                var s = {
                    marginRight: Math.floor(w * 0.6) + 'px',
                    width: Math.ceil(w * 0.4) + 'px',
                    height: this.height + 'px'
                }

                if (this.color) {
                    s['background-color'] = this.color
                }

                return s;
            }
        },
        methods: {
            show() {
                this.visiable = true;
                this.$emit('show');
                return this;
            },
            hide() {
                this.visiable = false;
                this.$emit('hide');
                return this;
            }
        },
        mounted() {
            this.$parent && this.$parent.$on('visiable-change', function (vis) {
                this[vis ? 'show' : 'hide']();
            }.bind(this));
        }
    }
</script>

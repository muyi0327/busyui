<style lang="scss">
    @import "../../../../src/style/variable.scss";
    @-webkit-keyframes ball-spin-fade-loader {
        50% {
            opacity: 0.3;
            -webkit-transform: scale(0.4);
            transform: scale(0.4);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes ball-spin-fade-loader {
        50% {
            opacity: 0.3;
            -webkit-transform: scale(0.4);
            transform: scale(0.4);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    .busy-ball-spin-fade-loader {
        position: relative;
        display: inline-block;
    }

    .busy-ball-spin-fade-loader > div:nth-child(1) {
        top: 25px;
        left: 0;
        -webkit-animation: ball-spin-fade-loader 1s 0s infinite linear;
        animation: ball-spin-fade-loader 1s 0s infinite linear;
    }

    .busy-ball-spin-fade-loader > div:nth-child(2) {
        top: 17.04545px;
        left: 17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s 0.12s infinite linear;
        animation: ball-spin-fade-loader 1s 0.12s infinite linear;
    }

    .busy-ball-spin-fade-loader > div:nth-child(3) {
        top: 0;
        left: 25px;
        -webkit-animation: ball-spin-fade-loader 1s 0.24s infinite linear;
        animation: ball-spin-fade-loader 1s 0.24s infinite linear;
    }

    .busy-ball-spin-fade-loader > div:nth-child(4) {
        top: -17.04545px;
        left: 17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s 0.36s infinite linear;
        animation: ball-spin-fade-loader 1s 0.36s infinite linear;
    }

    .busy-ball-spin-fade-loader > div:nth-child(5) {
        top: -25px;
        left: 0;
        -webkit-animation: ball-spin-fade-loader 1s 0.48s infinite linear;
        animation: ball-spin-fade-loader 1s 0.48s infinite linear;
    }

    .busy-ball-spin-fade-loader > div:nth-child(6) {
        top: -17.04545px;
        left: -17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s 0.6s infinite linear;
        animation: ball-spin-fade-loader 1s 0.6s infinite linear;
    }

    .busy-ball-spin-fade-loader > div:nth-child(7) {
        top: 0;
        left: -25px;
        -webkit-animation: ball-spin-fade-loader 1s 0.72s infinite linear;
        animation: ball-spin-fade-loader 1s 0.72s infinite linear;
    }

    .busy-ball-spin-fade-loader > div:nth-child(8) {
        top: 17.04545px;
        left: -17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s 0.84s infinite linear;
        animation: ball-spin-fade-loader 1s 0.84s infinite linear;
    }

    .busy-ball-spin-fade-loader > div {
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        background-color: $color-blue;
    }
</style>
<template>
    <div v-if="visiable" class="busy-ball-spin-fade-loader" :style="styles">
        <div v-for="(item,$i) in items" :key="$i" :style="[
            color ? {backgroundColor: color} : {},
            { width: item.w, height: item.w, left: item.x, top: item.y}]"></div>
    </div>
</template>

<script>
    /**
     * busy-ball-spin-fade
     * @desc ball 动画
     * @param {Number} width - 组件宽度和高度
     * @param {String} color - 组件颜色, css color
     * @example
     *      <busy-ball-spin-fade></busy-ball-spin-fade>
     **/
    export default {
        name: 'busy-ball-spin-fade',
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
                return {
                    width: this.width + 'px',
                    height: this.width + 'px',

                }
            },
            items() {
                return '#,#,#,#,#,#,#,#'.split(',').map((v, i) => {
                    const rotate = 45 * i;
                    return {
                        rotate: rotate,
                        x: this.width * (0.5 - 0.125 + 3 / 8 * Math.cos(rotate / 180 * Math.PI)) + 'px',
                        y: this.width * (0.5 - 0.125 + 3 / 8 * Math.sin(rotate / 180 * Math.PI)) + 'px',
                        w: this.width * 0.25 + 'px'
                    }
                });
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

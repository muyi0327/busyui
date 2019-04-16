<style lang="scss">
    @import "../../../../src/style/variable.scss";
    @-webkit-keyframes line-spin-fade-loader {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            opacity: 0.1;
        }
    }

    @keyframes line-spin-fade-loader {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            opacity: 0.1;
        }
    }

    .busy-line-spin-fade-loader {
        position: relative;
        display: inline-block;
        > div {
            opacity: 0.1;
        }
    }

    .busy-line-spin-fade-loader > div:nth-child(1) {
        -webkit-animation: line-spin-fade-loader 1.32s 0s infinite ease;
        animation: line-spin-fade-loader 1.32s 0s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(2) {
        -webkit-animation: line-spin-fade-loader 1.32s 0.12s infinite ease;
        animation: line-spin-fade-loader 1.32s 0.12s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(3) {
        -webkit-animation: line-spin-fade-loader 1.32s 0.24s infinite ease;
        animation: line-spin-fade-loader 1.32s 0.24s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(4) {
        -webkit-animation: line-spin-fade-loader 1.32s 0.36s infinite ease;
        animation: line-spin-fade-loader 1.32s 0.36s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(5) {
        -webkit-animation: line-spin-fade-loader 1.32s 0.48s infinite ease;
        animation: line-spin-fade-loader 1.32s 0.48s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(6) {
        -webkit-animation: line-spin-fade-loader 1.32s 0.6s infinite ease;
        animation: line-spin-fade-loader 1.32s 0.6s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(7) {
        -webkit-animation: line-spin-fade-loader 1.32s 0.72s infinite ease;
        animation: line-spin-fade-loader 1.32s 0.72s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(8) {
        -webkit-animation: line-spin-fade-loader 1.32s 0.84s infinite ease;
        animation: line-spin-fade-loader 1.32s 0.84s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(9) {
        -webkit-animation: line-spin-fade-loader 1.32s 0.96s infinite ease;
        animation: line-spin-fade-loader 1.32s 0.96s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(10) {
        -webkit-animation: line-spin-fade-loader 1.32s 1.08s infinite ease;
        animation: line-spin-fade-loader 1.32s 1.08s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(11) {
        -webkit-animation: line-spin-fade-loader 1.32s 1.2s infinite ease;
        animation: line-spin-fade-loader 1.32s 1.2s infinite ease;
    }

    .busy-line-spin-fade-loader > div:nth-child(12) {
        -webkit-animation: line-spin-fade-loader 1.32s 1.32s infinite ease;
        animation: line-spin-fade-loader 1.32s 1.32s infinite ease;
    }

    .busy-line-spin-fade-loader > div {
        border-radius: 1px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        transform-origin: 0 50%;
        background-color: $color-blue;
    }
</style>
<template>
    <div v-if="visiable" class="busy-line-spin-fade-loader" :style="{width: width+'px', height: height+'px'}">
        <div :key="'lsf-'+$i" v-for="(ps, $i) in positions" :style="[
        color ? {backgroundColor: color}:{},
        {height: itemSize.height, width: itemSize.width,webkitTransform: ps.rotate, top: ps.x, left: ps.y}]"></div>
    </div>
</template>
<script>
    /**
     * line-spin-fade
     * @desc 菊花动画组件
     * @param {String} color 组件颜色, 可取值 css color [hex, rgb, rgba] 默认#ffffff
     * @param {Number} width 组件宽度, 默认 40 <px>
     * @param {Number} height 组件高度 默认 40 <px>
     * 
     * @example
     *      <line-spin-fade :color="#ff0000" :width="20" :height="20"></line-spin-fade>
     **/
    export default {
        name: 'busy-line-spin-fade',
        props: {
            color: {
                type: String,
                default: '#ffffff'
            },
            width: {
                type: Number,
                default: 24
            },
            height: {
                type: Number,
                default: 24
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        computed: {
            /**
             * 计算每根item的位置
             * @api private
             */
            positions: function () {

                return '#,#,#,#,#,#,#,#,#,#,#,#'.split(',').map((v, k) => {
                    const rotate = k * 30;
                    return {
                        rotate: 'rotate(' + rotate + 'deg)',
                        x: this.width * 5 / 10 + (this.width * 300 * ((Math.sin(rotate / 180 * Math.PI)).toFixed(2) * 100) / 100000) + 'px',
                        y: this.height * 5 / 10 + (this.height * 300 * ((Math.cos(rotate / 180 * Math.PI)).toFixed(2) * 100) / 100000) + 'px'
                    }
                });
            },
            /**
             * 计算每根item的宽高
             * @api private
             */
            itemSize: function () {
                return {
                    width: this.width * 3 / 9 + 'px',
                    height: Math.ceil(this.width / 14) + 'px'
                }
            }
        },
        methods: {
            /**
             * 显示组件
             */
            show() {
                this.visiable = true;
                this.$emit('show');
                return this;
            },
            /**
             *  隐藏组件
             */
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

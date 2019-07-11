<style lang="scss">
    @import "../../../src/style/variable.scss";

    .#{$prefixCls}-progress-ring {
        position: relative;
        text-align: center;
        svg &__bar {
            stroke: $progress-line-color;
            stroke-width: #{$progress-line-width}px;
        }

        svg &__track {
            stroke: $progress-background-color;
            stroke-width: #{$progress-line-width}px;
        }

        &__text {
            position: absolute;
            top: 50%;
            width: 100%;
            text-align: center;
            z-index: 1;
            transform: translateY(-50%);
        }
    }
</style>
<template>
    <div :class="`${prefixCls}-progress-ring`" v-on:click="handleClick">
        <svg :width="size" :height="size" :viewport="viewport" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle :class="`${prefixCls}-progress-ring__track`" :cx="radius" :cy="radius" :r="sRdius" :style="trackStyles" fill="transparent" :stroke-linecap="linecap" :stroke-dasharray="dasharray" :stroke-dashoffset="0">
            </circle>

            <circle :class="`${prefixCls}-progress-ring__bar`" :cx="radius" :cy="radius" :r="sRdius" :style="barStyles" fill="transparent" :stroke-linecap="linecap" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset">
            </circle>
        </svg>
        <div :class="`${prefixCls}-progress-ring__text`">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import { initName, BNumber } from '../../util'
    import mixins from './mixins'
    /**
     * @class
     * @constructor
     * @des 环形进度条组件
     * @param {Number} size - 组件直径大小,默认 100<px>
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color
     * @param {String} lineColor - 进度条颜色, 取值范围 css color
     * @param {String} linecap=round - 进度条终结形半, 取值范围 butt, round, square
     * @param {String} direction = '1' - 顺时针还是逆时针, 取值范围 '1','-1'
     * @param {String} content - 显示内容，this.value + '%'
     **/
    export default {
        name: initName('progress-ring'),
        mixins: [mixins],
        props: {
            size: {
                type: Number,
                default: 100
            },
            direction: {
                type: [Number, String],
                default: 1
            },
            linecap: {
                type: String,
                default: 'round'
            }
        },

        computed: {
            dasharray() {
                return (this.size - 2 * this.trackWidth) * Math.PI;
            },
            dashoffset() {
                var d = Number(this.direction);
                var p = (100 + (-1 * d) * this.value) / 100;
                return (this.size - 2 * this.trackWidth) * Math.PI * p;
            },
            radius() {
                return this.size * 0.5;
            },
            sRdius() {
                return this.size * 0.5 - this.trackWidth;
            },
            viewport() {
                return '0 0 ' + this.size + ' ' + this.size;
            },
            trackStyles() {
                var s = {};
                if (this.trackWidth) {
                    s.strokeWidth = BNumber.cmpUnit(this.trackWidth)
                }

                if (this.trackColor) {
                    s.stroke = this.trackColor
                }

                return s;
            },
            barStyles() {
                var s = {};
                if (this.trackWidth) {
                    s.strokeWidth = BNumber.cmpUnit(this.trackWidth)
                }

                if (this.lineColor) {
                    s.stroke = this.lineColor
                }

                return s;
            }
        }
    }
</script>

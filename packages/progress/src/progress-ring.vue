<style lang="scss">
    @import "../../../src/style/variable.scss";

    .#{$prefixClass}-progress-ring {
        position: relative;
        svg &__bar {
            transition-property: stroke-dashoffset;
            transition-duration: 1s;
            transition-timing-function: linear;
            stroke: $progress-line-color;
            stroke-width: #{$progress-line-width}px;
        }

        svg &__track {
            stroke: $progress-background-color;
            stroke-width: #{$progress-line-width}px;
        }
    }
</style>
<template>
    <div class="busy-progress-ring" v-on:click="handleClick">
        <svg :width="size" :height="size" :viewport="viewport" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="busy-progress-ring__track" :cx="radius" :cy="radius" :r="sRdius" :style="trackStyles" fill="transparent" :stroke-linecap="linecap" :stroke-dasharray="dasharray" :stroke-dashoffset="0">
            </circle>

            <circle class="busy-progress-ring__bar" :cx="radius" :cy="radius" :r="sRdius" :style="barStyles" fill="transparent" :stroke-linecap="linecap" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset">
            </circle>
        </svg>
    </div>
</template>
<script>
    /**
     * busy-progress-ring
     * @des 环形进度条组件
     * @param {Number} size - 组件直径大小,默认 100<px>
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color
     * @param {String} barColor - 进度条颜色, 取值范围 css color
     * @param {String} linecap=round - 进度条终结形半, 取值范围 butt, round, square
     * @param {String} direction = '1' - 顺时针还是逆时针, 取值范围 '1','-1'
     * @param {String} content - 显示内容，this.percent + '%'
     * @example
     *      <busy-progress-ring :size="50" :track-width="10"></busy-progress-ring>
     **/
    export default {
        name: 'busy-progress-ring',
        props: {
            size: {
                type: Number,
                default: 100
            },
            duration: {
                type: Number,
                default: 500
            },
            trackWidth: {
                type: Number
            },
            trackColor: {
                type: String
            },
            barColor: {
                type: String
            },
            showText: {
                type: Boolean,
                default: false
            },
            direction: {
                type: [Number, String],
                default: 1
            },
            linecap: {
                type: String,
                default: 'round'
            },
            percent: {
                default: 0,
                validator(val) {
                    return typeof val === 'number' && val >= 0 && val <= 100;
                }
            }
        },

        computed: {
            dasharray() {
                return (this.size - 2 * this.trackWidth) * Math.PI;
            },
            dashoffset() {
                var d = Number(this.direction);
                var p = (100 + (-1 * d) * this.percent) / 100;
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
                    s.strokeWidth = this.trackWidth + 'px';
                }

                if (this.trackColor) {
                    s.stroke = this.trackColor;
                }

                return s;
            },
            barStyles() {
                var s = {};
                if (this.trackWidth) {
                    s.strokeWidth = this.trackWidth + 'px';
                }

                if (this.barColor) {
                    s.stroke = this.barColor;
                }

                return s;
            }
        },
        methods: {
            handleClick($evt) {
                this.$emit('click', $evt);
            }
        }
    }
</script>

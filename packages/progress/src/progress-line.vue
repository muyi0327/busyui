<style lang="scss">
    @import "../../../src/style/variable.scss";
    %small-height {
        line-height: 0;
        font-size: 0;
    }

    .#{$prefixCls}-progress-line {
        border-radius: 3px;
        display: flex;
        align-items: center;

        &__wrap {
            position: relative;
            flex: 1;
            background-color: $progress-background-color;
            @extend %small-height;
        }

        &__start,
        &__end {
            flex: none;
            display: flex;
            align-items: center;
            line-height: 1;
        }

        &__start {
            padding-right: 5px;
        }

        &__end {
            padding-left: 5px;
        }

        &__bar {
            height: 100%;
            @extend %small-height;

            border-radius: 3px;
            background-color: $progress-line-color;
        }
    }
</style>
<template>
    <div :class="`${prefixCls}-progress-line`" v-on:click="handleClick" :style="styles">
        <div :class="`${prefixCls}-progress-line__start`" v-show="$slots['start']">
            <slot name="start"></slot>
        </div>
        <div :class="`${prefixCls}-progress-line__wrap`" :style="trackStyles">
            <div :class="`${prefixCls}-progress-line__bar`" :style="barStyles"></div>
        </div>
        <div :class="`${prefixCls}-progress-line__end`" v-show="$slots['end']">
            <slot name="end"></slot>
        </div>
    </div>
</template>
<script>
    import { initName, BNumber } from '../../util'
    import mixins from './mixins'
    /**
     * @des 线形进度条组件
     * @param {Number} width - 组件长度,默认 100%
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color
     * @param {String} lineColor - 进度条颜色, 取值范围 css color
     * @param {String} showText - 是否显示进度数值, 默认 false
     **/
    export default {
        name: initName('progress-line'),
        mixins: [mixins],
        props: {
            height: {
                type: [Number, String]
            },
            width: {
                type: [Number, String]
            }
        },
        computed: {
            styles() {
                return {
                    width: BNumber.cmpUnit(this.width),
                    height: BNumber.cmpUnit(this.height)
                }
            },
            trackStyles() {
                return {
                    background: this.trackColor,
                    height: BNumber.cmpUnit(this.trackWidth)
                }
            },
            barStyles() {

                return {
                    width: this.value + '%',
                    background: this.lineColor
                }
            }
        }
    }
</script>

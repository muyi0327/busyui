<style lang="scss">
    @import "../../../src/style/variable";
    @import "../../../src/style/animate";

    .#{$prefixCls}-spinner-circle-rotate {
        display: inline-block;
        $rotate: #{$prefixCls}-animate--rotate;
        font-size: 0;
        line-height: 0;
        overflow: hidden;

        &__wrap {
            animation: $rotate 0.5s linear infinite;
            transform-origin: center;
            stroke: #853131;
            stroke-width: 6;
        }
    }
</style>
<template>
    <span :class="`${prefixCls}-spinner-circle-rotate`">
        <svg version="1.1" viewBox="0 0 64 64" :style="styles" xml:space="preserve" :class="`${prefixCls}-spinner-circle-rotate__svg`">
            <g stroke-linecap="round" :class="`${prefixCls}-spinner-circle-rotate__wrap`" :style="svgStyles">
                <circle cx="32" cy="32" :r="r" opacity="0.5" fill="none"></circle>
                <circle cx="32" cy="32" :r="r" stroke-dasharray="20 175" stroke-dashoffset="0" fill="none"></circle>
            </g>
        </svg>
    </span>
</template>
<script>
    import { BNumber, initName, baseMixins } from '../../util'
    /**
     * @class
     * @constructor
     * @desc 旋转圆环动画
     * @param {Number} width=24 - 组件宽度
     * @param {Number} height=24 - 组件高度
     * @param {String} color="#ffffff" - 组件颜色
     * @param {Number} strokeWidth=3 - 描边宽度
     **/
    export default {
        name: initName('spinner-circle-rotate'),
        mixins: [baseMixins],
        props: {
            height: {
                type: [Number, String],
                default: 64
            },
            width: {
                type: [Number, String],
                default: 64
            },
            color: {
                type: String
            },
            strokeWidth: {
                type: [Number, String],
                default: 6
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        computed: {
            styles() {
                let width = BNumber.cmpUnit(this.width)
                let height = BNumber.cmpUnit(this.height)

                return {
                    width,
                    height
                };
            },
            svgStyles() {
                let strokeWidth = this.strokeWidth
                let stroke = this.color

                return {
                    strokeWidth,
                    stroke
                }
            },
            r() {
                return 32 - this.strokeWidth
            }
        },
        mounted() {

        }
    }
</script>

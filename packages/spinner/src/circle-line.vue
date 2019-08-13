<style lang="scss" scoped>
    @import "../../../src/style/variable";

    .#{$prefixCls}-spinner-circle-line {
        display: inline-block;
        font-size: 0;
        line-height: 0;
        overflow: hidden;

        &__wrap {
            stroke: #222222;
            stroke-width: 4;
            @for $i from 0 through 11 {
                > line:nth-child(#{$i + 1}) {
                    animation: #{$prefixCls}-animate--fade
                        0.96s
                        #{$i *
                        0.08}s
                        infinite
                        ease-in-out;
                }
            }
        }
    }
</style>

<template>
    <span :class="`${prefixCls}-spinner-circle-line`">
        <svg :class="`${prefixCls}-spinner-circle-line__svg`" viewBox="0 0 64 64" :style="styles">
            <g stroke-linecap="round" :class="`${prefixCls}-spinner-circle-line__wrap`" :style="svgStyles">
                <line y1="17" y2="29" transform="translate(32,32) rotate(180)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(210)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(240)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(270)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(300)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(330)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(0)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(30)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(60)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(90)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(120)"></line>
                <line y1="17" y2="29" transform="translate(32,32) rotate(150)"></line>
            </g>
        </svg>
    </span>
</template>


<script>
    import { BNumber, initName, baseMixins } from '../../util'
    export default {
        name: initName('spinner-circle-line'),
        mixins: [baseMixins],
        inheritAttrs: false,
        props: {
            color: {
                type: String
            },
            width: {
                type: [Number, String],
                default: 64
            },
            height: {
                type: [Number, String],
                default: 64
            },
            strokeWidth: [Number, String]
        },
        computed: {
            styles() {
                let width = BNumber.cmpUnit(this.width)
                let height = BNumber.cmpUnit(this.height)


                return {
                    width,
                    height
                }
            },
            svgStyles() {
                let strokeWidth = this.strokeWidth
                let stroke = this.color

                console.log(stroke)

                return {
                    strokeWidth,
                    stroke
                }
            }
        }
    }
</script>


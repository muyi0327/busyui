<style lang="scss" scoped>
    @import "../../../src/style/variable";

    .#{$prefixCls}-spinner-circle-half {
        display: inline-block;

        &__wrap {
            animation: #{$prefixCls}-animate--rotate 0.7s linear infinite;
            stroke-width: 6;
            stroke: #222222;
            transform-origin: center;
        }

        &__path {
            stroke-dasharray: 65 175;
            stroke-dashoffset: 0;
        }
    }
</style>


<template>
    <span class="busy-spinner-circle-half">
        <svg viewBox="0 0 64 64" class="busy-spinner-circle-half__svg" :style="styles">
            <g class="busy-spinner-circle-half__wrap" :style="svgStyles">
                <circle cx="32" cy="32" r="28" fill="none" class="busy-spinner-circle-half__path"></circle>
            </g>
        </svg>
    </span>
</template>


<script>
    import { BNumber } from '../../util'

    export default {
        name: 'busy-spinner-circle-half',
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
            strokeWidth: {
                type: [Number, String],
                default: 6
            }
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
                let stroke = this.color
                let strokeWidth = this.strokeWidth

                return {
                    stroke,
                    strokeWidth
                }
            }
        }
    }
</script>



<style lang="scss" scoped>
    @import "../../../src/style/variable";

    @keyframes #{$prefixClass}-loading-dash {
        0% {
            stroke-dasharray: 1 175;
            stroke-dashoffset: 0;
        }

        50% {
            stroke-dasharray: 130 160;
            stroke-dashoffset: -40;
        }

        100% {
            stroke-dasharray: 170 300;
            stroke-dashoffset: -175;
        }
    }

    .#{$prefixClass}-spinner-circle-dash {
        display: inline-block;
        font-size: 0;
        line-height: 0;

        $dash: #{$prefixClass}-loading-dash;
        $rotate: #{$prefixClass}-animate--rotate-1turn;

        &__wrap {
            stroke-width: 6;
            transform-origin: center;
            animation: $rotate 2.75s linear infinite;
            stroke: #222222;
        }

        &__path {
            animation: $dash 1.5s ease-in-out infinite;
            stroke-dashoffset: 0;
        }
    }
</style>

<template>
    <span class="busy-spinner-circle-dash">
        <svg viewBox="0 0 64 64" class="busy-spinner-circle-dash__svg" :style="styles">
            <g class="busy-spinner-circle-dash__wrap" :style="svgStyles">
                <circle cx="32" cy="32" r="28" fill="none" class="busy-spinner-circle-dash__path"></circle>
            </g>
        </svg>
    </span>
</template>


<script>
    import { BNumber } from '../../util'

    export default {
        name: 'busy-spinner-circle-dash',
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

<style lang="scss" scoped>
    @import "../../../src/style/variable";
    @import "../../../src/style/animate";

    .#{$prefixCls}-spinner-circle-gradient {
        $rotate: #{$prefixCls}-animate--rotate-1turn;
        display: inline-block;
        font-size: 0;
        line-height: 0;
        overflow: hidden;

        &__wrap {
            stroke-linecap: round;
            stroke-width: 6;
            animation: $rotate 0.8s linear infinite;
            transform-origin: center center;
        }
    }
</style>

<template>
    <span :class="`${prefixCls}-spinner-circle-gradient`">
        <svg viewBox="0 0 64 64" :class="`${prefixCls}-spinner-circle-gradient__svg`" :style="styles">
            <g :style="svgStyles" :class="`${prefixCls}-spinner-circle-gradient__wrap`">
                <defs>
                    <linearGradient :id="gid" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="10%" :stop-color="color" stop-opacity="0" />
                        <stop offset="100%" :stop-color="color" />
                    </linearGradient>
                </defs>
                <circle stroke-linecap="round" cx="32" cy="32" stroke-dasharray="83 175" r="28" :stroke="color" fill="none" style="transform-origin:center;transform:rotate(110deg)" />
                <circle cx="32" cy="32" stroke-dasharray="60" r="28" :stroke="`url(#${gid})`" fill="none" />
            </g>
        </svg>
    </span>
</template>

<script>
    import { BNumber, initName, baseMixins } from '../../util'
    export default {
        name: initName('spinner-circle-gradient'),
        mixins: [baseMixins],
        inheritAttrs: false,
        props: {
            color: {
                type: String,
                default: '#008b8b'
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
        data() {
            return {
                flag: 1
            }
        },
        watch: {

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
                    strokeWidth
                }
            },
            r() {
                return 32 - this.strokeWidth
            },
            gid() {
                return `gradient__${btoa(this.color || '#222222')}`
            }
        }
    }
</script>


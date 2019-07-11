
<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-icon {
        display: inline-block;
    }
</style>

<template>
    <svg :class="`${prefixCls}-icon`" :style="styles" @click="handleClick">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    import './iconfont.js'
    import { BNumber, initName, baseMixins } from '../../util'

    /**
     * @class
     * @constructor
     * @module Icon
     * @see {@link ../example/all/icons.html 实例}
     * @desc Icon 图标组件
     * @param {String} type - icon名称
     * @param {Number} width=18 - 组件宽度
     * @param {Number} height=18 - 组件高度
     * @param {String} fill='#fff' - 组件颜色,css color
     */
    export default {
        name: initName('icon'),
        mixins: [baseMixins],
        props: {
            name: {
                type: String,
                default: ''
            },
            width: {
                type: [Number, String],
                default: 18
            },
            height: {
                type: [Number, String],
                default: 18
            },
            color: {
                type: String,
                default: '#fff'
            }
        },
        computed: {
            styles() {
                return {
                    width: BNumber.cmpUnit(this.width),
                    height: BNumber.cmpUnit(this.height),
                    fill: this.color
                }
            },
            iconName() {
                return `#${this.prefix}-${this.name}`
            }
        },
        methods: {
            handleClick($evt) {
                this.$emit('click', $evt)
            }
        }
    }
</script>

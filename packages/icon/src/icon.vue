
<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-icon {
        display: inline-block;
    }
</style>

<template>
    <svg class="bee-icon" :style="styles" @click="handleClick">
        <use :xlink:href="itype"></use>
    </svg>
</template>

<script>
    import './iconfont.js';

    /**
     * bee-icon
     * @module Icon
     * @see {@link ../example/all/icons.html 实例}
     * @desc icon图标组件
     * @param {String} type - icon名称
     * @param {Number} width=18 - 组件宽度
     * @param {Number} height=18 - 组件高度
     * @param {String} fill='#fff' - 组件颜色,css color
     * 
     * @example
     *  <bee-icon type="guanbi" fill="#8a8a8a"></bee-icon>
     * 
     */
    export default {
        name: 'bee-icon',
        props: {
            type: {
                type: String,
                default: ''
            },
            width: {
                type: Number,
                default: 18
            },
            height: {
                type: Number,
                default: 18
            },
            fill: {
                type: String,
                default: '#fff'
            }
        },
        computed: {
            styles() {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    fill: this.fill
                }
            },
            itype() {
                return '#icon-' + this.type;
            }
        },
        methods: {
            handleClick($evt) {
                this.$emit('click', $evt)
            }
        }
    }
</script>

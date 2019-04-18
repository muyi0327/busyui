<style lang="scss">
    @import "../../../src/style/flexbox.scss";
</style>

<template>
    <div :style="styles" :class="classes" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    import FlexItem from './flex-item.vue'

    /**
     * @class
     * @constructor
     * @module Flexbox
     * @desc Flexbox
     * @param {Boolean} inline = false - display属性, flex 或者 inline-flex
     * @param {Number|String} width - 宽度, 取值范围css单位尺寸,数字＋单位,单位限制px、em、rem, 还可以是%,inherit,auto.整数单位默认px
     * @param {String} alignMain - 主轴(main axis)对齐方式, 取值start,end,around,between,center
     * @param {String} alignCross - 侧轴(cross axis)对齐方式, 取值start,end,cneter,baseline,stretch,between,around
     * @param {String} wrap - 换行, 取值nowrap,wrap, wrap-reverse
     * @param {String} direction - 主轴方向, 取值row,row-reverse,column,column-reverse
     */
    export default {
        name: 'busy-flexbox',
        props: {
            inline: {
                type: Boolean,
                default: false
            },
            width: {
                type: [Number, String]
            },
            height: {
                type: [Number, String]
            },
            wrap: {
                type: String
            },
            direction: {
                type: String,
                validator(val) {
                    return val && 'row column'.split(/\s/).indexOf(String(val)) > -1
                }
            },
            alignMain: {
                type: String
            },
            alignCross: {
                type: String
            }
        },
        components: {
            [FlexItem.name]: FlexItem
        },
        data() {
            return {

            }
        },
        computed: {
            classes() {
                let am = this.alignMain, ac = this.alignCross, flag = am || ac;
                return [
                    this.inline ? `busy-flex--inline` : `busy-flex`,
                    flag ? `busy-flex--${am || 'start'}-${ac || 'start'}` : null,
                    !this.direction ? '' : `busy-flex--${this.direction}`
                ]
            },
            styles() {
                let h = this.height, w = this.width

                h = /^\d+$/.test(h) ? h + 'px' : h
                w = /^\d+$/.test(w) ? w + 'px' : w

                return {
                    height: h,
                    width: w,
                    flexWrap: this.wrap,
                }
            }
        },
        methods: {
            handleClick(e) {
                /**
                 * Flexbox event.
                 *
                 * @event Flexbox#click
                 * @type {Event}
                 */
                this.$emit('click', e)
            }
        }
    }
</script>

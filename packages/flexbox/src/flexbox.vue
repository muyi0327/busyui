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
            alignH: {
                type: String
            },
            alignV: {
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
                let ah = this.alignH, av = this.alignV, flag = ah || av;
                return [
                    this.inline ? `busy-flex--inline` : `busy-flex`,
                    flag ? `busy-flex--${ah || 'start'}-${av || 'start'}` : null,
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
                this.$emit('click', e)
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../src/style/flexbox.scss";
</style>

<template>
    <div :style="styles" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    import FlexItem from './flex-item.vue'

    export default {
        name: 'w-flexbox',
        props: {
            width: {
                type: [Number, String]
            },
            height: {
                type: [Number, String]
            },
            direction: {
                type: String,
                default: 'row'
            },
            alignH: {
                type: String,
                default: 'start'
            },
            alignV: {
                type: String,
                default: 'start'
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
                return [
                    `wui-flex-align-${this.alignH}-${this.alignV}`,
                    this.direction == 'column' ? `wui-${this.direction}-flexbox` : 'wui-flexbox'
                ]
            },
            styles() {
                let o = {}, h = this.height, w = this.width

                if (h || h === 0) {
                    o.height = /^\d+$/.test(h) ? h + 'px' : h
                }

                if (w || w === 0) {
                    o.width = /^\d+$/.test(w) ? w + 'px' : w
                }

                return o
            }
        }
    }
</script>

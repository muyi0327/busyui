<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-list {
        display: block;
        background: #fff;
        box-sizing: border-box;
        padding-left: 12px;
        width: 100%;
    }
</style>

<template>
    <div :class="[`${prefixCls}-list`, `${prefixCls}-border-1px`, `${prefixCls}-border-tb`]">
        <slot></slot>
    </div>
</template>

<script>
    import ListItem from './list-item.vue'
    import { initName, baseMixins } from '../../util'

    export default {
        name: initName('list'),
        mixins: [baseMixins],
        props: {
            items: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            ListItem
        }
    }
</script>

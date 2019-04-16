<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-list {
        display: block;
        background: #fff;
        box-sizing: border-box;
        padding-left: 12px;
        width: 100%;
    }
</style>

<template>
    <div class="busy-list busy-border-1px busy-border-tb">
        <slot></slot>
    </div>
</template>

<script>
    import ListItem from './list-item.vue';

    export default {
        name: 'busy-list',
        props: {
            items: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            [ListItem.name]: ListItem
        }
    }
</script>

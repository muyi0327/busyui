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
    <div class="bee-list bee-border-1px bee-border-tb">
        <slot></slot>
    </div>
</template>

<script>
    import ListItem from './list-item.vue';

    export default {
        name: 'bee-list',
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

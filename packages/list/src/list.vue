<style lang="scss">
    .wui-list{
        display: block;
        background:#fff;
        box-sizing:border-box;
        padding-left:12px;
        width:100%;
    }
</style>

<template>
    <div class="wui-list wui-border-1px wui-border-tb">
        <slot></slot>
    </div>
</template>

<script>
    import ListItem from './list-item.vue';

    export default {
        name: 'w-list',
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

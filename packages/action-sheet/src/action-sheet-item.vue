<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-action-sheet__item {
        height: 48px;
        line-height: 48px;
        background-color: #fff;
        text-align: center;
        position: relative;
        font-size: 18px;
        color: #222;
        font-size: 14px;

        &:active {
            background: #f2f2f2;
        }

        &:after {
            border-color: #dae3e7;
        }
    }
</style>


<template>
    <div class="bee-action-sheet__item bee-border-1px bee-border-b" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bee-action-sheet-item',
        props: {
            action: Function
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e)
            }
        }
    }
</script>

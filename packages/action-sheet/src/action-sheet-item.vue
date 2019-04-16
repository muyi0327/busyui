<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-action-sheet__item {
        height: 48px;
        line-height: 48px;
        background-color: rgba(255, 255, 255, 0.9);
        text-align: center;
        position: relative;
        font-size: 18px;
        color: #000;
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
    <div class="busy-action-sheet__item busy-border-1px busy-border-b" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'busy-action-sheet-item',
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

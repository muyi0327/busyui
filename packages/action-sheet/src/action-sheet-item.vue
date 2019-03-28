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
    <div class="cui-action-sheet__item cui-border-1px cui-border-b" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'w-action-sheet-item',
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

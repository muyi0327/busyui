<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-action-sheet__item {
        height: 48px;
        line-height: 48px;
        background-color: rgba(255, 255, 255, 0.9);
        text-align: center;
        position: relative;
        font-size: 18px;
        color: #000;
        font-size: 18px;

        &:active {
            background: #f2f2f2;
        }

        &:after {
            border-color: #dae3e7;
        }
    }
</style>


<template>
    <div :class="[
        `${prefixCls}-action-sheet__item`,
        `${prefixCls}-border-1px`, 
        `${prefixCls}-border-b`]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    import { initName, baseMixins } from '../../util'
    export default {
        name: initName('action-sheet-item'),
        mixins: [baseMixins],
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

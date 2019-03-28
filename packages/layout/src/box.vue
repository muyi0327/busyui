<style lang="scss">
    @import '../../../src/style/flex.scss';
    .wui-flex-box {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
    }
</style>

<template>
    <div class="wui-flex-box">
        <slot></slot>
    </div>
</template>

<script>
    export default {}
</script>

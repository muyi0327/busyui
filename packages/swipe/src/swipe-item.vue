<style lang="scss">
    .wui-swipe-item{
        width: 100%;
        height: 100%;
        display: inline-block;
        font-size: 1rem;
    }
</style>

<template>
    <div class="wui-swipe-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'w-swipe'
    }
</script>

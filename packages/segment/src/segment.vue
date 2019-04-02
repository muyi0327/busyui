<style lang="scss" scoped>
    @import "../../../src/style/variable";
    .#{prefixClass}-segment {
        display: flex;
        &__item {
        }
    }
</style>

<template>
    <div class="bee-segment">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bee-segment',
        props: {
            color: {
                type: String
            }
        }
    }
</script>



<style lang="scss" scoped>
    .wui-segment {
        display: flex;
    }
</style>

<template>
    <div class="wui-segment">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'w-segment',
        props: {
            color: {
                type: String
            }
        }
    }
</script>



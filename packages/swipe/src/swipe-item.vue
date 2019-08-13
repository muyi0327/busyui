<template>
    <div :class="`${prefixCls}-swipe__item`">
        <slot></slot>
    </div>
</template>

<script>
    import { initName, baseMixins } from '../../util'
    export default {
        name: initName('swipe-item'),
        mixins: [baseMixins]
    }
</script>

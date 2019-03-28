<style lang="scss">
    .wui-select-options-item {
        height: 40px;
        line-height: 40px;
    }
</style>

<template>
    <li class="wui-select-options-item" @click.stop="handleClick">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        name: 'w-option',
        props: {
            value: [Array, String, Object, Number],
            checked: {
                type: Boolean,
                default: false
            },
            Disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentValue: this.value
            }
        },
        methods: {
            handleClick($e) {
                this.$parent.$parent.$emit('change', this.value)
            }
        }
    }
</script>


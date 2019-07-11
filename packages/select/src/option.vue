

<template>
    <li class="busy-select__item" @click.stop="handleClick">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        name: 'busy-select-option',
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


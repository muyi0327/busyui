

<template>
    <li :class="`${prefix}-select__item`" @click.stop="handleClick">
        <slot></slot>
    </li>
</template>

<script>
    import { initName, baseMixins } from '../../util'
    export default {
        name: initName('select-option'),
        mixins: [baseMixins],
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


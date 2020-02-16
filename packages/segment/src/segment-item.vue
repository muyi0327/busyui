
<template>
    <div :class="classes" @click="handleChange" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
    import { initName, baseMixins } from '../../util'
    export default {
        name: initName('segment-item'),
        mixins: [baseMixins],
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: {
            value: null,
            modelValue: null,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            }
        },
        computed: {
            isChecked() {
                return this.modelValue === this.value || JSON.stringify(this.modelValue) === JSON.stringify(this.value)
            },
            classes() {
                return [
                    `${this.prefixCls}-segment__item`,
                    {
                        [`${this.prefixCls}-segment__item--checked`]: this.isChecked,
                        [`${this.prefixCls}-segment__item--disabled`]: this.disabled
                    }
                ]
            },
            color() {
                return this.$options.parent.$options.propsData.color
            },
            styles() {
                return this.color ? {
                    borderColor: this.color,
                    background: this.isChecked ? this.color : null
                } : null
            }
        },
        methods: {
            handleChange() {
                if (!this.disabled) {
                    this.$emit('change', this.value)
                }
            }
        }
    }
</script>


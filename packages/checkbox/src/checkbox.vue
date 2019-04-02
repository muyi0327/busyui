<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-checkbox {
        font-size: 14px;
        line-height: 20px;
        display: inline-block;

        &__input {
            display: none;
        }

        &__label {
            display: inline-block;
            vertical-align: top;

            > span {
                display: inline-block;
                vertical-align: middle;
            }
        }

        &__core {
            box-sizing: border-box;
            background-color: #fff;
            position: relative;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            border: 1px solid #c0c0c0;

            &:before {
                border: 2px solid transparent;
                border-right: 0;
                border-top: 0;
                content: " ";
                position: absolute;
                left: 20%;
                top: 25%;
                z-index: 2;
                width: 60%;
                height: 30%;
                -webkit-transform: rotate(-45deg) scale(0.25);
                transform: rotate(-45deg) scale(0.25);
                transform-origin: 50% 50%;
                transition: transform 0.2s;
                box-sizing: border-box;
            }
        }

        &__input:checked + &__core {
            background-color: #c0c0c0;
        }

        &__input:checked + &__core:before {
            border-color: #fff;
            -webkit-transform: rotate(-45deg) scale(1);
            transform: rotate(-45deg) scale(1);
        }

        &__input[disabled] + &__core {
            opacity: 0.6;
        }

        &__content {
            padding-left: 5px;
        }
    }
</style>
<template>
    <div class="bee-checkbox">
        <label class="bee-checkbox__label">
            <input v-model="currentValue" class="bee-checkbox__input" type="checkbox" :disabled="disabled">
            <span class="bee-checkbox__core" :style="styles"></span>
            <span class="bee-checkbox__content" v-if="label||$slots.default">
                <slot>{{label}}</slot>
            </span>
        </label>
    </div>
</template>
<script>
    /**
     * bee-checkbox
     * @desc 勾选框  <bee-checkbox />
     * @module Checkbox
     * @see {@link ../example/all/checkbox.html 实例}
     * @param {string} label 显示在右侧的内容
     * @param {boolean} disabled 是否禁用
     *
     * @example
     * <bee-checkbox v-model="checked" label="这个位置是标签1"></bee-checkbox>
     * <bee-checkbox v-model="disable" label="是否禁用下面的按钮"></bee-checkbox>
     */

    export default {
        name: 'bee-checkbox',
        props: {
            label: String,
            value: Boolean,
            disabled: Boolean,
            size: [Number, String],
            color: String
        },
        data() {
            return {
                currentValue: this.value
            }
        },
        watch: {
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                this.$emit('input', val);
            }
        },
        computed: {
            styles() {
                return {
                    width: this.size ? this.size + 'px' : '',
                    height: this.size ? this.size + 'px' : '',
                    borderColor: this.color || '',
                    backgroundColor: this.currentValue && this.color || ''
                }

            }
        }
    }
</script>


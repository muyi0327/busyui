<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-checkbox {
        display: inline-block;
        vertical-align: middle;
        height: 16px;

        &__input {
            display: none;
        }

        &__label {
            display: flex;
            height: 100%;
            align-items: center;
        }

        &__core {
            box-sizing: border-box;
            background-color: #fff;
            position: relative;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            border: 1px solid #c0c0c0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__icon {
            opacity: 1;
        }

        &__input:checked + &__core {
            background-color: $color-blue;
            border: none;
        }

        &__input[disabled] + &__core {
            background: #e7e7e7;
            border: 1px solid #c6c6c6;
            cursor: not-allowed;
        }

        &__text {
            padding-left: 10px;
        }
    }
</style>
<template>
    <div @click.stop="()=>{}" :class="`${prefixCls}-checkbox`" :style="styles">
        <label :class="[`${prefixCls}-checkbox__label`]">
            <input ref="native-checkbox" v-model="currentValue" :class="`${prefixCls}-checkbox__input`" type="checkbox" :value="value" :disabled="disabled">
            <span :class="`${prefixCls}-checkbox__core`" :style="coreStyles">
                <transition :name="`${prefixCls}-animate--scalein`">
                    <Icon v-show="isChecked" v-bind="iconModel" :class="`${prefixCls}-checkbox__icon`" />
                </transition>
            </span>
            <span :class="`${prefixCls}-checkbox__text`" v-if="label || $slots.default">
                <slot>{{label}}</slot>
            </span>
        </label>
    </div>
</template>
<script>
    import { initName, baseMixins, BNumber } from '../../util'
    import Icon from '../../icon'

    const iconProps = {
        color: '#ffffff',
        width: '70%',
        height: '70%',
        name: 'yes'
    }
    /**
     * @class
     * @constructor
     * @desc Checkbox 复选框
     * @module Checkbox
     * @see {@link ../example/all/checkbox.html 实例}
     * @param {String} label 显示在右侧的内容
     * @param {Boolean} disabled 是否禁用
     * @param {Number | String} size 尺寸
     * @param {String} color 颜色
     */

    export default {
        name: initName('checkbox'),
        mixins: [baseMixins],
        model: {
            prop: 'modelVal',
            event: 'change'
        },
        props: {
            label: String,
            value: [Boolean, String, Array, Number, Object],
            disabled: Boolean,
            modelVal: [Boolean, String, Array],
            width: [Number, String],
            height: [Number, String],
            color: String,
            icon: {
                type: Object,
                default() {
                    return iconProps
                }
            },
            borderRadius: {
                type: [Number, String]
            }
        },
        data() {
            return {
                currentValue: this.modelVal
            }
        },
        components: {
            Icon
        },
        watch: {
            modelVal(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                this.$emit('change', val);
            }
        },
        computed: {
            coreStyles() {
                let color = this.disabled ? '#dadada' : this.color
                return {
                    width: BNumber.cmpUnit(this.width),
                    height: BNumber.cmpUnit(this.height),
                    background: this.isChecked && color || null,
                    borderRadius: BNumber.cmpUnit(this.borderRadius)
                }
            },
            styles() {
                return {
                    height: BNumber.cmpUnit(this.height)
                }
            },
            iconModel() {
                return { ...iconProps, ...this.icon }
            },
            isChecked() {
                return Array.isArray(this.currentValue)
                    ? this.currentValue.some(c => c === this.value || JSON.stringify(c) === JSON.stringify(this.value))
                    : !!this.currentValue
            }
        }
    }
</script>


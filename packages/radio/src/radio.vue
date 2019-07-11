<style lang="scss" scoped>
    @import "../../../src/style/variable";
    .#{$prefixCls}-radio {
        display: inline-block;
        vertical-align: middle;

        &__label {
            display: flex;
            height: 16px;
            align-items: center;
        }

        &__input {
            display: none;
        }

        &__radio {
            width: 16px;
            height: 16px;
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            line-height: 0;
            box-sizing: border-box;
            border: 1px solid #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__input:checked + &__radio {
            background: #00a1f4;
            border: none;
        }

        &__input[disabled] + &__radio {
            border: 1px solid #c6c6c6;
            background: #e7e7e7;
            cursor: not-allowed;
        }

        &__text {
            padding-left: 6px;
            font-size: inherit;
            line-height: 1;
        }
    }
</style>

<template>
    <div :class="`${prefixCls}-radio`" :style="styles">
        <label :class="`${prefixCls}-radio__label`">
            <input ref="nativeRadio" :class="`${prefixCls}-radio__input`" v-model="currentValue" :value="value" :name="name" :checked="checked" @change="handleChange" :disabled="disabled" type="radio" />
            <span :class="`${prefixCls}-radio__radio`" :style="radioStyles">
                <transition :name="`${prefixCls}-animate--scalein`">
                    <Icon v-show="isChecked" width="70%" height="70%" :color="iconColor" name="yes" />
                </transition>
            </span>
            <span :class="`${prefixCls}-radio__text`">
                <slot>{{text}}</slot>
            </span>
        </label>
    </div>
</template>

<script>
    import { initName, baseMixins, BNumber } from '../../util'
    import Icon from '../../icon'
    export default {
        name: initName('radio'),
        mixins: [baseMixins],
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: {
            name: {
                type: String
            },
            value: '',
            modelValue: null,
            text: String,
            disabled: {
                type: Boolean,
                default: false
            },
            color: String,
            disabledColor: String,
            iconColor: {
                type: String,
                default: '#ffffff'
            },
            checked: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                currentValue: this.modelValue
            }
        },

        components: {
            Icon
        },
        computed: {
            styles() {
                return {
                    height: BNumber.cmpUnit(this.height)
                }
            },
            radioStyles() {
                let color = null;

                if (this.disabled) {
                    color = this.disabledColor || null
                } else if (this.isChecked) {
                    color = this.color || null
                }

                return {
                    background: color
                }
            },
            isChecked() {
                return this.currentValue === this.value || JSON.stringify(this.currentValue) === JSON.stringify(this.value)
            }
        },
        watch: {
            modelValue(val) {
                this.currentValue = val
            },
            currentValue(val) {
                this.$emit('change', val)
            }
        },
        methods: {
            handleChange(e) {
                console.log(e.target.value)
            }
        }
    }
</script>



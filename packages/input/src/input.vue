<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-input {
        display: flex;
        width: 100%;

        &__content {
            flex: 1;
        }

        &__clear {
            flex: none;
            width: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__input {
            width: 100%;
            -webkit-appearance: none;
            appearance: none;
            outline: 0;
            border: 0;
            color: inherit;
            font-size: inherit;
            &::-webkit-input-placeholder {
                color: #b2b2b2;
            }
        }
    }
</style>

<template>
    <div :class="`${prefixCls}-input`" v-clickoutside="unActive">
        <div :class="`${prefixCls}-input__content`">
            <input v-bind="datas" :class="`${prefixCls}-input__input`" :style="styles" v-model="currentValue" @keyup.enter="handleEnter" @focus="handleFocus" @blur="handleBlur" @input="handleInput" @change="handleChange" />
        </div>
        <div :class="`${prefixCls}-input__clear`" v-show="active && currentValue" @click="handleClear">
            <Icon name="close-circle-fill" color="#d8d8d8" :width="16" :height="16" />
        </div>
    </div>

</template>

<script>
    import Clickoutside from '../../../src/directives/clickoutside.js'
    import Icon from '../../icon'
    import { BNumber, initName, baseMixins } from '../../util'

    export default {
        name: initName('input'),
        mixins: [baseMixins],
        props: {
            placeholder: String,
            disabled: Boolean,
            readonly: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            name: String,
            maxlength: {
                type: [Number, String],
                default: 50
            },
            pattern: String,
            format: [String, Array],
            value: [String, Number],
            deFormat: Function,
            enFormat: Function,
            styles: Object,
            autofocus: Boolean
        },
        data() {
            return {
                active: false,
                currentValue: this.value,
                selectionStart: 0,
                deFormatFunction: this.deFormat,
                enFormatFunction: this.enFormat
            }
        },
        directives: {
            Clickoutside
        },
        components: {
            Icon
        },
        computed: {
            datas() {
                let { placeholder, readonly, autofocus, disabled, type, name, maxlength, pattern, value } = this;
                return {
                    placeholder,
                    readonly,
                    autofocus,
                    disabled,
                    type,
                    name,
                    maxlength,
                    pattern,
                    value
                }
            },
            listeners() {
                return this.$listeners
            }
        },
        watch: {
            value(val) {
                this.currentValue = this.hanleFormat(val);
            },
            currentValue(val) {
                if (val === '') {
                    return this.$emit('input', val);
                }

                if (this.deFormatFunction) {
                    val = this.deFormatFunction(val);

                    if (val == this.value) {
                        this.currentValue = this.hanleFormat(val);
                    }
                }

                this.$emit('input', val);
            },
            autofocus(val) {
                if (val) {
                    //this.$nextTick(()=>{
                    this.$el.querySelector('input').focus();
                    //})
                }
            }
        },
        methods: {
            unActive() {
                this.active = false;
            },
            handleEnter() {
                this.$emit('enter', this.currentValue);
            },
            handleFocus() {
                if (this.disabled || this.readonly) return;
                this.active = true;
                this.$emit('focus', this.currentValue);
            },
            handleBlur() {
                this.$emit('blur', this.currentValue);
            },
            handleInput($evt) {
                //this.$emit('input', $evt);
            },
            handleChange() { },
            hanleFormat(val) {
                if (typeof this.enFormatFunction === 'function') {
                    return this.enFormatFunction(val);
                }

                return val;
            },
            handleClear() {
                if (this.disabled || this.readonly) return;
                this.currentValue = '';
            }
        },
        mounted() {
            if (this.value) {
                this.currentValue = this.hanleFormat(this.value)
            }

            if (this.format) {
                switch (this.format) {
                    case 'numberic':
                        this.enFormatFunction = BNumber.enFormatNumberic;
                        this.deFormatFunction = BNumber.deFormatNumberic;
                        break;
                    case 'bankcard':
                        this.deFormatFunction = BNumber.deFormatBankCard;
                        this.enFormatFunction = BNumber.enFormatBankCard;
                        this.dms = ' ';
                        break;
                    default:
                        if (Array.isArray(this.format)) {
                            let dms = this.format[1] || ' ';
                            let blocks = this.format[0];
                            this.enFormatFunction = function (n) {
                                return BNumber.formatBlocks(n, blocks, dms)
                            }.bind(this);

                            this.deFormatFunction = function (n) {
                                return String(n).replace(new RegExp('\\' + dms, 'g'), '');
                            }.bind(this);
                        }

                        break;
                }
            }

            if (this.autofocus) {
                //this.$nextTick(()=>{
                this.$el.querySelector('input').focus();
                //})
            }
        }
    }
</script>

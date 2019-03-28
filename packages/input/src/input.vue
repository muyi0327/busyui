<style lang="scss">
    .wui-input-wrap{
        display: flex;
        width:100%;

        .wui-input-content{
            flex:1;
        }

        .wui-input-clear{
            flex:0 0 24px;
            display: flex;
            align-items:center;
            justify-content: center;
        }
        input.wui-input {
            width: 100%;
            height: 24px;
            -webkit-appearance: none;
            appearance: none;
            outline: 0;
            border: 0;
            font-size:inherit;
            &::-webkit-input-placeholder {
                color: #b2b2b2;
            }
        }
    }
    
</style>

<template>
    <div class="wui-input-wrap" v-clickoutside="unActive">
        <div class="wui-input-content">
            <input 
                :placeholder="placeholder" 
                :disabled="disabled" 
                :readonly="readonly" 
                :type="type" 
                :name="name" 
                :maxlength="maxlength"
                class="wui-input" 
                :style="styles"
                :pattern="pattern" 
                v-model="currentValue" 
                @keyup.enter="handleEnter" 
                @focus="handleFocus" 
                @blur="handleBlur"
                @input="handleInput" 
                @change="handleChange" />
        </div>
        <div class="wui-input-clear" v-show="active && currentValue" @click="handleClear">
            <w-icon type="roundclosefill" fill="#d8d8d8" :width="16" :height="16"></w-icon>
        </div>
    </div>
    
</template>

<script>
    import Clickoutside from '../../../src/directives/clickoutside.js';
    import {
        Cell,
        Row,
        Col
    } from '../../layout';
    import Icon from '../../icon';
    import {
        WNumber
    } from '../../util';


    export default {
        name: 'w-input',
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
                type: [Number,String],
                default: 50
            },
            pattern: String,
            format: [String,Array],
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
        watch:{
            value(val) {
                this.currentValue = this.hanleFormat(val);
            },
            currentValue(val) {
                if (val === ''){
                    return this.$emit('input', val);
                }

                if (this.deFormatFunction) {
                    val = this.deFormatFunction(val);

                    if(val == this.value){
                        this.currentValue = this.hanleFormat(val);
                    }
                }
                
                this.$emit('input', val);
            },
            autofocus(val){
                if (val){
                    //this.$nextTick(()=>{
                        this.$el.querySelector('.wui-input').focus();
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
            handleChange() {},
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
        mounted(){
            if (this.value){
                this.currentValue = this.hanleFormat(this.value)
            }

            if (this.format){
                switch(this.format){
                    case 'numberic':
                        this.enFormatFunction = WNumber.enFormatNumberic;
                        this.deFormatFunction = WNumber.deFormatNumberic;
                        break;
                    case 'bankcard':
                        this.deFormatFunction = WNumber.deFormatBankCard;
                        this.enFormatFunction = WNumber.enFormatBankCard;
                        this.dms = ' ';
                        break;
                    default:
                        if(Array.isArray(this.format)){
                            let dms = this.format[1] || ' ';
                            let blocks = this.format[0];
                            this.enFormatFunction = function(n){
                                return WNumber.formatBlocks(n, blocks, dms)
                            }.bind(this);

                            this.deFormatFunction = function(n){
                                return String(n).replace(new RegExp('\\' + dms, 'g'), '');
                            }.bind(this);
                        }
                        
                        break;
                }
            }

            if (this.autofocus){
                //this.$nextTick(()=>{
                    this.$el.querySelector('.wui-input').focus();
                //})
            }
        }
    }
</script>

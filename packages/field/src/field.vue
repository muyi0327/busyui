<style lang="scss">
    .wui-field {
        display: block;
        background: #fff;
        &:after {
            border-color: #d2d2d2;
        }
        .wui-field-label {
            padding-right: 5px;
        }
        .wui-filed-value {
            padding-left: 5px;
        }
        .wui-field-content {
            .wui-field-input {
                padding: 0;
                width: 100%;
                border: 0;
                line-height: 24px;
                color: #222;
                -webkit-appearance: none;
                appearance: none;
                outline: 0;
                &::-webkit-input-placeholder {
                    color: #b2b2b2;
                }
            }
            .wui-field-textarea {
                padding: 0;
                width: 100%;
                border: 0;
                resize: none;
                -webkit-appearance: none;
                appearance: none;
                outline: 0;
                &::-webkit-input-placeholder {
                    color: #b2b2b2;
                }
            }
        }
        .wui-field-error {
            color: #f54747;
            font-size: 12px;
            line-height: 14px;
            padding-left:5px;
        }
        &.type-is-input {
            min-height: 50px;
        }
        &.type-is-input.is-has-error {
            
        }
        &.type-is-textarea {
            min-height: 80px;
        }
        .wui-field-wrap {
            min-height: inherit;
        }
    }
</style>
<template>
    <div class="wui-field wui-border-1px wui-border-b" :class="{
            'type-is-input': type!=='textarea', 
            'type-is-textarea': type=='textarea',
            'is-has-error': !!error
        }" v-clickoutside="unActive" :style="rootStyles">
        <w-row class="wui-field-wrap" :style="styles">
            <w-cell v-if="showLabel" :width="labelWidth" :align="labelAlign" :vertical="labelVertical" @click="handleLabelClick" class="wui-field-label-wrap">
                <slot name="label"><label :for="name" class="wui-field-label">{{label}}</label></slot>
            </w-cell>
            <w-cell class="wui-field-content" :vertical="'middle'">
                <slot name="content">
                    <w-row class="wui-field-box">
                        <w-cell class="wui-filed-value">
                            <textarea v-if="type==='textarea'" 
                                :placeholder="placeholder" 
                                :disabled="disabled" 
                                :readonly="readonly" 
                                :rows="rows" 
                                :name="name"
                                :maxlength="maxlength" 
                                class="wui-field-textarea" 
                                v-model="currentValue" 
                                @keyup.enter="handleEnter"
                                @focus="handleFocus" 
                                @blur="handleBlur" 
                                @input="handleInput" 
                                @change="handleChange"></textarea>
                            <input v-else 
                                :placeholder="placeholder" 
                                :disabled="disabled" 
                                :readonly="readonly" 
                                :type="type" 
                                :name="name" 
                                :maxlength="maxlength"
                                class="wui-field-input" 
                                :pattern="pattern" 
                                v-model="currentValue" 
                                @keyup.enter="handleEnter"
                                @focus="handleFocus" 
                                @blur="handleBlur" 
                                @input="handleInput" 
                                @change="handleChange" />
                        </w-cell>
                        <w-cell v-show="active && currentValue" class="wui-field-clear" align="center" :width="28" @click="handleClear">
                            <w-icon type="roundclosefill" fill="#d8d8d8" :width="16" :height="16"></w-icon>
                        </w-cell>
                    </w-row>
                </slot>
            </w-cell>
            <w-cell v-if="showIcon" :width="iconWidth" :vertical="iconVertical" :align="iconAlign" @click="handleIconClick">
                <slot name="icon">
                    <w-icon v-show="icon.type" :type="icon.type" :fill="icon.fill" :width="icon.width" :height="icon.height" :style="iconStyle"></w-icon>
                </slot>
            </w-cell>
        </w-row>
        <w-row :height="22" v-if="error" :style="errorStyle">
            <w-cell :width="labelWidth"></w-cell>
            <w-cell align="left" vertical="top" class="wui-field-error">{{error}}</w-cell>
        </w-row>
    </div>
</template>
<script>
    /**
     * wui-field
     * @desc 编辑器
     * @module Field
     * @see {@link ../example/all/field.html 实例}
     *
     * @param {String} type='text' - field 类型，接受 text, textarea 等 特殊:custom 在custom type下slot=custom生效,无input
     * @param {String} label - 标签
     * @param {String|Number} labelWidth - 标签
     * @param {String} lableAlign='center' - label的对齐方式,见w-cell
     * @param {String} lableVertical='middle' - label的对齐方式,见w-cell
     * @param {Object} icon - icon设置选项, w-icon
     * @param {Number} iconWidth=28 - icon容器宽度
     * @param {String} iconAlign='center' - icon容器水平对齐方式,见w-cell
     * @param {String} iconVertical='center' - icon容器垂直对齐方式,见w-cell
     * @param {String} rows - textarea 的 rows
     * @param {String} placeholder - placeholder
     * @param {String} disabled - 是否禁用
     * @param {String} readonly - 是否只读
     * @param {String} error - 是否发生错误,错误信息通过slot=error 来自定义
     * @param {Object} attr - 设置input, textarea原生属性
     * @param {Function} enFormat - value格式化
     * @param {Function} deFormat - value反格式化
     * @param {Slot} icon - right slot内容
     * @param {Slot} label - left slot内容
     * @param {Slot} content - center slot内容
     * @param {Event} focus - 触发focus事件
     * @param {Event} blur - 触发blur事件
     * @param {Event} icon-click - 点击icon区域触发
     * @param {Event} label-click - 点击label区域触发
     * @param {String} format - 内置格式化方法 numberic:千分位格式化，最多保留两位小数, bankcard:银行卡格式化, [[4,2,3], '-']:按分组格式化 xxxx-xx-xxx
     *
     * @example
     *  <w-field v-model="value" label="用户名"></w-field>
     *  <w-field v-model="value" label="密码" placeholder="请输入密码"></w-field>
     *  <w-field v-model="value" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></w-field>
     *  <w-field v-model="value" label="邮箱" placeholder="成功状态" state="success"></w-field>
     */

    import Clickoutside from '../../../src/directives/clickoutside.js';
    import {
        Cell,
        Row,
        Col
    } from '../../layout';
    import Icon from '../../icon';
    import {
        WNumber
    } from '../../util'

    export default {
        name: 'w-field',
        directives: {
            Clickoutside
        },
        data() {
            return {
                active: false,
                dms: ' ',
                blocks:[],
                howDms: 0,
                selectionStart: 0,
                currentValue: this.value,
                deFormatFunction: this.deFormat,
                enFormatFunction: this.enFormat
            };
        },
        props: {
            type: {
                type: String,
                default: 'text'
            },
            name: String,
            rows: String,
            label: String,
            showLabel: {
                type: Boolean,
                default: true
            },
            labelWidth: {
                type: [Number, String],
                default: 80
            },
            labelAlign: {
                type: String,
                default: 'left'
            },
            labelVertical: {
                type: String,
                default: 'middle'
            },
            showIcon: {
                type: Boolean,
                default: false
            },
            iconWidth: {
                type: [Number, String],
                default: 28
            },
            iconAlign: {
                type: String,
                default: 'center'
            },
            iconVertical: String,
            iconStyle: Object,
            icon: {
                type: Object,
                default: function () {
                    return {
                        fill: '#c0c0c0',
                        width: 18,
                        height: 18,
                        type: 'right'
                    }
                }
            },
            placeholder: String,
            readonly: Boolean,
            pattern: String,
            disabled: Boolean,
            disableClear: Boolean,
            state: {
                type: String,
                default: 'default'
            },
            value: {},
            attr: Object,
            error: String,
            height:  [Number, String],
            format: {
                type: [String, Array],
                default: ''
            },
            deFormat: Function,
            enFormat: Function,
            maxlength: [Number,String]
        },

        components: {
            'w-cell': Cell,
            'w-col': Col,
            'w-row': Row,
            'w-icon': Icon
        },
        computed: {
            styles() {
                var s = {};
                if (this.height) {
                    s.height = this.height + 'px';
                }
                return s;
            },
            errorStyle() {
                var s={};
                var h = parseInt(this.height || 50);
                if (this.type!=='textarea' && h > 40){
                    s.marginTop = ((h - 14) * 0.5 - 8) * -1 + 'px';
                }
                return s;
            },
            rootStyles(){
                var s = {};
                if (this.height) {
                    s.minHeight = this.height + 'px';
                }
                return s;
            }
        },

        methods: {
            unActive() {
                this.active = false;
            },
            handleBlur($evtnt) {
                this.$emit('blur', this.currentValue);
            },
            handleFocus($event) {
                if (this.disabled || this.readonly) return;
                this.active = true;
                this.$emit('focus', this.currentValue);
            },
            handleEnter($event) {
                this.$emit('enter', this.currentValue);
            },
            handleIconClick() {
                this.$emit('icon-click');
            },
            handleInput($event) {
                if (this.enFormatFunction){
                    var ary = String(this.currentValue).match(new RegExp('\\'+this.dms,'g'));
                    this.howDms = ary ? ary.length : 0;
                }
                this.currentValue = this.hanleFormat($event.target.value);
                // 记录光标位置
                if (this.enFormatFunction) {
                    try{
                        this.selectionStart = this.$el.querySelector('.wui-field-input').selectionStart;
                    }catch(e){
                        this.selectionStart = 0;
                    }
                }
            },
            handleClear() {
                if (this.disabled || this.readonly) return;
                this.currentValue = '';
            },
            handleChange() {
                this.$emit('change', this.currentValue);
            },
            handleLabelClick() {
                this.$emit('label-click', this.currentValue);
            },
            hanleFormat(val) {
                var rst = '';
                if (typeof this.enFormatFunction === 'function') {
                    rst = this.enFormatFunction(val);
                }else {
                    rst = val;
                }
                return rst;
            }
        },
        watch: {
            value(val) {
                this.currentValue = this.hanleFormat(val);
                // 格式化后需要处理光标位置
                if (this.enFormatFunction) {
                    this.$nextTick(() => {
                        if (this.selectionStart) {
                            var ary = String(this.currentValue).match(new RegExp('\\'+this.dms,'g'));
                            if (ary){
                                var howDms = ary.length;
                            }
                            var pos = this.selectionStart;

                            if (this.howDms < howDms){
                                pos +=1;
                            }else if(this.howDms > howDms){
                                pos -=1;
                            }
                            this.$el.querySelector('.wui-field-input').setSelectionRange(pos, pos);
                            this.selectionStart = 0;
                        }
                    });
                }
            },
            currentValue(val) {
                if (this.deFormatFunction) {
                    val = this.deFormatFunction(val);
                }
                this.$emit('input', val);
            },
            //原生控件的一些属性
            attr: {
                immediate: true,
                handler(attrs) {
                    this.$nextTick(() => {
                        const target = [this.$refs.input, this.$refs.textarea];
                        target.forEach(el => {
                            if (!el || !attrs) return;
                            Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]));
                        });
                    });
                }
            }
        },
        created() {
            if(this.format){
                if (Array.isArray(this.format)) {
                    this.dms = this.format[1] || ' ';
                    this.blocks = this.format[0];
                }
                switch (this.format) {
                    case 'numberic':
                        this.deFormatFunction = WNumber.deFormatNumberic;
                        this.enFormatFunction = WNumber.enFormatNumberic;
                        this.dms = ',';
                        break;
                    case 'bankcard':
                        this.deFormatFunction = WNumber.deFormatBankCard;
                        this.enFormatFunction = WNumber.enFormatBankCard;
                        this.dms = ' ';
                        break;
                    default:
                        this.enFormatFunction = function(n){
                            return WNumber.formatBlocks(n, this.blocks, this.dms)
                        }.bind(this);

                        this.deFormatFunction = function(n){
                            return String(n).replace(new RegExp('\\' + this.dms, 'g'), '');
                        }.bind(this);
                        break;     
                }
            }

            this.currentValue = this.hanleFormat(this.value);
        }
    };
</script>

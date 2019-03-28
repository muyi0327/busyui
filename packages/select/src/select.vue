<style lang="scss">
    .wui-select {
        width: inherit;
        .wui-select-content {
            height: inherit;
            width: inherit;
            display: flex;
            align-items: center;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
        }

        .wui-select-input {
            width: inherit;
            border: 0;
            font-size: inherit;
            &::-webkit-input-placeholder {
                color: #aaa;
            }
        }

        .wui-select-options-con {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            background: #e7e7ed;
            text-align: center;
        }

        .wui-select-options {
            background: #fff;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            color: #999;
        }
    }
</style>

<template>
    <div @touch-move="$evt=>$evt.preventDefault()" @click.stop="handleClick" class="wui-select" :style="styles">
        <div class="wui-select-content">
            <input v-if="Object(currentValue).hasOwnProperty('label')" class="wui-select-input" type="text" :style="inputStyles" readonly v-model="currentValue.label" :placeholder="placeholder">
            <input v-else class="wui-select-input" type="text" :style="inputStyles" readonly v-model="currentValue" :placeholder="placeholder">
        </div>
        <w-mask :is-show="visiable" @click.stop="closeOptions">
            <transition name="wui-bibo">
                <div v-show="visiable" class="wui-select-options-con" :style="optionStyles">
                    <ul class="wui-select-options" @touchmove.stop="e=>{}" :class="['c-select-options-list-' + _uid]">
                        <slot>
                            <w-option :value="option" v-for="(option, $index) in options" :key="'select_' + $index">{{option.hasOwnProperty('label')? option.label : option}}</w-option>
                        </slot>
                    </ul>
                </div>
            </transition>

        </w-mask>
    </div>
</template>

<script>
    import Mask from '../../mask'
    import Input from '../../input'
    import {
        Cell,
        Row
    } from '../../layout';
    import Option from './option.vue'

    export default {
        name: 'w-select',
        props: {
            width: {
                type: [Number, String],
                default: ''
            },
            height: {
                type: [Number, String],
                default: ''
            },
            inputStyles: Object,
            placeholder: String,
            options: {
                type: Array,
                default() {
                    return []
                },
                validator(val) {
                    if (!val.length) return true
                    return val.every(v => {
                        let t = typeof v;
                        return ['string', 'number'].indexOf(t) > -1 || v.hasOwnProperty('label')
                    })
                }
            },
            title: String,
            optionHeight: {
                type: [Number, String]
            },
            value: [Object, String, Number],
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentValue: this.value,
                visiable: this.isShow,
                selectedIndex: ''
            }
        },
        components: {
            [Mask.name]: Mask,
            [Cell.name]: Cell,
            [Row.name]: Row,
            [Input.name]: Input,
            [Option.name]: Option
        },
        computed: {
            styles() {
                var o = {}, w = this.width, h = this.height;
                if (h) {
                    o.height = /^\d+$/.test(h) ? h + 'px' : h
                }

                if (this.width) {
                    o.width = /^\d+$/.test(w) ? w + 'px' : w
                }

                return o;
            },
            optionStyles() {
                var oh = this.optionHeight, o = {}

                if (oh) {
                    o.height = /^\d+$/.test(oh) ? oh + 'px' : oh
                }

                return o;
            }

        },
        watch: {
            visiable(val) {
                if (val === true) {
                    this.$emit('show', this)
                }

                if (val === false) {
                    this.$emit('hide', this)
                }

                this.$emit('visiable-change', val, this)
            },
            isShow(val) {
                this.visiable = val
            },
            value(val) {
                this.currentValue = val
            },
            currentValue(val) {
                this.$emit('input', val)
            }
        },
        methods: {
            closeOptions() {
                this.visiable = false;
            },
            openOptions() {
                this.visiable = true;
            },
            handleClick($e) {
                this.openOptions();
                this.$emit('click', $e)
            },
            handleChange(option) {
                this.currentValue = option;
                this.visiable = false;
            }
        },
        mounted() {
            this.$on('change', this.handleChange)
        }
    }
</script>

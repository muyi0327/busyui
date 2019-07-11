<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-select {
        width: inherit;
        &__content {
            height: inherit;
            width: inherit;
            display: flex;
            align-items: center;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
        }

        &__input {
            width: inherit;
            border: 0;
            font-size: inherit;
            &::-webkit-input-placeholder {
                color: #aaa;
            }
        }

        &__options {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            background: #e7e7ed;
            text-align: center;
        }

        &__list {
            background: #fff;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            color: #999;
        }

        &__item {
            height: 40px;
            line-height: 40px;
        }
    }
</style>

<template>
    <div @touch-move="$evt=>$evt.preventDefault()" @click.stop="handleClick" class="busy-select" :style="styles">
        <div class="busy-select__content">
            <input class="busy-select__input" type="text" :style="inputStyles" readonly v-model="currentValue" :placeholder="placeholder">
        </div>
        <NativeMask :is-show="visiable" @click.stop="closeOptions">
            <transition name="busy-animate--bibo">
                <div v-show="visiable" class="busy-select__options" :style="optionStyles">
                    <ul class="busy-select__list" @touchmove.stop="e=>{}" :class="['busy-select__list-' + _uid]">
                        <slot>
                            <NativeOption :value="option" v-for="(option, $index) in options" :key="'select_' + $index">{{option.hasOwnProperty('label')? option.label : option}}</NativeOption>
                        </slot>
                    </ul>
                </div>
            </transition>

        </NativeMask>
    </div>
</template>

<script>
    import Mask from '../../mask'
    import Option from './option.vue'

    export default {
        name: 'busy-select',
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
            multiple: {
                type: Boolean,
                default: false
            },
            autofocus: {
                type: Boolean,
                default: false
            },
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
            NativeMask: Mask,
            NativeOption: Option
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

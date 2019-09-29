<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-dialog {
        position: fixed;
        overflow: hidden;
        z-index: $dialog-default-z-index;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &__wrap {
            border-radius: 10px;
            background-color: rgba(#ffffff, 0.9);
            box-sizing: border-box;
            width: $dialog-dfault-width;
            height: $dialog-dfault-height;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1001;
            overflow: hidden;
        }

        &__close {
            position: absolute;
            top: 5px;
            right: 12px;
            z-index: 10;
        }

        &__title {
            line-height: 20px;
            box-sizing: border-box;
            font-size: 17px;
            color: #030303;
            text-align: center;
            padding: 14px 0 6px;
        }

        &__header,
        &__footer {
            width: 100%;
            box-sizing: border-box;
            flex: none;
        }

        &__body {
            flex-grow: 1;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 2;
            font-size: $dialog-default-content-font-size;
            color: $dialog-default-content-text-color;

            > div:first-child {
                width: 100%;
                box-sizing: border-box;
                text-align: center;
                margin: 0 15px;
                line-height: 24px;
            }
        }

        &__footer {
            display: flex;
            flex-wrap: no-wrap;
            border-top: 1px solid #ddd;
        }

        &__footer_row {
            flex-direction: row;
        }

        &__footer_row &__button {
            border-right: 1px solid #ddd;
            &:last-child {
                border-right: 0;
            }
        }

        &__footer_column {
            flex-direction: column;
        }

        &__footer_column &__button {
            border-bottom: 1px solid #ddd;
            &:last-child {
                border-bottom: 0;
            }
        }

        &__button {
            flex: 1;
            height: $dialog-default-button-height;
            line-height: $dialog-default-button-height;
            text-align: center;
            color: $dialog-default-button-text-color;
            font-size: $dialog-default-button-font-size;
            padding: 0;
            margin: 0;

            &:active {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }
</style>

<template>
    <div :class="`${prefixCls}-dialog`" v-show="!leave">
        <transition :name="`${prefixCls}-animate--scale`" @after-leave="_leave">
            <div :class="`${prefixCls}-dialog__wrap`" v-show="visiable" :style="styles">
                <p v-if="closable" :class="`${prefixCls}-dialog__close`" @click.stop="hide">
                    <Icon name="close" :width="20" :height="20" color="#8a8a8a" />
                </p>
                <header :class="`${prefixCls}-dialog__header`" v-if="title">
                    <slot name="header">
                        <div :class="`${prefixCls}-dialog__title`">{{title}}</div>
                    </slot>
                </header>
                <div :class="`${prefixCls}-dialog__body`" v-if="content || $slots['default']">
                    <slot>
                        <div :class="`${prefixCls}-dialog__content`" :style="contentStyle" v-html="content"></div>
                    </slot>
                </div>
                <footer :class="footerClasses">
                    <slot name="footer">
                        <template v-for="(btn,$i) in bindButtons">
                            <p :class="[`${prefixCls}-dialog__button`, btn.class]" :key="'btn-'+$i" :style="btn.style" @click.stop="btn.action">{{btn.text}}</p>
                        </template>
                    </slot>
                </footer>
            </div>
        </transition>
        <BusyMask :is-show="visiable" :is-remove="isRemove" color="rgba(0,0,0,.6)" />
    </div>

</template>
<script>
    import Icon from '../../icon'
    import Mask from '../../mask'
    import { initName, baseMixins, BNumber } from '../../util'

    export default {
        name: initName('dialog'),
        mixins: [baseMixins],
        props: {
            mask: {
                type: Boolean,
                default: true
            },
            width: {
                type: [Number, String]
            },
            zIndex: {
                type: [Number, String]
            },
            content: {
                type: [String, Number],
                default: ''
            },
            contentStyle: {
                type: Object
            },
            title: {
                type: String,
                default: ''
            },
            height: {
                type: [Number, String]
            },
            closable: {
                type: Boolean,
                default: false
            },
            buttons: {
                type: Array,
                default() {
                    return [{
                        text: '取消'
                    }, {
                        text: '确定'
                    }]
                }
            },
            buttonDirection: {
                type: String,
                default: 'row'
            },
            isShow: {
                type: Boolean,
                default: false
            },
            isRemove: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visiable: this.isShow,
                leave: !this.isShow
            }
        },
        components: {
            Icon,
            BusyMask: Mask
        },
        computed: {
            styles() {
                let w = this.width, h = this.height;
                return {
                    height: BNumber.cmpUnit(h),
                    width: BNumber.cmpUnit(w),
                    zIndex: this.zIndex
                };
            },
            /**
             * 格式化button的回调
             **/
            bindButtons() {
                return this.buttons.map((button) => {
                    var action = button.action;
                    button.action = () => {
                        this.hide();
                        return action && typeof action == 'function' && action.apply(this, [].slice.call(
                            arguments));
                    };

                    return button;
                });
            },
            footerClasses() {
                let { prefixCls, buttonDirection } = this
                return [
                    `${prefixCls}-dialog__footer`,
                    {
                        [`${prefixCls}-dialog__footer_row`]: buttonDirection === 'row',
                        [`${prefixCls}-dialog__footer_column`]: buttonDirection === 'column'
                    }
                ]
            }
        },
        watch: {
            isShow(val) {
                this.visiable = val;
            },
            visiable(val) {
                if (val === true) {
                    this.leave = false
                }
                this.$emit('visiable-change', val);
            }
        },
        methods: {
            hide() {
                this.visiable = false;
                this.$emit('hide');
                return this;
            },

            show() {
                this.visiable = true;
                this.$emit('show');
                return this;
            },

            _leave() {
                this.leave = true
                this.$emit('after-leave')
                // 动画结束，清除元素
                if (this.isRemove) {
                    this.$destroy()
                    this.$el.remove()
                    this.$emit('destroy', this)
                }
                this.$emit('hide-end', this)
            }
        }
    }
</script>    

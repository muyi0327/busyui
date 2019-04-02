<style lang="scss">
    @import "../../../src/style/variable.scss";

    $ml: $dialog-dfault-width * -0.5;

    $mt: $dialog-dfault-height * -0.5;
    .#{$prefixClass}-dialog {
        position: fixed;
        border-radius: 12px;
        overflow: hidden;
        background-color: #f7f7f7;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        z-index: 1002;
        left: 50%;
        top: 50%;
        opacity: 1;
        transform: scale(1, 1) translate3d(-50%, -50%, 0);
        transform-origin: 50% 50%;
        width: #{$dialog-dfault-width}px;
        height: #{$dialog-dfault-height}px;

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
            padding: 14px 0;
        }

        &__header,
        &__footer {
            width: 100%;
            box-sizing: border-box;
            flex-grow: 0;
            flex-shrink: 0;
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
            border-top: 1px solid #e7e7e7;
        }

        &__footer_row {
            flex-direction: row;
        }

        &__footer_row &__button {
            border-right: 1px solid #e7e7e7;
            &:last-child {
                border-right: 0;
            }
        }

        &__footer_col {
            flex-direction: column;
        }

        &__footer_col &__button {
            border-bottom: 1px solid #e7e7e7;
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

            &:active {
                background-color: #eee;
            }
        }
    }

    .fade-scale-enter,
    .fade-scale-leave-active {
        opacity: 0;
        transform: scale(0.8, 0.8) translate3d(-50%, -50%, 0);
    }

    .fade-scale-leave-active,
    .fade-scale-enter-active {
        transition: all 0.3s ease;
    }
</style>

<template>
    <bee-mask v-show="visiable" :is-remove="isRemove" color="rgba(0,0,0,.5)">
        <transition name="fade-scale">
            <div class="bee-dialog" v-if="visiable" :style="styles">
                <p v-if="showClose" class="bee-dialog__close" @click.stop="hide">
                    <bee-icon type="close" :width="20" :height="20" fill="#8a8a8a"></bee-icon>
                </p>
                <header class="bee-dialog__header" v-if="title">
                    <slot name="header">
                        <div class="bee-dialog__title">{{title}}</div>
                    </slot>
                </header>
                <div class="bee-dialog__body" v-if="content || $slots['body']">
                    <slot name="body">
                        <div :style="contentStyle" v-html="content"></div>
                    </slot>
                </div>
                <footer class="bee-dialog__footer" :style="footerStyles" :class="{'bee-dialog__footer_row':buttonDirection=='row', 'bee-dialog__footer_col':buttonDirection=='col'}">
                    <slot name="footer">
                        <template v-for="(btn,$i) in bindButtons">
                            <p class="bee-dialog__button" :key="'btn-'+$i" :class="btn.class" :style="btn.style" @click.stop="btn.action">{{btn.text}}</p>
                        </template>
                    </slot>
                </footer>
            </div>
        </transition>
    </bee-mask>
</template>
<script>
    import Icon from '../../icon';
    import Mask from '../../mask';

    export default {
        name: 'bee-dialog',
        props: {
            mask: {
                type: Boolean,
                default: true
            },
            width: {
                type: [Number, String],
                default: '80%'
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
                type: [Number, String],
                default: 0
            },
            showClose: {
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
                visiable: this.isShow
            }
        },
        components: {
            [Icon.name]: Icon,
            [Mask.name]: Mask
        },
        computed: {
            styles() {
                let s = {}, w = this.width, h = this.height;

                if (this.width) {
                    s.width = /^\d+$/.test(w) ? w + 'px' : w
                    //s.marginLeft = -1 * this.width * 0.5 + 'px';
                }

                if (this.height) {
                    s.height = /^\d+$/.test(h) ? h + 'px' : h
                    //s.marginTop = -1 * this.height * 0.5 + 'px';
                }
                return s;
            },
            footerStyles() {
                return {
                    height: (this.buttonDirection == 'row' ? 1 : this.buttons.length) * 44 + 'px'
                }
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
            }
        },
        watch: {
            isShow(val) {
                this.visiable = val;
            },
            visiable(val) {
                this.$emit('visiable-change', val);
            }
        },
        methods: {
            hide() {
                this.visiable = false;
                this.$emit('close');
                return this;
            },

            show() {
                this.visiable = true;
                this.$emit('show');
                return this;
            }
        }
    }
</script>    

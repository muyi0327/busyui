<style lang="scss">
    @import "../../../src/style/variable";
    @import "../../../src/style/animate";

    .#{$prefixClass}-dialog {
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
                background-color: #eee;
            }
        }
    }
</style>

<template>
    <div class="busy-dialog" v-show="!leave">
        <transition name="busy-animate--scale" @after-leave="_leave">
            <div class="busy-dialog__wrap" v-show="visiable" :style="styles">
                <p v-if="showClose" class="busy-dialog__close" @click.stop="hide">
                    <Icon type="close" :width="20" :height="20" fill="#8a8a8a" />
                </p>
                <header class="busy-dialog__header" v-if="title">
                    <slot name="header">
                        <div class="busy-dialog__title">{{title}}</div>
                    </slot>
                </header>
                <div class="busy-dialog__body" v-if="content || $slots['default']">
                    <slot>
                        <div :style="contentStyle" v-html="content"></div>
                    </slot>
                </div>
                <footer class="busy-dialog__footer" :class="{'busy-dialog__footer_row':buttonDirection=='row', 'busy-dialog__footer_column':buttonDirection=='column'}">
                    <slot name="footer">
                        <template v-for="(btn,$i) in bindButtons">
                            <p class="busy-dialog__button" :key="'btn-'+$i" :class="btn.class" :style="btn.style" @click.stop="btn.action">{{btn.text}}</p>
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

    export default {
        name: 'busy-dialog',
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

                if (this.width) {
                    w = /^\d+$/.test(w) ? w + 'px' : w
                }

                if (this.height) {
                    h = /^\d+$/.test(h) ? h + 'px' : h
                }

                return {
                    height: h,
                    width: w,
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

<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-message {
        position: fixed;
        z-index: 10001;
        opacity: 1;
        overflow: hidden;
        display: flex;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        width: 100%;
        background: #e4f6ff;
        color: #0a97e4;

        &--pos-top {
            top: 0;
            left: 0;
        }

        &--pos-middle {
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }

        &--pos-bottom {
            bottom: 0;
            left: 0;
        }

        &--success {
            background: #edffe7;
            color: #57c986;
        }

        &--warning {
            background: #fef4d4;
            color: #fb6700;
        }

        &--error {
            background: #fdf2ee;
            color: #f63e4b;
        }

        &__icon {
            justify-content: center;
            align-items: center;
            display: flex;
            padding: 0 15px;
            flex: none;
        }
        &__text {
            flex-grow: 1;
            text-align: left;
            padding: 0 15px 0 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        &__close {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: none;
            padding: 0 10px;
        }
    }
</style>

<template>
    <transition :name="animation" v-on:after-leave="_leave">
        <div v-show="visiable" :class="classes" :style="styles">
            <div :class="`${prefixCls}-message__icon`">
                <Icon :name="_statusStyles.icon" width="24" height="24" :color="_statusStyles.color" />
            </div>
            <div :class="`${prefixCls}-message__text`">
                <slot>{{text}}</slot>
            </div>
            <div v-show="closable" :class="`${prefixCls}-message__close`" @click="hide">
                <Icon name="close" width="24" height="24" :color="_statusStyles.color" />
            </div>
        </div>
    </transition>
</template>
<script>
    import Icon from '../../icon'
    import { BNumber, initName, baseMixins } from '../../util'

    export default {
        name: initName('message'),
        mixins: [baseMixins],
        props: {
            pos: {
                type: String,
                default: 'top'
            },
            mode: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            bgColor: {
                type: String
            },
            height: {
                type: [String, Number],
                validator: BNumber.validateUnit
            },
            width: {
                type: [String, Number],
                validator: BNumber.validateUnit
            },
            delay: {
                type: Number,
                default: 3000
            },
            closable: {
                type: Boolean,
                default: false
            },
            isShow: {
                type: Boolean,
                default: false
            },
            isRemove: {
                type: Boolean,
                default: false
            },
            autoHide: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                visiable: this.isShow,
                timmer: null
            }
        },
        components: {
            Icon
        },
        watch: {
            isShow(val) {
                this.visiable = val;
            },
            visiable(val) {
                if (!val) {
                    this.timmer && clearTimeout(this.timmer);
                    this.timmer = null;
                }

                this.$emit('visiable-change', val)
            }
        },
        methods: {
            show() {
                this.visiable = true;
                this.$emit('show');
            },
            hide() {
                this.visiable = false;
                this.$emit('hide');
            },
            _leave() {
                // 动画结束，清除元素
                if (this.isRemove) {
                    this.$destroy();
                    this.$el.parentNode.removeChild(this.$el);
                }
            }
        },
        computed: {
            styles() {
                let h = BNumber.cmpUnit(this.height)
                let w = BNumber.cmpUnit(this.width)
                return {
                    backgroundColor: this.bgColor,
                    height: h,
                    width: w,
                    lineHeight: h,
                }
            },

            classes() {
                let { prefixCls, pos, mode } = this
                return [
                    `${prefixCls}-message`,
                    `${prefixCls}-message--pos-${pos}`,
                    `${prefixCls}-message--${mode}`
                ]
            },

            animation() {
                let m = this.pos == 'bottom' ? 'bibo' : 'tito'
                return `${this.prefixCls}-animate--${m}`
            },

            _statusStyles() {
                let t = '',
                    c = '';
                switch (this.mode) {
                    case 'success':
                        t = 'check-circle';
                        c = '#57c986';
                        break;
                    case 'error':
                        t = 'close-circle';
                        c = '#f63e4b';
                        break;
                    case 'warning':
                        t = 'info-circle';
                        c = '#fb6700';
                        break;
                    default:
                        t = '';
                        c = '';
                }

                return {
                    icon: t,
                    color: c
                };
            }
        },
        mounted() {
            if (this.autoHide) {
                this.timmer = setTimeout(() => this.hide(), this.delay);
            }
        }
    }
</script>

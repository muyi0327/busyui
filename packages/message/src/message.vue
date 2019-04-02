<style lang="scss">
    @import "../../../src/style/variable";

    .#{prefixClass}-message {
        position: fixed;
        z-index: 10001;
        border-radius: 5px;
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0px 0px 4px #ccc;
        display: flex;
        padding: 6px 0px;
        color: #646464;
        font-size: 12px;

        &--pos-top {
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
        }

        &--pos-middle {
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }

        &--pos-bottom {
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
        }

        &__icon {
            justify-content: center;
            align-items: center;
            display: flex;
            padding: 0 15px;
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
            position: absolute;
            z-index: 10;
        }
    }

    .msg-scale-enter-active,
    .msg-scale-leave-active {
        transition: all 0.25s linear;
    }

    .msg-scale-enter,
    .msg-scale-leave-active {
        opacity: 0.3;
    }
</style>

<template>
    <transition name="msg-scale" v-on:after-leave="_leave">
        <div v-show="visiable" class="bee-message" :class="_posClass" :style="styles">
            <div class="bee-message__icon" v-if="type">
                <bee-icon :type="_iconStyles.t" :fill="_iconStyles.c"></bee-icon>
            </div>
            <div class="bee-message__text">
                <slot>{{text}}</slot>
            </div>
        </div>
    </transition>
</template>
<script>
    import Icon from '../../icon';

    export default {
        name: 'bee-message',
        props: {
            pos: {
                type: String,
                default: 'top'
            },
            type: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            bgColor: {
                type: String,
                default: '#ffffff'
            },
            delay: {
                type: Number,
                default: 3000
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
            [Icon.name]: Icon
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
                return {
                    backgroundColor: this.bgColor
                }
            },

            _posClass() {
                return 'bee-message--pos-' + this.pos;
            },

            _iconStyles() {
                let t = '',
                    c = '';
                switch (this.type) {
                    case 'info':
                        t = 'infofill';
                        c = '#0275d8';
                        break;
                    case 'success':
                        t = 'roundcheckfill';
                        c = '#5cb85c';
                        break;
                    case 'error':
                        t = 'roundclosefill';
                        c = '#d9534f';
                        break;
                    case 'warning':
                        t = 'warnfill';
                        c = '#f0ad4e';
                        break;
                    default:
                        t = '';
                        c = '';
                }

                return {
                    t: t,
                    c: c
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

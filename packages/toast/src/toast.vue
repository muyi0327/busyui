<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-toast {
        position: fixed;
        z-index: 1000;
        width: 100%;
        text-align: center;
        pointer-events: none;

        &--pos-top {
            top: 50px;
            left: 0;
        }

        &--pos-middle {
            transform: translate3d(0, -50%, 0);
            left: 0;
            top: 50%;
        }

        &--pos-bottom {
            bottom: 50px;
            left: 0;
        }

        &__wrap {
            background-color: #262728;
            border-radius: 4px;
            overflow: hidden;
            display: inline-flex;
            margin: 0 auto;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            box-sizing: border-box;
        }

        &__icon {
            padding: 0;
            margin: 0 10px 0 0;
        }

        &__text {
            color: #fff;
            text-align: center;
            font-size: 16px;
            line-height: 1.5;
            font-weight: normal;
            padding: 0;
            margin: 0;
        }

        &.fade-top-enter-active,
        &.fade-top-leave-active {
            transition: all 0.3s linear;
        }

        &.fade-top-enter,
        &.fade-top-leave-active {
            opacity: 0.3;
        }
    }
</style>

<template>
    <transition name="fade-top" v-on:after-leave="_leave">
        <article v-show="visiable" class="busy-toast" :class="posClass">
            <div class="busy-toast__wrap">
                <p v-if="type" class="busy-toast__icon">
                    <busy-icon :type="type" :width="iconWidth" :height="iconHeight" :fill="color"></busy-icon>
                </p>
                <p class="busy-toast__text">
                    <slot>
                        {{contentString}}
                    </slot>
                </p>
            </div>
        </article>
    </transition>
</template>

<script>
    import Icon from '../../icon';

    export default {
        name: 'busy-toast',
        props: {
            type: {
                type: String,
                default: ''
            },
            delay: {
                type: Number,
                default: 2500
            },
            iconHeight: {
                type: Number,
                default: 28
            },
            iconWidth: {
                type: Number,
                default: 28
            },
            color: {
                type: String,
                default: '#fff'
            },
            content: {
                type: [String, Number],
                default: ''
            },
            pos: {
                type: String,
                default: 'top'
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
                default: false
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
        computed: {
            posClass() {
                return [`busy-toast--pos-${this.pos}`];
            },
            contentString() {
                var content = this.content, t = typeof content;
                if (t == 'number') {
                    return String(content);
                } else if (Array.isArray(content)) {
                    return content.join();
                } else if (t !== 'string') {
                    return content.toString ? content.toString() : String(content)
                }

                return content;
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
                    this.$emit('destroy', this)
                }
                this.$emit('hide-end', this)
            },
            clearTimmer() {
                if (this.timmer) {
                    clearTimeout(this.timmer);
                    this.timmer = null;
                }
            }
        },
        watch: {
            isShow(val) {
                this.visiable = val;
            },
            visiable(val) {
                this.$emit('visiable-change', val);
                this.clearTimmer();
                if (val === true && this.autoHide) {
                    this.timmer = setTimeout(this.hide, this.delay)
                }
            }
        },
        mounted() {
            if (this.autoHide) {
                this.timmer = setTimeout(this.hide, this.delay);
            }
        }
    }
</script>

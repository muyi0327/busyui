<style lang="scss">
    @import "../../../src/style/variable";

    .#{prefixClass}-toast {
        position: fixed;
        z-index: 1000;
        width: 100%;
        text-align: center;

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
            border-radius: 12px;
            overflow: hidden;
            display: inline-flex;
            margin: 0 auto;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            box-sizing: border-box;
            max-width: 260px;
            min-width: 120px;
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
        <article v-show="visiable" class="bee-toast" :class="posClass">
            <div class="bee-toast__wrap">
                <p v-if="type" class="bee-toast__icon">
                    <w-icon :type="type" :width="iconWidth" :height="iconHeight" :fill="color"></w-icon>
                </p>
                <p class="bee-toast__text">
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
        name: 'bee-toast',
        props: {
            type: {
                type: String,
                default: ''
            },
            delay: {
                type: Number,
                default: 2000
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
                type: [String, Number, Array],
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
        computed: {
            posClass() {
                return [`bee-toast--pos-${this.pos}`];
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
                }
                this.$emit('after-leave', this)
            }
        },
        watch: {
            isShow(val) {
                this.visiable = val;

            },
            visiable(val) {
                if (!val) {
                    clearTimeout(this.timmer);
                    this.timmer = null;
                } else if (this.autoHide) {
                    !this.timmer && (this.timmer = setTimeout(this.hide, this.delay));
                }
                this.$emit('visiable-change', val);
            }
        },
        mounted() {
            if (this.autoHide) {
                this.timmer = setTimeout(this.hide, this.delay);
            }
        }
    }
</script>

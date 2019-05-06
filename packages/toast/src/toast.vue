<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-toast {
        position: fixed;
        z-index: $toast-default-z-index;
        width: 100%;
        text-align: center;
        pointer-events: none;
        font-size: #{$toast-default-font-size};

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
            max-width: 80%;
        }

        &__icon {
            padding: 0;
            margin: 0 10px 0 0;
            line-height: 1px;
        }

        &__text {
            color: #fff;
            text-align: center;
            line-height: 1.5;
            font-weight: normal;
            padding: 0;
            margin: 0;
        }
    }
</style>

<template>
    <transition name="busy-animate--fade" v-on:after-leave="_leave">
        <article v-show="visiable" class="busy-toast" :class="posClass">
            <div class="busy-toast__wrap">
                <span v-if="iconType" class="busy-toast__icon">
                    <busy-icon :type="iconType" :width="iconWidth" :height="iconHeight" fill="#ffffff"></busy-icon>
                </span>
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
            delay: {
                type: Number,
                default: 2500
            },
            iconType: {
                type: String,
                default: ''
            },
            iconHeight: {
                type: Number,
                default: 24
            },
            iconWidth: {
                type: Number,
                default: 24
            },
            content: {
                type: [String, Number],
                default: ''
            },
            pos: {
                type: String,
                default: 'top'
            },
            zIndex: {
                type: Number
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
                this.visiable = false
                this.$emit('hide')
            },
            _leave() {
                this.$emit('after-leave', this)
                // 动画结束，清除元素
                if (this.isRemove) {
                    this.$destroy();
                    this.$emit('destroy', this)
                    this.$el.remove();
                }

            },
            clearTimmer() {
                if (this.timmer) {
                    clearTimeout(this.timmer);
                    this.timmer = null;
                }
            },
            afterLeave(cb) {
                this.$on('after-leave', cb)
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

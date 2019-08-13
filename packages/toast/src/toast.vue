<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-toast {
        position: fixed;
        z-index: $toast-default-z-index;
        left: 0;
        right: 0;
        text-align: center;
        pointer-events: none;
        font-size: #{$toast-default-font-size};

        &--pos-top {
            top: 50px;
        }

        &--pos-middle {
            transform: translate3d(0, -50%, 0);
            top: 50%;
        }

        &--pos-bottom {
            bottom: 50px;
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
            min-width: 90px;
        }

        &--row {
            flex-direction: row;
        }

        &--row-reverse {
            flex-direction: row-reverse;
        }

        &--column {
            flex-direction: column;
        }

        &--column-reverse {
            flex-direction: column;
        }

        &__icon {
            padding: 0;
            line-height: 1px;
            margin: 0 0 0 10px;
        }

        &--column &__icon {
            margin: 0 0 10px 0;
        }

        &__text {
            color: #fff;
            text-align: center;
            line-height: 1.5;
            font-weight: normal;
            margin: 0;
        }
    }
</style>

<template>
    <transition :name="`${prefixCls}-animate--fade`" v-on:after-leave="_leave">
        <article v-show="visiable" :class="[`${prefixCls}-toast`, posClass]">
            <div :class="classess" :style="styles">
                <span v-if="iconName" :class="`${prefixCls}-toast__icon`">
                    <Icon :name="iconName" :width="iconWidth" :height="iconHeight" :color="color" />
                </span>
                <p :class="`${prefixCls}-toast__text`">
                    <slot>
                        {{contentString}}
                    </slot>
                </p>
            </div>
        </article>
    </transition>
</template>

<script>
    import Icon from '../../icon'
    import { initName, baseMixins, BNumber } from '../../util'

    export default {
        name: initName('toast'),
        mixins: [baseMixins],
        props: {
            width: {
                type: [String, Number]
            },
            height: {
                type: [String, Number]
            },
            delay: {
                type: Number,
                default: 2500
            },
            iconName: {
                type: String,
                default: ''
            },
            iconHeight: {
                type: [Number, String],
                default: 24
            },
            iconWidth: {
                type: [Number, String],
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
            },
            direction: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: '#fff'
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
        computed: {
            posClass() {
                return ['top,middle,bottom'.split(',').indexOf(this.pos) > -1 ? `${this.prefixCls}-toast--pos-${this.pos}` : ''];
            },

            styles() {
                let width = BNumber.cmpUnit(this.width)
                let height = BNumber.cmpUnit(this.height)
                return {
                    color: this.color,
                    width,
                    height
                }
            },

            classess() {
                return [`${this.prefixCls}-toast__wrap`, this.direction ? `${this.prefixCls}-toast--${this.direction}` : null]
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

                return content
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

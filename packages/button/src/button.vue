<style lang="scss" scoped>
    @import "../../../src/style/variable.scss";
    .#{$prefixCls}-button {
        border-style: solid;
        border-color: $button-default-border-color;
        box-sizing: content-box;
        display: inline-flex;
        position: relative;
        text-align: center;
        border-radius: $button-default-border-radius;
        background-color: $button-default-background-color;
        color: $button-default-text-color;
        height: $button-normal-height;
        line-height: $button-normal-height;
        font-size: $button-normal-font-size;
        border: 0px solid $button-default-border-color;
        justify-content: center;
        align-items: center;

        &__button {
            appearance: none;
            user-select: none;
            border-width: 0;
            outline: 0;
            margin: 0;
            padding: 0 12px;
            height: inherit;
            background: transparent;
            color: inherit;
            font-size: inherit;
            text-align: center;
        }

        &.is-ghost {
            background-color: transparent;
            color: $button-default-border-color;
        }

        &.is-sharp {
            border-radius: 0;
        }

        &.is-block {
            width: 100%;
        }

        &__border,
        &:after {
            background-color: transparent;
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid transparent;
            transform-origin: 0 0;
            pointer-events: none;
            box-sizing: border-box;
            border-radius: inherit;
        }

        &__border {
            border-color: inherit;
            border-style: inherit;
            .is-sharp & {
                border-radius: 0;
            }
        }

        &:after {
            right: 0;
            bottom: 0;
            content: " ";
            z-index: 1000;
        }

        &.is-disabled {
            cursor: not-allowed;
        }

        &:not(.is-disabled):active:after {
            background-color: rgba(0, 0, 0, 0.1);
        }

        &.is-disabled:after {
            background-color: rgba(255, 255, 255, 0.6);
        }

        &--primary {
            background-color: $button-primary-background-color;
            color: $button-primary-text-color;
            border-color: $button-primary-border-color;
            &.is-ghost {
                color: $button-primary-border-color;
            }
        }

        &--warning {
            background-color: $button-warning-background-color;
            color: $button-warning-text-color;
            border-color: $button-warning-border-color;
            &.is-ghost {
                color: $button-warning-border-color;
            }
        }

        &--large {
            height: $button-large-height;
            line-height: $button-large-height;
            font-size: $button-large-font-size;
        }

        &--small {
            height: $button-small-height;
            line-height: $button-small-height;
            font-size: $button-small-font-size;
        }

        &__icon {
            flex: none;
        }
    }
</style>


<template>
    <div :class="[`${prefixCls}-button`, classes]" @click="handleClick" :style="styles">
        <template v-if="icon || $slots['icon']">
            <slot name="icon">{{icon}}</slot>
        </template>
        <button :class="`${prefixCls}-button__button`" :type="nativeType" :disabled="disabled">
            <slot>{{content}}</slot>
        </button>
        <span v-if="thin" :class="`${prefixCls}-button__border`" :style="borderStyles"></span>
    </div>
</template>

<script>
    import { BNumber, initName, baseMixins } from '../../util'

    setTimeout(() => {
        let dpr = window.devicePixelRatio;
        let id = initName('button-border-1px')
        let className = initName('button__border')

        //if (this.borderColor) {
        var styleTag = document.getElementById(id);
        var sheet = styleTag ? (styleTag.sheet || styleTag.styleSheet) : null;
        if (!sheet) {
            var style = document.createElement("style")
            style.id = id
            style.type = 'text/css'
            style.appendChild(document.createTextNode(""))
            document.head.appendChild(style);
            sheet = style.sheet
        }

        if (sheet.addRule) {
            sheet.addRule(`.${className}`,
                'width: ' + dpr * 100 + '%;' +
                'height: ' + dpr * 100 + '%;' +
                'transform: scale(' + 1 / dpr + ');'
            )
        } else if (sheet.insertRule) {
            sheet.insertRule(`.${className}` +
                'width: ' + dpr * 100 + '%;' +
                'height: ' + dpr * 100 + '%;' +
                'transform: scale(' + 1 / dpr + ');}', 0)
        }
    }, 0)

    /**
     * @class
     * @constructor
     * @module Button 
     * @see {@link ../example/all/button.html 实例}
     * @desc Button 按钮组件
     * @param {string} type=default - 显示类型，接受 default, primary, warning
     * @param {string} nativeType=button - 按钮类型， button, reset, submit
     * @param {boolean} disabled=false - 禁用
     * @param {ghost} ghost=false - 幽灵按钮
     * @param {boolean} block=false - 是否100%宽
     * @param {string} size=normal - 尺寸，接受 normal, small, large
     * @param {Boolean} sharp=false - 是否尖角
     * @param {String} slot - 显示文本
     * @param {String} radius - 圆角
     */
    export default {
        name: initName('button'),
        mixins: [baseMixins],
        props: {
            disabled: Boolean,
            nativeType: {
                type: String,
                default: 'button'
            },
            content: {
                type: String
            },
            sharp: Boolean,
            block: Boolean,
            type: {
                type: String,
                default: 'default',
                validator(value) {
                    return [
                        'default',
                        'primary',
                        'warning'
                    ].indexOf(value) > -1;
                }
            },
            ghost: {
                type: Boolean,
                default: false
            },
            thin: {
                type: Boolean,
                default: true
            },
            color: {
                type: String
            },
            size: {
                type: String,
                default: 'normal',
                validator(value) {
                    return [
                        'normal',
                        'small',
                        'large'
                    ].indexOf(value) > -1;
                }
            },
            icon: String,
            width: {
                type: [Number, String]
            },
            height: {
                type: [Number, String]
            },
            radius: {
                type: [Number, String],
                default: '4px'
            }
        },

        data() {
            return {

            }
        },

        methods: {
            handleClick(evt) {
                if (!this.disabled) {
                    this.$emit('click', evt);
                }
            }
        },
        computed: {
            classes() {

                let { type = 'default', size = 'normal', disabled, block, ghost, prefixCls } = this
                return [
                    type === 'default' ? null : `${prefixCls}-button--${type}`,
                    size === 'normal' ? null : `${prefixCls}-button--${size}`, {
                        'is-disabled': disabled,
                        'is-block': block,
                        'is-ghost': ghost
                    }]
            },
            borderStyles() {
                if (!this.thin) return null;

                let br = this.sharp ? 0 : (this.radius || 4), regBr;

                if (br) {
                    br = BNumber.getDPRUnit(br)
                }

                return {
                    borderRadius: br
                }
            },
            styles() {
                let { width, height, color, radius, ghost } = this

                width = BNumber.cmpUnit(width)
                height = BNumber.cmpUnit(height)
                radius = BNumber.cmpUnit(radius)

                return {
                    width,
                    height,
                    borderRadius: radius,
                    backgroundColor: ghost ? null : color,
                    borderColor: color,
                    color: ghost ? color : null
                }
            }
        },
        mounted() {

        }
    };
</script>

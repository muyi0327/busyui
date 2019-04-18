<style lang="scss">
    @import "../../../src/style/variable.scss";

    .#{$prefixClass}-button {
        -webkit-appearance: none;
        appearance: none;
        -webkit-user-select: none;
        user-select: none;
        border-width: 0;
        border-style: solid;
        box-sizing: content-box;
        color: inherit;
        display: inline-block;
        outline: 0;
        position: relative;
        text-align: center;
        padding: 0 12px;
        border-radius: $button-default-border-radius;
        overflow: hidden;
        margin: 0;
        &.is-sharp {
            border-radius: 0;
            .busy-button__border {
                border-radius: 0;
            }
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
            right: 0;
            bottom: 0;
            box-sizing: border-box;
            border: 1px solid transparent;
            transform-origin: 0 0;
        }

        &:after {
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

        &--default {
            background-color: $button-default-background-color;
            color: $button-default-text-color;
            border-color: $button-default-border-color;
            &.is-ghost {
                color: $button-default-border-color;
            }
        }

        &--default &__border {
            border-color: $button-default-border-color;
        }

        &--primary {
            background-color: $button-primary-background-color;
            color: $button-primary-text-color;
            border-color: $button-primary-border-color;
            &.is-ghost {
                color: $button-primary-border-color;
            }
        }

        &--primary &__border {
            border-color: $button-primary-border-color;
        }

        &--warning {
            background-color: $button-warning-background-color;
            color: $button-warning-text-color;
            border-color: $button-warning-border-color;
            &.is-ghost {
                color: $button-warning-border-color;
            }
        }

        &--warning &__border {
            border-color: $button-warning-border-color;
        }

        &--large {
            height: $button-size-large-height;
            line-height: $button-size-large-height;
            font-size: 18px;
        }

        &--normal {
            height: $button-size-normal-height;
            line-height: $button-size-normal-height;
            font-size: 14px;
        }

        &--small {
            height: $button-size-small-height;
            line-height: $button-size-small-height;
            font-size: 14px;
        }
    }
</style>

<template>
    <button :data-key="'busy-button-' + _uid" :type="nativeType" class="busy-button" :class="['busy-button--' + type, size ? 'busy-button--' + size : '', {
      'is-disabled': disabled,
      'is-block': block,
      'is-ghost': ghost
    }]" :style="styles" @click="handleClick" :disabled="disabled">
        <label class="busy-button__text">
            <slot>{{content}}</slot>
        </label>
        <span v-if="isThin" class="busy-button__border" :style="thinBorder"></span>
    </button>
</template>

<script>
    import { MNumber } from '../../util'

    setTimeout(() => {
        let dpr = window.devicePixelRatio;

        //if (this.borderColor) {
        var styleTag = document.getElementById('busy-button-border-1px');
        var sheet = styleTag ? (styleTag.sheet || styleTag.styleSheet) : null;
        if (!sheet) {
            var style = document.createElement("style");
            style.id = 'busy-button-border-1px';
            style.type = 'text/css';
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            sheet = style.sheet;
        }

        if (sheet.addRule) {
            sheet.addRule('button > .busy-button__border',
                'width: ' + dpr * 100 + '%;' +
                'height: ' + dpr * 100 + '%;' +
                'transform: scale(' + 1 / dpr + ');'
            );
        } else if (sheet.insertRule) {
            sheet.insertRule('button > .busy-button__border' +
                'width: ' + dpr * 100 + '%;' +
                'height: ' + dpr * 100 + '%;' +
                'transform: scale(' + 1 / dpr + ');', 0);
        }

        //}
    }, 0);

    /**
     * @busyui/button
     * @module Button
     * @see {@link ../example/all/button.html 实例}
     * @desc 按钮组件 <busy-button />
     * @param {string} type=default - 显示类型，接受 default, primary, warning
     * @param {string} nativeType=button - 按钮类型， button, reset, submit
     * @param {boolean} disabled=false - 禁用
     * @param {boolean} plain=false - 镂空按钮
     * @param {ghost} ghost=false - 幽灵按钮
     * @param {boolean} block=false - 是否100%宽
     * @param {string} size=normal - 尺寸，接受 normal, small, large
     * @param {Boolean} sharp=false - 是否尖角
     * @param {Number} height - 高度
     * @param {Number} width - 宽度
     * @param {String} slot - 显示文本
     * @param {String} bgColor - 按钮背景色
     * @param {String} fontColor - 字体颜色
     * @param {String} borderColor - 边框颜色
     * @param {String} borderWidth - 边框宽度
     * @param {String} borderRadius - 圆角
     *
     * @example
     *  <busy-button size="large" type="primary">按钮</busy-button>
     *
     *  <busy-button size="small" type="warning">删除</busy-button>
     *
     */
    export default {
        name: 'busy-button',

        props: {
            disabled: Boolean,
            nativeType: {
                type: String,
                default: 'button'
            },
            content: {
                type: String
            },
            plain: Boolean,
            sharp: Boolean,
            block: Boolean,
            fontSize: {
                type: [Number, String],
                default: 14,
                validator: MNumber.validateUnit
            },
            bgColor: String,
            borderColor: String,
            borderStyle: {
                type: String
            },
            borderWidth: {
                type: [Number, String],
                default: 1,
                validator: MNumber.validateUnit
            },
            fontColor: String,
            borderRadius: {
                type: [Number, String],
                default: 4,
                validator: MNumber.validateUnit
            },
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
            height: {
                type: [String, Number],
                validator: MNumber.validateUnit
            },
            width: {
                type: [String, Number],
                validator: MNumber.validateUnit
            },
            size: {
                type: String,
                default: 'normal',
                validator(value) {
                    return [
                        'small',
                        'normal',
                        'large'
                    ].indexOf(value) > -1;
                }
            }
        },
        data() {
            return {
                isThin: this.borderWidth === 1 || this.borderWidth === '1px'
            }
        },
        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        },
        computed: {
            thinBorder() {
                if (!(this.borderWidth === 1 || this.borderWidth === '1px')) return null;

                let br = this.sharp ? 0 : this.borderRadius, regBr;
                let dpr = window.devicePixelRatio;


                if (/^\d+$/.test(br)) {
                    br = br * dpr + 'px'
                } else if (!/%$/.test(br)) {
                    regBr = String(br).match(/(\d+)([a-zA-Z]+)/)
                    br = regBr[1] * dpr + regBr[2]
                }

                return {
                    borderRadius: br,
                    borderColor: this.borderColor
                }
            },
            styles() {
                let h = MNumber.cmpUnit(this.height),
                    w = MNumber.cmpUnit(this.width),
                    br = this.sharp ? 0 : this.borderRadius,
                    fs = this.fontSize,
                    size = this.size

                let o = {
                    height: h,
                    lineHeight: h,
                    borderWidth: !this.isThin ? this.borderWidth || null : null,
                    borderColor: !this.isThin ? this.borderColor : null,
                    width: w,
                    fontSize: /^\d+$/.test(fs) ? fs + 'px' : (fs || null),
                    backgroundColor: this.ghost ? 'transparent' : this.bgColor,
                    color: this.fontColor,
                    borderRadius: /^\d+$/.test(br) ? br + 'px' : br
                }

                return o
            }
        },
        mounted() {

        }
    };
</script>

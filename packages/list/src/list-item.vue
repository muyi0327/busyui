<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-list-item {
        font-size: 14px;
        color: #666;
        width: inherit;

        &__label,
        &__icon,
        &__content {
            height: inherit;
        }

        &__label_text {
            font-weight: 500;
        }

        &__content_text {
            color: #999;
        }
    }
</style>

<template>
    <bee-flexbox class="bee-list-item bee-border-1px bee-border-b" :style="styles" @click="handleClick">
        <bee-flexitem v-if="showLabel" :style="labelStyle" :flex="labelFlex" @click="handleLabelClick" :class="labelClass">
            <slot name="label"><label class="bee-list-item__label_text">{{label}}</label></slot>
        </bee-flexitem>
        <bee-flexitem class="bee-list-item__content bee-flex bee-flex--start-center">
            <slot>
                <div class="bee-list-item__content_text">{{content}}</div>
            </slot>
        </bee-flexitem>
        <bee-flexitem v-if="showIcon" :style="iconStyle" :flex="iconFlex" @click="handleIconClick" :class="iconClass">
            <slot name="icon">
                <bee-icon v-show="icon.type" :type="icon.type" :fill="icon.fill" :width="icon.width" :height="icon.height" :style="iconStyle"></bee-icon>
            </slot>
        </bee-flexitem>
    </bee-flexbox>
</template>

<script>
    import { FlexBox, FlexItem } from '../../flexbox';
    import Icon from '../../icon';


    var iconProps = {
        fill: '#c0c0c0',
        width: 18,
        height: 18,
        type: 'right'
    }

    export default {
        name: 'bee-list-item',
        props: {
            height: {
                type: [Number, String],
                default: 42
            },
            label: String,
            content: String,
            labelWidth: {
                type: [Number, String],
                default: 80
            },
            labelAlignH: {
                type: String,
                default: 'start'
            },
            labelAlignV: {
                type: String,
                default: 'center'
            },

            labelStyle: Object,

            showLabel: {
                type: Boolean,
                default: true
            },

            iconWidth: {
                type: [Number, String],
                default: 28
            },
            iconAlignH: {
                type: String,
                default: 'center'
            },
            iconAlignV: {
                type: String,
                default: 'center'
            },

            iconStyle: Object,

            showIcon: {
                type: Boolean,
                default: true
            },
            icon: {
                type: Object,
                default: function () {
                    return iconProps;
                }
            },
        },
        data() {
            return {
                _icon: this.icon
            }
        },
        components: {
            [FlexBox.name]: FlexBox,
            [FlexItem.name]: FlexItem,
            [Icon.name]: Icon
        },
        computed: {
            styles() {
                return {
                    height: /^\d+$/.test(String(this.height)) ? this.height + 'px' : this.height
                }
            },
            labelFlex() {
                return `0 0 ${this.labelWidth}px`
            },
            iconFlex() {
                return `0 0 ${this.iconWidth}px`
            },
            labelClass() {
                let ah = this.labelAlignH, av = this.labelAlignV;
                return ['bee-list-item__label', `bee-flex bee-flex--${ah}-${av}`]
            },
            iconClass() {
                let ah = this.iconAlignH, av = this.iconAlignV;
                return ['bee-list-item__icon', `bee-flex bee-flex--${ah}-${av}`]
            }
        },
        watch: {
            icon(val) {
                this._icon = Object.assign(iconProps, val || {})
            }
        },
        methods: {
            handleLabelClick($evt) {
                this.$emit('label-click', $evt)
            },
            handleIconClick($evt) {
                this.$emit('icon-click', $evt)
            },
            handleClick($evt) {
                this.$emit('click', $evt)
            }
        }
    }
</script>

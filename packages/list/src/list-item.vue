<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-list-item {
        font-size: 14px;
        color: #666;
        width: inherit;

        &__label,
        &__icon,
        &__content {
            height: inherit;
        }

        &__label {
            margin-right: 8px;
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
    <FlexBox :class="`${prefixCls}-list-item ${prefixCls}-border-1px ${prefixCls}-border-b`" :style="styles" @click="handleClick">
        <FlexItem :class="labelClass" v-if="showLabel" flex="none" :width="labelWidth" @click="handleLabelClick">
            <slot name="label"><label :class="`${prefixCls}-list-item__label_text`">{{label}}</label></slot>
        </FlexItem>
        <FlexItem :class="`${prefixCls}-list-item__content`" :flexible="true" align-cross="center">
            <slot>
                <div :class="`${prefixCls}-list-item__content_text`">{{content}}</div>
            </slot>
        </FlexItem>
        <FlexItem :class="iconClass" v-if="showIcon" flex="none" :width="iconWidth" @click="handleIconClick">
            <slot name="icon">
                <Icon v-show="iconModel.name" v-bind="iconModel" />
            </slot>
        </FlexItem>
    </FlexBox>
</template>

<script>
    import { FlexBox, FlexItem } from '../../flexbox'
    import Icon from '../../icon'
    import { initName, BNumber, baseMixins } from '../../util'

    var iconProps = {
        color: '#c0c0c0',
        width: 18,
        height: 18,
        name: 'right'
    }

    export default {
        name: initName('list-item'),
        mixins: [baseMixins],
        props: {
            height: {
                type: [Number, String],
                default: 42
            },
            label: String,
            content: String,
            labelWidth: {
                type: [Number, String],
                default: 'auto'
            },
            labelAlignH: {
                type: String,
                default: 'start'
            },
            labelAlignV: {
                type: String,
                default: 'center'
            },
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
            showIcon: {
                type: Boolean,
                default: true
            },
            icon: {
                type: Object
            }
        },
        data() {
            return {
                iconModel: { ...iconProps, ...this.icon }
            }
        },
        components: {
            FlexBox,
            FlexItem,
            Icon
        },
        computed: {
            styles() {
                return {
                    height: BNumber.cmpUnit(this.height)
                }
            },
            labelClass() {
                let { prefixCls, labelAlignH, labelAlignV } = this
                return [
                    `${prefixCls}-list-item__label`,
                    `${prefixCls}-flex`,
                    `${prefixCls}-flex--${labelAlignH}-${labelAlignV}`
                ]
            },
            iconClass() {
                let { prefixCls, iconAlignH, iconAlignV } = this
                return [
                    `${prefixCls}-list-item__icon`,
                    `${prefixCls}-flex`,
                    `${prefixCls}-flex--${iconAlignH}-${iconAlignV}`
                ]
            }
        },
        watch: {
            icon(val) {
                this._icon = { ...iconProps, ...val }
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

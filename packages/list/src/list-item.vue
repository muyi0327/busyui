<style lang="scss">
    .wui-list-item {
        display: block;
        font-size: 14px;
        color: #666;
        .wui-list-item-wrap {
            width: 100%;
        }

        .wui-field-label {
            font-weight: 500;
        }

        .list-item-content-text {
            color: #999;
        }

        /* &:active::after{
            content:' ';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color:rgba(#000, 0.1);
        } */
    }
</style>

<template>
    <div class="wui-list-item wui-border-1px wui-border-b" @click="handleClick">
        <w-row class="wui-list-item-wrap" :style="styles">
            <w-cell v-if="showLabel" :style="labelStyle" :width="labelWidth" :align="labelAlign" :vertical="labelVertical" @click="handleLabelClick" class="wui-list-item-label-wrap">
                <slot name="label"><label class="wui-field-label">{{label}}</label></slot>
            </w-cell>
            <w-cell class="wui-list-item-content" vertical="middle">
                <slot name="content">
                    <div class="list-item-content-text">{{content}}</div>
                </slot>
            </w-cell>
            <w-cell v-if="showIcon" :style="iconStyle" :width="iconWidth" :vertical="iconVertical" :align="iconAlign" @click="handleIconClick">
                <slot name="icon">
                    <w-icon v-show="icon.type" :type="icon.type" :fill="icon.fill" :width="icon.width" :height="icon.height" :style="iconStyle"></w-icon>
                </slot>
            </w-cell>
        </w-row>
    </div>
</template>

<script>
    import {
        Cell,
        Row
    } from '../../layout';

    var iconProps = {
        fill: '#c0c0c0',
        width: 18,
        height: 18,
        type: 'right'
    }

    export default {
        name: 'w-list-item',
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
            labelAlign: {
                type: String,
                default: 'left'
            },
            labelVertical: {
                type: String,
                default: 'middle'
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
            iconAlign: {
                type: String,
                default: 'center'
            },
            iconStyle: Object,
            iconVertical: String,
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
        data(){
            return {
                _icon: this.icon
            }
        },
        components: {
            'w-row': Row,
            'w-cell': Cell
        },
        computed: {
            styles() {
                return {
                    height: /^\d+$/.test(String(this.height)) ? this.height + 'px' : this.height
                }
            }
        },
        watch:{
            icon(val){
                this._icon = Object.assign(iconProps, val||{})
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

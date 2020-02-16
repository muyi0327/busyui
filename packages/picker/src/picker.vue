<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-picker {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 40px;
        z-index: 1;
        color: #222;
        user-select: none;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

        &__header {
            height: 40px;
            background: #f1f2f4;
            display: flex;
            line-height: 40px;
            font-size: 18px;
            border: 1px solid #e0e0e0;
            border-width: 1px 0;
        }

        &__title {
            flex: 1;
            padding-left: 10px;
        }

        &__cancel,
        &__confirm {
            color: $color-blue;
            flex: none;
            padding: 0 10px;
        }

        &__box {
            height: 6em;
            background: #eeeeee;
            position: relative;
            overflow: hidden;
            display: flex;
            box-sizing: border-box;
            padding: 0.5em 0;

            &::after {
                position: absolute;
                pointer-events: none;
                z-index: 1;
                left: 0;
                top: 2.5em;
                right: 0;
                content: "";
                border: 1px solid #ccc;
                border-width: 1px 0;
                box-sizing: border-box;
                height: 1em;
            }
        }

        &__wheel {
            flex: 1;
            padding: 0;
            margin: 0;
            font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

            &-list {
                height: 1em;
                transform-style: preserve-3d;
                margin-top: 2em;
            }
        }

        &__item {
            backface-visibility: hidden;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            list-style: none;
            height: 1em;
            line-height: 1em;
            color: #222;
            text-align: center;
            padding: 0;
            margin: 0;
            width: 100%;

            > p {
                padding: 0;
                margin: 0;
                height: 100%;
                width: 100%;
                font-size: 18px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }

        &__transition {
            transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1);
        }

        &__mask_top {
            flex: none;
            top: 0;
            height: 2.5em;
            width: 100%;
            position: absolute;
            z-index: 1;
            pointer-events: none;
            background-image: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0.4)
            );
        }

        &__mask_bottom {
            flex: none;
            bottom: 0;
            height: 2.5em;
            width: 100%;
            position: absolute;
            z-index: 1;
            pointer-events: none;
            background-image: linear-gradient(
                to top,
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0.4)
            );
        }
    }
</style>

<template>
    <NativeMask :is-show="visiable">
        <transition :name="`${prefixCls}-animate--bibo`">
            <div v-show="visiable" :class="`${prefixCls}-picker`">
                <div :class="`${prefixCls}-picker__header`">
                    <span v-if="needConfirm" :class="`${prefixCls}-picker__cancel`" @click="cancel">取消</span>
                    <span :class="`${prefixCls}-picker__title`">{{title}}</span>
                    <span v-if="needConfirm" :class="`${prefixCls}-picker__confirm`" @click="confirm">确定</span>
                    <span v-else :class="`${prefixCls}-picker__confirm`" @click="cancel">
                        <Icon name="close" color="#999" width="20" height="20" />
                    </span>
                </div>
                <div :class="`${prefixCls}-picker__box`">
                    <slot>
                        <Wheel v-for="(col,$i) in columns" :key="$i" :index="$i" :datas="col" v-model="cacheValue"></Wheel>
                    </slot>
                    <div :class="`${prefixCls}-picker__mask_top`"></div>
                    <div :class="`${prefixCls}-picker__mask_bottom`"></div>
                </div>
            </div>
        </transition>
    </NativeMask>
</template>


<script>
    import Mask from '../../mask'
    import Icon from '../../icon'
    import Wheel from './picker-wheel.vue'
    import { initName, baseMixins } from '../../util'

    export default {
        name: initName('picker'),
        mixins: [baseMixins],
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            columns: {
                type: Array
            },
            value: [Array, String, Object, Number],
            isShow: {
                type: Boolean,
                default: false
            },
            needConfirm: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                currentValue: this.value,
                visiable: this.isShow,
                cacheValue: []
            }
        },
        components: {
            NativeMask: Mask,
            Wheel,
            Icon
        },
        watch: {
            isShow(val) {
                this.visiable = val
            },
            visiable(val) {
                this.$emit('visiable', val)
            },
            currentValue(val) {
                if (!this.needConfirm) {
                    this.$emit('change', val)
                }
            },
            cacheValue(val) {
                console.log(val)
            }
        },
        methods: {
            confirm() {
                this.hide()
                this.currentValue = this.cacheValue
                this.$emit('change', this.currentValue)
            },
            cancel() {
                this.initCache()
                this.hide()
            },
            hide() {
                this.visiable = false
            },
            initCache() {
                this.cacheValue = Array.isArray(this.currentValue) ? [...this.currentValue] : this.currentValue
            }
        },
        mounted() {
            this.cacheValue = Array.isArray(this.currentValue) ? [...this.currentValue] : this.currentValue
        }
    }
</script>



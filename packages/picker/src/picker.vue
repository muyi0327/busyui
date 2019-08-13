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
        }

        &__cancel,
        &__confirm {
            color: $color-blue;
            flex: none;
            width: 60px;
            text-align: center;
        }

        &__box {
            height: 5em;
            background: #eeeeee;
            position: relative;
            overflow: hidden;
            display: flex;

            &::after {
                position: absolute;
                pointer-events: none;
                z-index: 1;
                left: 0;
                top: 40%;
                right: 0;
                content: "";
                border: 1px solid #ccc;
                border-width: 1px 0;
                box-sizing: border-box;
                height: 20%;
            }
        }

        &__wheel {
            flex: 1;
            padding: 0;
            margin: 0;
            font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        &__item {
            list-style: none;
            height: 1em;
            color: #222;
            text-align: center;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            > span {
                font-size: 20px;
            }
        }

        &__transition {
            transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1);
        }

        &__mask_top {
            flex: none;
            flex: none;
            top: 0;
            bottom: 60%;
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
            flex: none;
            top: 60%;
            bottom: 0;
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
        <transition :name="`${prefixCls}-animation--bibo`">
            <div v-show="visiable" :class="`${prefixCls}-picker`">
                <div :class="`${prefixCls}-picker__header`">
                    <span :class="`${prefixCls}-picker__cancel`" @click="cancel">取消</span>
                    <span :class="`${prefixCls}-picker__title`"></span>
                    <span :class="`${prefixCls}-picker__confirm`" @click="confirm">确定</span>
                </div>
                <div :class="`${prefixCls}-picker__box`">
                    <slot>
                        <Wheel v-for="(col,$i) in columns" :key="$i" :value="currentValue && currentValue[$i]" :index="$i" :items="col" @change="(()=>(val)=>handleChange(val,$i))()"></Wheel>
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
    import { FlexBox, FlexItem } from '../../flexbox'
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
            value: Array,
            isShow: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                currentValue: this.value,
                visiable: this.isShow
            }
        },
        components: {
            NativeMask: Mask,
            Wheel
        },
        watch: {
            value(val) {
                this.currentValue = val
            },
            isShow(val) {
                this.visiable = val
            },
            visiable(val) {
                this.$emit('visiable', val)
            }
        },
        methods: {
            handleChange(val, i) {
                // 解除引用关联
                let v = this.currentValue.slice()
                v.splice(i, 1, val)
                this.currentValue = v
            },
            confirm() {
                this.hide()
                this.$emit('change', this.currentValue)
            },
            cancel() {
                this.hide()
            },
            hide() {
                this.visiable = false
            }
        },
        mounted() {

        }
    }
</script>



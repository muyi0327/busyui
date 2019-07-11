<style lang="scss" scoped>
    @import "../../../src/style/variable";

    .#{$prefixCls}-picker {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 20px;
        z-index: 1;
        color: #333;

        &__header {
            height: 40px;
            background: #f1f2f4;
            display: flex;
            line-height: 40px;
            font-size: 0.9em;
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

        &__wrap {
            height: 10em;
            background: #d5d8df;
            position: relative;
            overflow: hidden;
        }

        &__box {
            display: flex;
            flex-direction: row;
            height: 100%;
        }

        &__column {
            flex: 1;
            text-align: center;
            position: relative;
            height: 100%;
            overflow: hidden;
        }

        &__scroll {
            height: 100%;
            width: 1005px;
            position: absolute;
            z-index: 1;
            transform: translateZ(0);
            user-select: none;
            text-size-adjust: none;
        }

        &__item {
            height: 2em;
            line-height: 2em;
            > span {
                font-size: 0.8em;
            }
        }

        &__mask {
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-image: linear-gradient(
                    to bottom,
                    rgba(#ccc, 0.5) 25%,
                    transparent 70%
                ),
                linear-gradient(to top, rgba(#ccc, 0.5) 25%, transparent 70%);
            background-size: 100% 4em;
            background-position: top, bottom;
            background-repeat: no-repeat;
            transform: translateZ(0px);

            &::after {
                content: "";
                position: absolute;
                z-index: 1;
                height: 2em;
                border: 1px solid #bbb;
                border-width: 1px 0;
                width: 100%;
                top: 4em;
                box-sizing: border-box;
            }
        }
    }
</style>

<template>
    <busy-mask :is-show="true">
        <div :class="`${prefixCls}-picker`">
            <div :class="`${prefixCls}-picker__header`">
                <span :class="`${prefixCls}-picker__cancel`">取消</span>
                <span :class="`${prefixCls}-picker__title`"></span>
                <span :class="`${prefixCls}-picker__confirm`">确定</span>
            </div>
            <div :class="`${prefixCls}-picker__wrap`" id="wrapper">
                <div :class="`${prefixCls}-picker__box`">
                    <div :class="`${prefixCls}-picker__column`">
                        <div :class="`${prefixCls}-picker_scoll`" id="aa">
                            <div :class="`${prefixCls}-picker__item`" v-for="col in cols" :key="col">
                                <span>{{col}}</span>
                            </div>
                        </div>
                    </div>
                    <div :class="`${prefixCls}-picker__column`">
                        <div :class="`${prefixCls}-picker__item`" v-for="col in cols" :key="col">
                            <span>{{col}}</span>
                        </div>
                    </div>
                </div>
                <div :class="`${prefixCls}-picker__mask`"></div>
            </div>
        </div>
    </busy-mask>
</template>


<script>
    import Mask from '../../mask'
    import { FlexBox, FlexItem } from '../../flexbox'
    import { initName, baseMixins } from '../../util'

    export default {
        name: initName('picker'),
        mixins: [baseMixins],
        props: {
            columns: {
                type: Array
            }
        },
        data() {
            return {
                cols: ['选项xx', '选项xx', '选项xx', '选项xx', '选项xx', '选项xx', '选项xx']
            }
        },
        components: {
            [Mask.name]: Mask
        },
        mounted() {

        }
    }
</script>



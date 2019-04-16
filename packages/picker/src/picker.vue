<style lang="scss" scoped>
    @import "../../../src/style/variable";

    .#{$prefixClass}-picker {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 20px;
        z-index: 1;

        &__title {
            height: 40px;
            background: #bbb;
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
                font-size: 16px;
                font-weight: bold;
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
                    rgba(255, 255, 255, 0.7),
                    rgba(255, 255, 255, 0.3)
                ),
                linear-gradient(
                    to top,
                    rgba(255, 255, 255, 0.7),
                    rgba(255, 255, 255, 0.3)
                );
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
        <div class="busy-picker">
            <div class="busy-picker__title"></div>
            <div class="busy-picker__wrap" id="wrapper">
                <div class="busy-picker__box">
                    <div class="busy-picker__column">
                        <div class="busy-picker_scoll" id="aa">
                            <div class="busy-picker__item" v-for="col in cols" :key="col">
                                <span>{{col}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="busy-picker__column">
                        <div class="busy-picker__item" v-for="col in cols" :key="col">
                            <span>{{col}}</span>
                        </div>
                    </div>
                </div>
                <div class="busy-picker__mask"></div>
            </div>
        </div>
    </busy-mask>
</template>


<script>
    import AlloyTouch from './alloytouch.js'
    import Mask from '../../mask'
    import { FlexBox, FlexItem } from '../../flexbox'

    export default {
        name: 'busy-picker',
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
            var at = new AlloyTouch({
                touch: "#wrapper",//反馈触摸的dom
                vertical: true,//不必需，默认是true代表监听竖直方向touch
                target: document.getElementById('aa'), //运动的对象
                property: "translateY",  //被滚动的属性
                step: 5,
                animationEnd: function (value) {
                    //console.log(value);
                },
                pressMove: function (evt, value) {
                    //console.log(evt.deltaX + "_" + evt.deltaY + "__" + value);
                }
            })
        }
    }
</script>



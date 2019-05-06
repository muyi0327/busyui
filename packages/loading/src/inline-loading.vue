<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-inline-loading {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        &__spinner {
            font-size: 0;
            line-height: 0;
            margin-right: 10px;
        }

        &__text {
            color: #222222;
            font-size: inherit;
        }

        &--column {
            flex-direction: column;
        }

        &--column &__spinner {
            margin-right: 0;
            margin-bottom: 10px;
        }
    }
</style>
<template>
    <transition name="busy-animate--fade" v-on:after-leave="_leave">
        <div class="busy-inline-loading" v-show="visiable" :class="[classes]">
            <div class="busy-inline-loading__spinner">
                <Spinner v-bind="spinnerProps"></Spinner>
            </div>
            <div class="busy-inline-loading__text" :style="textStyle">
                <slot>{{text}}</slot>
            </div>
        </div>
    </transition>
</template>
<script>
    import Spinner from '../../spinner'
    import { BNumber } from '../../util'

    /**
     * loading component
     * @module Loading
     * @desc loading component with mask
     * @see {@link ../example/all/loading.html 实例}
     * @param {Number} spinnerSize=30 - spinner直径
     * @param {Number} spinnerStroke=3 - spinner描边宽度
     * @param {Number} spinnerType=6 - spinner类型 0-6
     * @param {Number} spinnerWidth - spinner宽度
     * @param {Number} spinnerHeight - spinner高度
     * @param {String} color=#478f05 - spinner以及text颜色
     * @param {String} bgColor=rgba(255, 255, 255, 0.9) - spinner以及text颜色
     * @param {String} text - 加载文字提示
     * @param {Boolean} isShow=false - 显示隐藏
     * @param {Boolean} isRemove=false - 隐藏后是否清除
     * 
     * @example
     *  <busy-loading>正在加载...</busy-loading>
     */
    export default {
        name: 'busy-inline-loading',
        props: {
            spinnerType: {
                type: String
            },
            spinnerWidth: {
                type: [String, Number],
                default: 24
            },
            spinnerHeight: {
                type: [String, Number],
                default: 24
            },
            color: {
                type: String,
                default: '#222222'
            },
            text: {
                type: String,
                default: ''
            },
            fontSize: {
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
            direction: {
                type: String
            }
        },
        data() {
            return {
                visiable: this.isShow
            }
        },
        components: {
            Spinner
        },
        methods: {
            show() {
                this.visiable = true;
                this.$emit('show');
            },
            hide() {
                this.visiable = false;
                this.$emit('hide');
            },
            _leave() {
                // 动画结束，清除元素
                if (this.isRemove) {
                    this.$destroy();
                    this.$el.remove();
                }
            }
        },
        computed: {
            classes() {
                return {
                    'busy-inline-loading--column': this.direction === 'column'
                }
            },
            spinnerProps() {
                let { spinnerType, spinnerWidth, spinnerHeight, color } = this
                return {
                    type: spinnerType,
                    width: BNumber.cmpUnit(spinnerWidth),
                    height: BNumber.cmpUnit(spinnerHeight),
                    color
                }
            },
            textStyle() {
                let { color, fontSize } = this
                return {
                    color,
                    fontSize: BNumber.cmpUnit(fontSize)
                }
            }
        },
        watch: {
            isShow(val) {
                this.visiable = val;
                this.$emit('visiable-change', val);
            }
        },
        mounted() {
            console.log(this.color)
        }
    }
</script>

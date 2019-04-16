<style lang="scss">
    @import "../../../src/style/variable";
    @import "../../../src/style/animate";

    .#{$prefixClass}-mask {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        opacity: 1;
    }
</style>

<template>
    <transition name="busy-animate--fade" v-on:after-leave="_leave">
        <div v-show="visiable" @touchmove="handleTouchmove" class="busy-mask" v-on:click="handleClick" :style="styles">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    /**
     * @busy/mask
     * @module Mask
     * @desc 半透明遮罩层 <busy-mask></busy-mask>
     * @param {String} color=rgba(0,0,0, 0.6) - 遮罩颜色, css color
     * @param {Boolean} isRemove=false - 是否隐藏动画完成从dom中清除
     * @param {Boolean} isShow=false - 显示隐藏
     * @example 
     *      <busy-mask color="yellow"></busy-mask>
     **/
    export default {
        name: 'busy-mask',
        props: {
            color: {
                type: String,
                default: 'rgba(0,0,0, 0.6)'
            },
            isRemove: {
                type: Boolean,
                default: false
            },
            isShow: {
                type: Boolean,
                default: false
            },
            zIndex: {
                type: Number,
                default: 1000
            }
        },
        data() {
            return {
                visiable: this.isShow
            }
        },
        computed: {
            styles() {
                return {
                    backgroundColor: this.color,
                    zIndex: this.zIndex
                }
            }
        },
        watch: {
            isShow(val) {
                this.visiable = val;
                this.$emit(val ? 'show' : 'hide');
            }
        },
        methods: {
            show() {
                this.visiable = true;
            },
            hide() {
                this.visiable = false;
            },
            _leave() {
                // 动画结束，清除元素
                if (this.isRemove) {
                    this.$destroy();
                    this.$el.parentNode.removeChild(this.$el);
                }
            },
            handleClick($evt) {
                this.$emit('click', $evt);
            },
            handleTouchmove($evt) {
                $evt && $evt.preventDefault && $evt.preventDefault();
                this.$emit('touchmove', $evt);
            }
        }
    }
</script>

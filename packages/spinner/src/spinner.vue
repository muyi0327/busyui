
<style lang="scss">
    .busy-spinner {
        display: inline-block;
    }
</style>
<template>
    <div class="busy-spinner">
        <busy-line-spin-fade v-if="type === 0" :color="color" :width="width" :height="height"></busy-line-spin-fade>
        <busy-line-scale-pulse-out v-if="type === 1" :color="color" :width="width" :height="height"></busy-line-scale-pulse-out>
        <busy-ball-spin-fade v-if="type === 2" :color="color" :width="width" :height="height"></busy-ball-spin-fade>
        <busy-ball-scale-multiple v-if="type === 3" :color="color" :width="width" :height="height"></busy-ball-scale-multiple>
        <busy-ball-beat v-if="type === 4" :color="color" :width="width" :height="height"></busy-ball-beat>
        <busy-ball-clip-rotate-pulse v-if="type === 5" :color="color" :width="width" :height="width"></busy-ball-clip-rotate-pulse>
        <busy-circle-rotate v-if="type === 6" :color="color" :height="height" :width="width" :stroke-width="strokeWidth"></busy-circle-rotate>
    </div>
</template>

<script>
    /**
     * busy-spinner
     * @module Spinner
     * @see {@link ../example/all/spinner.html 实例}
     * @desc spinner组件
     * @param {Number} type=0 - spinner动画类型,取值 0-6
     * @param {Number} width=32 - spinner宽度
     * @param {Number} height=32 - spinner高度
     * @param {String} color="#ffffff" - spinner颜色, css color
     * @param {Number} size=50 - circle rotae直径
     * @param {Number} strokeWidth=5 - circle rotate 描边宽度
     * 
     * @example
     *
     *  <busy-spinner :type="3" color="#666" :width="12"></busy-spinner>
     *
     */
    export default {
        name: 'busy-spinner',
        props: {
            type: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 24
            },
            width: {
                type: Number,
                default: 24
            },
            color: {
                type: String,
                default: ''
            },
            strokeWidth: {
                type: Number,
                default: 3
            },
            size: {
                type: Number,
                default: 50
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        watch: {
            visiable(val, old) {
                this.$emit('visiable-change', val);
            }
        }
    }
</script>

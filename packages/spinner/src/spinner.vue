
<style lang="scss">
    .bee-spinner {
        display: inline-block;
    }
</style>
<template>
    <div class="bee-spinner">
        <bee-line-spin-fade v-if="type === 0" :color="color" :width="width" :height="height"></bee-line-spin-fade>
        <bee-line-scale-pulse-out v-if="type === 1" :color="color" :width="width" :height="height"></bee-line-scale-pulse-out>
        <bee-ball-spin-fade v-if="type === 2" :color="color" :width="width" :height="height"></bee-ball-spin-fade>
        <bee-ball-scale-multiple v-if="type === 3" :color="color" :width="width" :height="height"></bee-ball-scale-multiple>
        <bee-ball-beat v-if="type === 4" :color="color" :width="width" :height="height"></bee-ball-beat>
        <bee-ball-clip-rotate-pulse v-if="type === 5" :color="color" :width="width" :height="width"></bee-ball-clip-rotate-pulse>
        <bee-circle-rotate v-if="type === 6" :color="color" :height="height" :width="width" :stroke-width="strokeWidth"></bee-circle-rotate>
    </div>
</template>

<script>
    /**
     * bee-spinner
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
     *  <bee-spinner :type="3" color="#666" :width="12"></bee-spinner>
     *
     */
    export default {
        name: 'bee-spinner',
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


<style lang="scss">
    .busy-spinner {
        display: inline-block;
    }
</style>
<template>
    <div class="busy-spinner">
        <CircleLine v-bind="$props" v-if="type==='circle-line'"></CircleLine>
        <CircleDash v-bind="$props" v-else-if="type==='circle-dash'"></CircleDash>
        <CircleGradient v-bind="$props" v-else-if="type==='circle-gradient'"></CircleGradient>
        <CircleRotate v-bind="$props" v-else-if="type==='circle-rotate'"></CircleRotate>
        <CircleHalf v-bind="$props" v-else="type==='circle-half'"></CircleHalf>
    </div>
</template>

<script>
    import CircleDash from './circle-dash.vue'
    import CircleGradient from './circle-gradient.vue'
    import CircleLine from './circle-line.vue'
    import CircleRotate from './circle-rotate.vue'
    import CircleHalf from './circle-half.vue'

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
                type: String,
                default: 'circle-line'
            },
            height: {
                type: [Number, String],
                default: 64
            },
            width: {
                type: [Number, String],
                default: 64
            },
            color: {
                type: String
            },
            strokeWidth: [Number, String]
        },
        data() {
            return {
                visiable: true
            }
        },
        components: {
            CircleDash,
            CircleGradient,
            CircleLine,
            CircleRotate,
            CircleHalf
        },
        watch: {
            visiable(val, old) {
                this.$emit('visiable-change', val);
            }
        }
    }
</script>

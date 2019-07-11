<template>
    <div class="busy-progress" v-on:click="handleClick">
        <ProgressLine ref="child-line" v-if="type==='line'" v-bind="lineModel">
            <template slot="start">
                <slot name="start"></slot>
            </template>

            <template slot="end">
                <slot name="end"></slot>
            </template>
        </ProgressLine>
        <ProgressRing ref="child-ring" v-if="type==='ring'" v-bind="ringModel">
            <slot>11111</slot>
        </ProgressRing>
    </div>
</template>

<script>
    import ProgressLine from './progress-line.vue'
    import ProgressRing from './progress-ring.vue'
    import { initName, BNumber } from '../../util'
    import mixins from './mixins'

    /**
     * @module Progress
     * @see {@link ../example/all/progress.html 实例}
     * @des 进度条组件
     * @param {Number} size - 环形组件直径大小,默认 100<px>
     * @param {Number | String} width - 线形组件长度,默认 100%
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color <hex, rgb, rgba>
     * @param {String} lineColor - 进度条颜色, 取值范围 css color <hex, rgb, rgba>
     * @param {String} content - 显示内容, 默认''
     * @param {String} type - 进度条组件类型, 可取值 'line', 'ring', 默认 'line'
     **/
    export default {
        name: initName('progress'),
        mixins: [mixins],
        props: {
            size: {
                type: Number,
                default: 80
            },
            direction: String,
            type: {
                type: String,
                default: 'line'
            },
            height: {
                type: [Number, String]
            },
            width: {
                type: [Number, String]
            }
        },
        components: {
            ProgressLine,
            ProgressRing
        },
        computed: {
            lineModel() {
                let { width, height, lineColor, trackWidth, trackColor, value } = this
                return {
                    width,
                    height,
                    lineColor,
                    trackWidth,
                    trackColor,
                    value
                }
            },
            ringModel() {
                let { size, lineColor, trackWidth, trackColor, value, direction, linecap } = this
                return {
                    size,
                    lineColor,
                    trackWidth,
                    trackColor,
                    value,
                    direction,
                    linecap
                }
            }
        }
    }
</script>

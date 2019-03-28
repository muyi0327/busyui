<template>
    <div class="wui-progress" v-on:click="handleClick">
        <w-progress-line ref="child-line" v-if="type==='line'"
            :width="width"
            :bar-color="barColor"
            :track-color="trackColor"
            :track-width="trackWidth" 
            :percent="percent"
            :show-text="showText"
            :duration="duration"></w-progress-line>
        <w-progress-ring ref="child-ring" v-if="type==='ring'" 
            :size="size" 
            :bar-color="barColor"
            :track-color="trackColor"
            :track-width="trackWidth" 
            :percent="percent"
            :direction="direction"
            :show-text="showText"
            :duration="duration">{{mycontent}}</w-progress-ring>
    </div>
</template>

<script>
    import ProgressLine from './progress-line.vue';
    import ProgressRing from './progress-ring.vue';

    /**
     * wui-progress
     * @module Progress
     * @see {@link ../example/all/progress.html 实例}
     * @des 进度条组件
     * @param {Number} size - 环形组件直径大小,默认 100<px>
     * @param {Number | String} width - 线形组件长度,默认 100%
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color <hex, rgb, rgba>
     * @param {String} barColor - 进度条颜色, 取值范围 css color <hex, rgb, rgba>
     * @param {String} content - 显示内容, 默认''
     * @param {String} type - 进度条组件类型, 可取值 'line' [<w-progress-line />], 'ring' [<w-progress-ring />], 默认 'line'
     * @example
     *      <w-progress type="ring" :size="50" :track-width="5"></w-progress>
     **/
    export default {
        name: 'w-progress',
        props:{
            size: {
                type: Number,
                default: 80
            },
            width: {
                type: [Number, String],
                default: '100%'
            },
            trackColor: {
                type: [Array,String],
                default:''
            },
            barColor: {
                type: [Array,String],
                default:''
            },
            trackWidth: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 500
            },
            content: {
                type: String,
                default: ''
            },
            direction: String,
            percent:{
                default:0,
                validator(val){
                    return typeof val === 'number' && val >=0 && val <= 100;
                }
            },
            type: {
                type: String,
                default: 'line'
            },
            showText: {
                type: Boolean,
                default: false
            }
        },
        component:{
            'w-progress-line': ProgressLine,
            'w-progress-ring': ProgressRing
        },
        watch:{
            percent(){
                this.$emit('percent-change', this.percent);
            }
        },
        mounted(){
            this.$emit('percent-change', this.percent);
        },
        methods:{
            handleClick($evt){
                this.$emit('click', $evt);
            }
        }
    }
</script>

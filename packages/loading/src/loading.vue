<style lang="scss">
    @import '../../../src/style/variable.scss';
    .wui-loading {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 1200;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 1;
        transform-origin: center center;
        transform: scale(1, 1);
        .wui-loading-text {
            margin-top: 12px;
            color: $color-blue;
            font-size: 12px;
        }
    }
    
    .loading-fade-enter,
    .loading-fade-leave-active {
        opacity: 0;
    }
    
    .loading-fade-leave-active,
    .loading-fade-enter-active {
        transition: all 0.3s ease;
    }
</style>
<template>
    <transition name="loading-fade" v-on:after-leave="_leave">
        <div class="wui-loading" :style="styles" v-show="visiable">
            <div class="wui-loading-spinner">
                <w-spinner :type="spinnerType" :color="color" :width="spinnerWidth" :height="spinnerHeight" :size="spinnerSize" :stroke-width="spinnerStroke"></w-spinner>
            </div>
            <div class="wui-loading-text" :style="{color:color,fontSize:fontSize+'px'}">
                <slot>{{text}}</slot>
            </div>
        </div>
    </transition>
</template>
<script>
    import Spinner from '../../spinner';

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
     * @param {Boolean} fullPage=false - 是否全屏显示
     * @param {Boolean} isShow=false - 显示隐藏
     * @param {Boolean} isRemove=false - 隐藏后是否清除
     * 
     * @example
     *  <w-loading>正在加载...</w-loading>
     */
    export default {
        name: 'w-loading',
        props: {
            spinnerSize: {
                type: Number,
                default: 30
            },
            spinnerStroke: {
                type: Number,
                default: 3
            },
            spinnerType:{
                type:Number,
                default:6
            },
            spinnerWidth:{
                type: [String, Number]
            },
            spinnerHeight:{
                type: [String, Number]
            },
            color: {
                type: String,
                default: ''
            },
            text:{
                type: String,
                default:''
            },
            fontSize: {
                type: Number,
                default:12
            },
            bgColor: {
                type: String,
                default: 'rgba(255, 255, 255, .8)'
            },
            fullPage: {
                type: Boolean,
                default: false
            },
            isShow: {
                type: Boolean,
                default: false
            },
            isRemove: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visiable: this.isShow
            }
        },
        components:{
            'w-spinner': Spinner
        },
        methods:{
            show(){
                this.visiable = true;
                this.$emit('show');
            },
            hide(){
                this.visiable = false;
                this.$emit('hide');
            },
            _leave(){
                // 动画结束，清除元素
                if (this.isRemove){
                    this.$destroy();
                    this.$el.parentNode.removeChild(this.$el);
                } 
            }
        },
        computed: {
            styles() {
                var s = {
                    backgroundColor: this.bgColor
                }

                if (this.fullPage) {
                    s.position = 'fixed';
                }
                return s;
            }
        },
        watch: {
            isShow(val) {
                this.visiable = val;
                this.$emit('visiable-change', val);
            }
        },
        mounted(){

        }
    }
</script>

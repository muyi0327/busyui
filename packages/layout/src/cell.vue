<style lang="scss">
    @import '../../../src/style/flex.scss';
    .wui-flex-cell{
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        >.wui-flex-row{
            flex: 1 0 100%;
        }

        >.wui-flex-col{
            flex-grow:1;
        }
    }
</style>

<template>
    <div class="wui-flex-cell" @click="handleClick" :class="classes" :style="[styles, cellStyles]">
        <slot></slot>
    </div>
</template>

<script>
    
    const _aligns = {
        left: 'l',
        right: 'r',
        center: 'c',
        between: 'sb',
        around: 'sa'
    }

    const _varticals = {
        top: 't',
        bottom: 'b',
        middle: 'm',
        between: 'sb',
        around: 'sa',
        stretch: 'st'
    }

    var reg = /^\d+(px|rem|em|%)?/;

    /**
     * wui-cell
     * @module Cell
     * @see {@link ../example/all/flex.html 实例}
     * @desc 单元组件 <w-cell></w-cell>, w-cell只能放在w-row或者w-row内
     * @param width='auto' - 列宽, 数字, 百分比, auto
     * @param height='auto' - 列高, 数字, 百分比, auto
     * @param align='left' - 水平对齐, left 居左, right 居右, center 居中, between 等间距, around 
     * @param vertical='middle' - 垂直对齐, top 居顶, bottom 居底, middle 居中, between 等间距, around, stretch
     *
     * @example
     * 
     * <w-row>
     *      <w-cell :width="90">手机号</w-cell>
     *      <w-cell><input type="number" name="phone" placehoder="请填写手机号码"></w-cell>
     *      <w-cell :width="40"><w-icon type＝"fankui"></w-icon></w-cell>
     * </w-row>
     */
    export default {
        name: 'w-cell',
        props: {
            width: {
                type: [Number, String],
                default: 'auto',
                validator(val){
                    var t = typeof val;
                    return t === 'number' || t === 'string' && (reg.test(val) || val==='auto');
                }
            },
            height: {
                type: [Number, String],
                default: 'auto',
                validator(val){
                    var t = typeof val;
                    return t === 'number' || t === 'string' && (reg.test(val) || val==='auto');
                }
            },
            align: {
                type: String,
                default: 'left'
            },
            vertical: {
                type: String,
                default: 'middle'
            },
            direction: String
        },
        data(){
           return{
               cellStyles:{}
           } 
        },
        /**
         * TODO 视情况处理flexGrow
         */
        computed: {
            styles(){
                var _styles = {};
                
                this.$nextTick(function () {
                    const $el = this.$parent.$el;
                    const isRow = $el.classList.contains('wui-flex-row');
                    const isCol = $el.classList.contains('wui-flex-col');

                    if(this.width !== 'auto'){
                        var w = /^\d+$/.test(this.width) ? this.width + 'px' : this.width;
                        if (isRow){
                            _styles['flex'] = '0 0 ' + w;
                            _styles['-webkit-flex'] = '0 0 ' + w;
                            _styles['-webkit-box-flex'] = 0;
                        }else{
                            _styles.width = w;
                        }
                    }

                    if(this.height !== 'auto'){
                        var h = /^\d+$/.test(this.height) ? this.height + 'px' : this.height;
                        if (isCol){
                            _styles['flex'] = '0 0 ' + h;
                            _styles['-webkit-flex'] = '0 0 ' + h;
                            _styles['-webkit-box-flex'] = 0;
                        }else{
                            _styles.height = h;
                        }
                    }

                    if (this.direction){
                        _styles.flexDirection = this.direction;
                    }

                    this.cellStyles = _styles;
                });
                
                return null;
            },
            classes(){
                var c = {};
                var ah = '', av='';
                
                ah =  _aligns[this.align];
                av = _varticals[this.vertical];

                c['wui-al-' + ah + av] = true;

                return c;
            }
        },
        
        methods:{
            handleClick($evt){
                this.$emit('click', $evt);
            }
        },
        mounted(){
            
        }
    }
</script>

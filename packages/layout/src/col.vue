<style lang="scss">
    @import '../../../src/style/flex.scss';
    .wui-flex-col{
        display: flex;
        box-sizing: border-box;
        height: 100%;

        >.wui-flex-cell{
            width: inherit;
        }
    }
</style>

<template>
    <div class="wui-flex-col" :class="classes" @click="handleClick" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
    
    /**
     * wui-col
     * @module Col
     * @see {@link ../example/all/flex.html 实例}
     * @desc 列组件 <w-col></w-col> w-col里面只能放w-cell
     * @param width='auto' - 列宽, 数字, 百分比, auto
     * @param direction='column' - 方向, 'normal' flex-direction: column, 'reverse' flex-direction: column-reverse;
     *
     * @example
     * 
     * <w-row>
     *      <w-cell :width="90">手机号</w-cell>
     *      <w-cell>
     *          <w-col>
     *              <w-cell><input type="number" name="phone" placehoder="请填写手机号码"></w-cell>
     *              <w-cell>请填写正确手机号码，确保能收到验证短信</w-cell>
     *          </w-col>
     *      </w-cell>
     *      <w-cell :width="40"><w-icon type＝"fankui"></w-icon></w-cell>
     * </w-row>
     */
    export default {
        name: 'w-col',
        props: {
            width: {
                type: [Number, String],
                default: 'inherit',
                validator(val){
                    var t = typeof val;
                    return t === 'number' || t === 'string' && (/^\d+/.test(val) || val==='inherit');
                }
            },
            direction: {
                type: String,
                default: 'column'
            }
        },
        computed: {
            styles(){
                var o = {};
                if (this.width!=='inherit'){
                    o.flexGrow = 0;
                    o.width = /^\d+$/.test(this.width) ? this.width + 'px' : this.width;
                    o.height = '100%';
                }

                return o;
            },
            classes(){
                var c = {};
                if (this.direction === 'reverse'){
                    c['wui-flex-dir-column-re'] = true;
                }

                if (this.direction === 'column'){
                    c['wui-flex-dir-column'] = true;
                }

                return c;
            }
        },
        methods:{
            handleClick($evt){
                this.$emit('click', $evt);
            }
        }
    }
</script>

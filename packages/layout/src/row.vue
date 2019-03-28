<style lang="scss">
    @import '../../../src/style/flex.scss';
    .wui-flex-row {
        display: flex;
        box-sizing: border-box;
        width: 100%;

        >.wui-flex-cell{
            height: inherit;
        }
    }
</style>

<template>
    <div class="wui-flex-row" :class="classes" @click="handleClick" :style="styles">
        <slot></slot>
    </div>
</template>

<script>

    /**
     * wui-row
     * @module Row
     * @see {@link ../example/all/flex.html 实例}
     * @desc 行组件 <w-row></w-row>, w-row里面只能放w-cell
     * @param height='auto' - 列高, 数字, 百分比, auto
     * @param isItems=false - 是否flex-item
     * @param direction='row' - 方向, 'row' -> flex-direction: row, 'reverse' -> flex-direction: row-reverse;
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
        name: 'w-row',
        props: {
            height: {
                type: [Number, String],
                default: 'auto',
                validator(val){
                    var t = typeof val;
                    return t === 'number' || t === 'string' && (/^\d+/.test(val) || val==='auto');
                }
            },
            align: {
                type: String,
                default: 'left'
            },
            direction: {
                type: String,
                default: 'row'
            },
            isItems: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            styles() {
                var o = {}, h;

                if (this.height !== 'auto'){
                    h = /^\d+$/.test(this.height) ? (this.height + 'px') : this.height
                    if (this.isItems){
                        o.flex = '0 0 ' + h;
                        o['-webkit-flex'] = '0 0 ' + h;
                        o['-webkit-box-flex'] = 0;
                    }else{
                        o.height = h
                    }
                    
                }
                return o;
            },
            classes(){
                var c = {};
                if (this.direction == 'reverse') {
                    c['wui-flex-dir-row-re'] = true;
                }else if (this.direction == 'row'){
                    c['wui-flex-dir-row'] = true;
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

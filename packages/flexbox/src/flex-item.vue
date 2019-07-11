
<template>
    <div :class="classes" :style="styles" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    import { BNumber, initName, baseMixins } from '../../util'

    export default {
        name: initName('flexitem'),
        mixins: [baseMixins],
        props: {
            basis: [String, Number],
            shrink: [String, Number],
            grow: [String, Number],
            flex: [String, Number],
            alginSelf: String,
            order: Number,
            width: [String, Number],
            height: [String, Number],
            flexible: {
                type: Boolean,
                default: false
            },
            alignMain: String,
            alignCross: String,
            direction: String
        },
        computed: {
            styles() {
                let w = this.width, h = this.height;
                w = BNumber.cmpUnit(w)
                h = BNumber.cmpUnit(h)

                return {
                    flex: this.flex,
                    '-webkit-flex': this.flex,
                    order: this.order,
                    '-webkit-order': this.order,
                    width: w,
                    height: h,
                    alginSelf: this.alginSelf,
                    '-webkit-align-self': this.alginSelf
                }
            },
            classes() {
                let am = this.alignMain, ac = this.alignCross, flag = am || ac, prefixCls = this.prefixCls;
                return [
                    `${prefixCls}-flex-item`,
                    this.flexible ?
                        [
                            `${prefixCls}-flex`,
                            flag ? `${prefixCls}-flex--${am || 'start'}-${ac || 'start'}` : '',
                            this.direction ? `${prefixCls}-flex--${this.direction}` : ''
                        ] : null
                ]
            }
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e)
            }
        }
    }
</script>

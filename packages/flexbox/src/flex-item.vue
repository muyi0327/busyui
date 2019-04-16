
<template>
    <div class="busy-flex__item" :style="styles" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    import { MNumber } from '../../util'

    export default {
        name: 'busy-flexitem',
        props: {
            basis: [String, Number],
            shrink: [String, Number],
            grow: [String, Number],
            flex: [String, Number],
            alginSelf: String,
            order: Number,
            width: [String, Number],
            height: [String, Number]
        },
        computed: {
            styles() {
                let w = this.width, h = this.height;
                w = MNumber.cmpUnit(w)
                h = MNumber.cmpUnit(h)

                return {
                    flex: this.flex,
                    order: this.order,
                    width: w,
                    height: h,
                    alginSelf: this.alginSelf
                }
            }
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e)
            }
        }
    }
</script>

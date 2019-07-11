<style lang="scss">
    @import "../../../src/style/variable";
    .#{$prefixCls}-segment {
        display: flex;
        border: 1px solid $color-blue;
        border-radius: 5px;
        height: 36px;
        box-sizing: border-box;
        text-align: center;
        color: $color-blue;
        overflow: hidden;
        user-select: none;

        &__item {
            border-right: 1px solid $color-blue;
            height: 100%;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            user-select: none;
            background-color: transparent;
            transition: background-color 200ms ease-in;

            &:last-child {
                border: none;
            }

            &--checked {
                background: $color-blue;
                color: #fff;
            }

            &--disabled {
                opacity: 0.6;
            }
        }
    }
</style>

<template>
    <div :class="`${prefixCls}-segment`" :style="styles">
        <slot>
            <SegmentItem v-model="currentValue" v-for="opt in options" :key="opt.value || opt" :value="opt.value || opt">{{opt.text||opt}}</SegmentItem>
        </slot>
    </div>
</template>

<script>
    import { initName, baseMixins, BNumber } from '../../util'
    import SegmentItem from './segment-item.vue'
    export default {
        name: initName('segment'),
        mixins: [baseMixins],
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            color: {
                type: String
            },
            options: Array,
            value: null,
            borderRadius: [String, Number]
        },
        components: {
            SegmentItem
        },
        data() {
            return {
                currentValue: this.value
            }
        },
        watch: {
            value(val) {
                this.currentValue = val
            },
            currentValue(val) {
                this.$emit('change', val)
            }
        },
        computed: {
            styles() {
                return {
                    borderColor: this.color,
                    color: this.color,
                    borderRadius: BNumber.cmpUnit(this.borderRadius)
                }
            }
        },
        mounted() {
            console.log(this)
        }
    }
</script>



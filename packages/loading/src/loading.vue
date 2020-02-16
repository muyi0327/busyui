<style lang="scss">
    @import "../../../src/style/variable";
    .#{$prefixCls}-loading {
        position: absolute;
        z-index: 1000;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &__wrap {
            display: flex;
            position: relative;
            z-index: 2;
        }
    }
</style>
<template>
    <div :class="`${prefixCls}-loading`" :style="styles">
        <BusyMask :isShow="showMask && visiable" :position="position" :z-index="1"></BusyMask>
        <transition :name="`${prefixCls}-animate--fade`" v-on:after-leave="_leave">
            <div :class="`${prefixCls}-loading__wrap`" v-show="visiable">
                <InlineLoading v-bind="ILProps">
                    <slot>{{text}}</slot>
                </InlineLoading>
            </div>
        </transition>
    </div>

</template>
<script>
    import BusyMask from '../../mask'
    import InlineLoading from './inline-loading.vue'
    import { initName } from '../../util'

    export default {
        name: initName('loading'),
        extends: InlineLoading,
        props: {
            showMask: {
                type: Boolean,
                default: true
            },
            spinnerWidth: {
                type: [Number, String],
                default: 36
            },
            spinnerHeight: {
                type: [Number, String],
                default: 36
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            position: {
                type: String,
                default: 'absolute'
            },
            clickHide: Boolean
        },
        data() {
            return {
                visiable: this.isShow
            }
        },
        watch: {
            isShow(val) {
                this.visiable = !!val
            }
        },
        components: {
            BusyMask,
            InlineLoading
        },
        methods: {
            show() {
                this.visiable = true
                this.$emit('show', this)
            },
            hide() {
                this.visiable = false
                this.$emit('hide', this)
            }
        },
        computed: {
            ILProps() {
                let { spinnerWidth, spinnerHeight, spinnerType, color, isRemove, visiable, direction, text, fontSize } = this
                return {
                    spinnerWidth,
                    spinnerHeight,
                    spinnerType,
                    color,
                    isRemove,
                    isShow: visiable,
                    text,
                    direction,
                    fontSize
                }
            },
            styles() {
                let { position } = this
                return {
                    position
                }
            }
        },
        mounted() {
            if (this.clickHide) {
                this.$on('click', this.hide())
            }
        }
    }
</script>

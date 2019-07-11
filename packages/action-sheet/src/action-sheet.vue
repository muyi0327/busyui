<style lang="scss">
    @import "../../../src/style/variable";
    @import "../../../src/style/animate";

    .#{$prefixCls}-action-sheet {
        position: absolute;
        left: 2%;
        bottom: 5px;
        right: 2%;
        z-index: 1;
        opacity: 1;

        &__box {
            width: 100%;
        }

        &__list {
            border-radius: 12px;
            overflow: hidden;
        }

        &__button {
            height: 48px;
            line-height: 48px;
            background-color: #f7f7f7;
            text-align: center;
            position: relative;
            font-size: 18px;
            border-radius: 12px;
            color: #0076ff;
            margin-top: 8px;

            &:active {
                background: #f2f2f2;
            }
        }
    }
</style>

<template>
    <BusyMask :is-show="visiable" @click.stop="hide" :is-remove="isRemove">
        <transition :name="`${prefixCls}-animate--bibo`" v-on:after-enter="_enter" v-on:after-leave="_leave">
            <div v-show="visiable" :class="`${prefixCls}-action-sheet`">
                <div :class="`${prefixCls}-action-sheet__box`">
                    <div :class="`${prefixCls}-action-sheet__list`">
                        <slot>
                            <ActionSheetItem :key="'as-'+$i" v-for="(ac,$i) in actions" @click="ac.action">{{ac.text}}</ActionSheetItem>
                        </slot>
                    </div>
                    <div :class="`${prefixCls}-action-sheet__button`" @click="hide">取消</div>
                </div>
            </div>
        </transition>
    </BusyMask>
</template>

<script>
    import BusyMask from '../../mask';
    import ActionSheetItem from './action-sheet-item.vue'
    import { prefixCls, prefix } from '../../../src/config'
    import { initName, baseMixins } from '../../util'

    export default {
        name: initName('action-sheet'),
        mixins: [baseMixins],
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            actions: {
                type: Array,
                default() {
                    return []
                }
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
        components: {
            BusyMask,
            ActionSheetItem
        },
        watch: {
            isShow(val) {
                this.visiable = val;
            },
            visiable(val) {
                this.$emit('visiable-change', val)
            }
        },
        computed: {
            styles() {
                return {
                }
            }
        },
        methods: {
            hide() {
                this.visiable = false;
                this.$emit('hide', false);
            },
            show() {
                this.visiable = true;
                this.$emit('show', true)
            },
            _leave() {
                // 动画结束，清除元素
                if (this.isRemove) {
                    this.$destroy();
                }
                this.$emit('transition-leave', this)
            },
            _enter() {
                this.$emit('transition-enter', this)
            }
        },
        mounted() {

        }
    }
</script>

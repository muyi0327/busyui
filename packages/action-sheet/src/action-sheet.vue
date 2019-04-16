<style lang="scss">
    @import "../../../src/style/variable";
    @import "../../../src/style/animate";

    .#{$prefixClass}-action-sheet {
        position: absolute;
        left: 2%;
        bottom: 5px;
        right: 2%;

        &__box {
            position: absolute;
            bottom: 0;
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
    <busy-mask :is-show="visiable" @click.stop="hide" :is-remove="isRemove">
        <transition name="busy-animate_bibo" v-on:after-enter="_enter" v-on:after-leave="_leave">
            <div ref="oel" v-show="visiable" class="busy-action-sheet" :style="styles">
                <div class="busy-action-sheet__box">
                    <div class="busy-action-sheet__list">
                        <slot>
                            <busy-action-sheet-item :key="'as-'+$i" v-for="(ac,$i) in actions" @click="ac.action">{{ac.text}}</busy-action-sheet-item>
                        </slot>
                    </div>

                    <div class="busy-action-sheet__button" @click="hide">取消</div>
                </div>
            </div>
        </transition>
    </busy-mask>
</template>

<script>
    import Mask from '../../mask';
    import ActionSheetItem from './action-sheet-item.vue'

    export default {
        name: 'busy-action-sheet',
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
            [Mask.name]: Mask,
            [ActionSheetItem.name]: ActionSheetItem
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
            this.$nextTick(() => {
                console.log(this.$refs['oel'].offsetHeight)
            })
        }
    }
</script>

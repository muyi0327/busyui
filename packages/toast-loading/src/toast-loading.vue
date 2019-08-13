<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-toast-loading {
        display: flex;
        border-radius: 6px;
        position: absolute;
        z-index: 1001;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;
        box-sizing: border-box;

        &__icon {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__text {
            font-size: 12px;
            display: flex;
        }

        &--dir-row {
            flex-direction: row;
            height: 60px;
            justify-content: center;
            padding: 0 16px;
        }

        &--dir-row &__icon {
            margin-right: 10px;
        }

        &--dir-row &__text {
            align-items: center;
            justify-content: flex-start;
        }

        &--dir-column {
            flex-direction: column;
            height: 80px;
            width: 80px;
        }

        &--dir-column &__icon {
            flex-grow: 2;
        }

        &--dir-column &__text {
            flex-grow: 1;
            align-items: flex-start;
            justify-content: center;
        }
    }
</style>

<template>
    <NativeMask v-show="visiable" @click="handleClick" :color="maskColor">
        <div v-show="visiable" :class="[`${prefixCls}-toast-loading`,classes]" :style="styles">
            <div :class="`${prefixCls}-toast-loading__icon`">
                <Spinner v-bind="spinnerData" />
            </div>
            <div v-if="text || $slots['default']" :class="`${prefixCls}-toast-loading__text`" :style="textStyles">
                <slot>{{text}}</slot>
            </div>
        </div>
    </NativeMask>
</template>

<script>
    import Spinner from '../../spinner'
    import NativeMask from '../../mask'
    import { initName, baseMixins, BNumber } from '../../util'

    const spinnerProps = {
        width: 24,
        height: 24,
        color: '#fff',
        type: 'circle-line'
    }

    export default {
        name: initName('toast-loading'),
        mixins: [baseMixins],
        props: {
            width: {
                type: [Number, String],
            },
            height: {
                type: [Number, String]
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            bgColor: {
                type: String
            },
            direction: {
                type: String,
                default: 'column'
            },
            spinner: {
                type: Object,
                default() {
                    return spinnerProps
                }
            },
            text: {
                type: String,
                default: ''
            },
            fontSize: {
                type: [Number, String],
                default: 12
            },
            closable: {
                type: Boolean,
                default: false
            },
            maskColor: {
                type: String
            }
        },
        components: {
            Spinner,
            NativeMask
        },
        data() {
            return {
                visiable: false
            }
        },
        methods: {
            show() {
                this.visiable = true;
                this.$emit('show');
            },
            hide() {
                this.visiable = false;
                this.$emit('hide');
            },
            handleClick(e) {
                this.closable && this.hide.call(this, e)
            }
        },
        computed: {
            styles() {
                let width = BNumber.cmpUnit(this.width)
                let height = BNumber.cmpUnit(this.height)
                return {
                    height,
                    width,
                    backgroundColor: this.bgColor
                }
            },
            textStyles() {
                let fontSize = BNumber.cmpUnit(this.fontSize)
                let color = this.color
                return { color, fontSize }
            },
            classes() {
                return [this.direction == 'row' ? `${this.prefixCls}-toast-loading--dir-row` : `${this.prefixCls}-toast-loading--dir-column`]
            },
            spinnerData() {
                return {
                    ...spinnerProps,
                    ...this.spinner
                }
            }
        },
        watch: {
            visiable(val, old) {
                this.$emit('visiable-change', val);
            }
        }
    }
</script>

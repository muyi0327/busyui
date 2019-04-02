<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixClass}-toast-loading {
        display: flex;
        border-radius: 10px;
        position: absolute;
        z-index: 10001;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;

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
            width: 160px;
            height: 80px;
            justify-content: center;
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

    .loading-opacity-fade-enter,
    .loading-opacity-fade-leave-active {
        opacity: 0;
    }

    .loading-opacity-fade-leave-active,
    .loading-opacity-fade-enter-active {
        transition: all 0.5s ease;
    }
</style>

<template>
    <bee-mask v-show="visiable">
        <transition name="loading-opacity-fade">
            <div v-show="visiable" class="bee-toast-loading" :class="classes" :style="styles">
                <div class="bee-toast-loading__icon">
                    <bee-spinner :type="spinner.type" :height="spinner.height" :width="spinner.width" :color="spinner.color"></bee-spinner>
                </div>
                <div v-if="text" class="bee-toast-loading__text" :style="{color: color,fontSize: fontSize+'px'}">
                    <slot>{{text}}</slot>
                </div>
            </div>
        </transition>
    </bee-mask>
</template>

<script>
    import Spinner from '../../spinner';

    export default {
        name: 'bee-toast-loading',
        props: {
            width: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 0
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            bgColor: {
                type: String,
                default: 'rgba(0,0,0, .6)'
            },
            gColor: {
                type: String,
                default: 'rgba(0,0,0, .6)'
            },
            direction: {
                type: String,
                default: 'column'
            },
            spinner: {
                type: Object,
                default() {
                    return {
                        width: 24,
                        height: 24,
                        color: '#fff',
                        type: 0
                    }
                }
            },
            text: {
                type: String,
                default: ''
            },
            fontSize: {
                type: Number,
                default: 12
            }
        },
        components: {
            [Spinner.name]: Spinner
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
                this.visiable = true;
                this.$emit('hide');
            }
        },
        computed: {
            styles() {
                var s = {
                    backgroundColor: this.bgColor
                };

                if (this.width) {
                    s.width = this.width + 'px';
                }

                if (this.height) {
                    s.height = this.height + 'px';
                }
                return s;
            },
            classes() {
                return [this.direction == 'row' ? 'bee-toast-loading--dir-row' : 'bee-toast-loading--dir-column']
            }
        },
        watch: {
            visiable(val, old) {
                this.$emit('visiable-change', val);
            }
        }
    }
</script>

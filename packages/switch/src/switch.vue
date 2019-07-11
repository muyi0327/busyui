<style lang="scss">
    @import "../../../src/style/variable";

    @mixin borderRadius($radius: 20px) {
        border-radius: $radius;
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
        border-bottom-left-radius: $radius;
        border-bottom-right-radius: $radius;
    }

    $duration: 0.4s;
    $checkedColor: #44db5e;

    .#{$prefixCls}-switch {
        width: 52px;
        height: 31px;
        position: relative;
        border: 1px solid #dfdfdf;
        background-color: #fdfdfd;
        box-shadow: #dfdfdf 0 0 0 0 inset;
        @include borderRadius();
        background-clip: content-box;
        display: inline-block;
        -webkit-appearance: none;
        user-select: none;
        outline: none;

        &:before {
            content: "";
            width: 29px;
            height: 29px;
            position: absolute;
            top: 0px;
            left: 0;
            @include borderRadius();
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        &:checked {
            border-color: $checkedColor;
            box-shadow: $checkedColor 0 0 0 16px inset;
            background-color: $checkedColor;
            &:before {
                left: 21px;
            }
        }

        &__animbg {
            transition: background-color ease $duration;
            &:before {
                transition: left 0.3s;
            }
            &:checked {
                box-shadow: #dfdfdf 0 0 0 0 inset;
                background-color: $checkedColor;
                transition: border-color $duration, background-color ease $duration;
                &:before {
                    transition: left 0.3s;
                }
            }
        }

        &__anim {
            transition: border cubic-bezier(0, 0, 0, 1) $duration,
                box-shadow cubic-bezier(0, 0, 0, 1) $duration;
            &:before {
                transition: left 0.3s;
            }
            &:checked {
                box-shadow: $checkedColor 0 0 0 16px inset;
                background-color: $checkedColor;
                transition: border ease $duration, box-shadow ease $duration,
                    background-color ease $duration * 3;
                &:before {
                    transition: left 0.3s;
                }
            }
        }
    }
</style>

<template>
    <label><input type="checkbox" v-model="currentValue" class="busy-switch busy-switch__animbg"></label>
</template>

<script>
    export default {
        name: 'busy-switch',
        props: {
            value: Boolean,
            disabled: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: ''
            },
            width: {
                type: [Number, String],
                default: 52
            },
            height: {
                type: [Number, String],
                default: 32
            }
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
                this.$emit('input', val)
            }
        }
    }
</script>

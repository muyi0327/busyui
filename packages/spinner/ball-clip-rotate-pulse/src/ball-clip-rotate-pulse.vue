<style lang="scss">
    @import "../../../../src/style/variable.scss";

    @keyframes ball-clip-rotate {
        0% {
            -webkit-transform: rotate(0deg) scale(1);
            transform: rotate(0deg) scale(1);
        }
        50% {
            -webkit-transform: rotate(180deg) scale(1);
            transform: rotate(180deg) scale(1);
        }
        100% {
            -webkit-transform: rotate(360deg) scale(1);
            transform: rotate(360deg) scale(1);
        }
    }

    @keyframes ball-clip-scale {
        30% {
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    .bee-ball-clip-rotate-pulse {
        position: relative;
        display: inline-block;
        box-sizing: border-box;
    }

    .bee-ball-clip-rotate-pulse > div {
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        border-radius: 100%;
        box-sizing: border-box;
    }

    .bee-ball-clip-rotate-pulse > div:first-child {
        background: $color-blue;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        transform-origin: 50% 50%;
    }

    .bee-ball-clip-rotate-pulse > div:last-child {
        position: absolute;
        border-width: 2px;
        border-style: solid;
        background: transparent;
        border: 2px solid;
        border-color: $color-blue transparent $color-blue transparent;
        transform-origin: 50% 50%;
        transform: translateX(-50%) translateY(-50%);
        -webkit-animation: ball-clip-rotate 1s 0s linear infinite;
        animation: ball-clip-rotate 1s 0s linear infinite;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
    }
</style>
<template>
    <div v-if="visiable" class="bee-ball-clip-rotate-pulse" :style="{width: width + 'px', height: width + 'px'}">
        <div :style="smallStyles"></div>
        <div :style="bigStyles"></div>
    </div>
</template>
<script>
    export default {
        name: 'bee-ball-clip-rotate-pulse',
        props: {
            color: {
                type: String,
                default: ''
            },
            width: {
                type: Number,
                default: 30
            },
            height: {
                type: Number,
                default: 16
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        computed: {
            bigStyles() {
                var s = {
                    width: this.width + 'px',
                    height: this.width + 'px'
                }

                if (this.color) {
                    s.borderColor = this.color + ' transparent ' + this.color + ' transparent'
                }

                return s;
            },
            smallStyles() {
                var s = {
                    width: Math.floor(this.width / 2) + 'px',
                    height: Math.floor(this.width / 2) + 'px'
                }

                if (this.color) {
                    s['background-color'] = this.color
                }

                return s;
            }
        },
        methods: {
            show() {
                this.visiable = true;
                this.$emit('show');
                return this;
            },
            hide() {
                this.visiable = false;
                this.$emit('hide');
                return this;
            }
        },
        mounted() {
            this.$parent && this.$parent.$on('visiable-change', function (vis) {
                this[vis ? 'show' : 'hide']();
            }.bind(this));
        }
    }
</script>

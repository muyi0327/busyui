<style lang="scss">
    @import "../../../../src/style/variable.scss";

    @keyframes circle-rotate {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    .busy-circle-rotate {
        display: inline-block;
    }

    .busy-circle-rotate__circle {
        border-radius: 50%;
        -webkit-animation: circle-rotate 0.5s linear infinite;
        animation: circle-rotate 0.5s linear infinite;
        box-sizing: border-box;
        border: 3px solid $color-blue;
        border-left: 3px solid rgba(0, 0, 0, 0);
    }
</style>
<template>
    <div v-if="visiable" class="busy-circle-rotate">
        <div class="busy-circle-rotate__circle" :style="styles"></div>
    </div>
</template>
<script>

    /**
     * busy-circle-rotate
     * @desc 旋转圆环动画
     * @param {Number} width=24 - 组件宽度
     * @param {Number} height=24 - 组件高度
     * @param {String} color="#ffffff" - 组件颜色
     * @param {Number} strokeWidth=3 - 描边宽度
     * @example
     *      <busy-circle-rotate color="red"></busy-circle-rotate>
     **/
    export default {
        name: 'busy-circle-rotate',
        props: {
            height: {
                type: Number,
                default: 24
            },
            width: {
                type: Number,
                default: 24
            },
            color: {
                type: String,
                default: ''
            },
            strokeWidth: {
                type: Number,
                default: 3
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        computed: {
            styles() {
                var s = {
                    width: this.width + 'px',
                    height: this.height + 'px'
                }

                if (this.color) {
                    s.borderColor = this.color;
                }

                if (this.strokeWidth) {
                    s.borderWidth = this.strokeWidth + 'px';
                    s.borderLeft = 'solid ' + this.strokeWidth + 'px rgba(0, 0, 0, 0)';
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

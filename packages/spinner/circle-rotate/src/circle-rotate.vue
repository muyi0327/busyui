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

    .bee-circle-rotate {
        display: inline-block;
    }

    .bee-circle-rotate > div {
        border-radius: 50%;
        -webkit-animation: circle-rotate 0.5s linear infinite;
        animation: circle-rotate 0.5s linear infinite;
        box-sizing: border-box;
        border: 3px solid $color-blue;
        border-left: 3px solid rgba(0, 0, 0, 0);
    }
</style>
<template>
    <div v-if="visiable" class="bee-circle-rotate">
        <div class="bee-circle-circle" :style="styles"></div>
    </div>
</template>
<script>

    /**
     * bee-circle-rotate
     * @desc 旋转圆环动画
     * @param {Number} width=24 - 组件宽度
     * @param {Number} height=24 - 组件高度
     * @param {String} color="#ffffff" - 组件颜色
     * @param {Number} strokeWidth=3 - 描边宽度
     * @example
     *      <bee-circle-rotate color="red"></bee-circle-rotate>
     **/
    export default {
        name: 'bee-circle-rotate',
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

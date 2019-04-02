<style lang="scss">
    @import "../../../src/style/variable.scss";
    %small-height {
        line-height: 0;
        font-size: 0;
    }

    .#{prefixClass}-progress-line {
        border-radius: 3px;
        height: #{$progress-line-width}px;
        position: relative;
        transition: all 1s linear;
        background-color: $progress-background-color;
        @extend %small-height;

        &__bar {
            height: 100%;
            @extend %small-height;
            border-radius: 3px;
            background-color: $progress-line-color;
        }

        &__text {
            position: absolute;
            top: 100%;
            z-index: 10;
            font-size: 12px;
            line-height: 1.5;
            transition: all 1s linear;
        }
    }
</style>
<template>
    <div class="bee-progress-line" v-on:click="handleClick" :style="styles">
        <div class="bee-progress-line__bar" :style="barStyles"></div>
        <div v-if="showText" class="bee-progtress-line__text" :style="textStyle">{{percent}}%</div>
    </div>
</template>
<script>
    /**
     * bee-progress-line
     * @des 线形进度条组件
     * @param {Number} width - 组件长度,默认 100%
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color
     * @param {String} barColor - 进度条颜色, 取值范围 css color
     * @param {String} showText - 是否显示进度数值, 默认 false
     * @example
     *      <bee-progress-line :percent="45" :width="150" :track-width="4"></bee-progress-line>
     *      <bee-progress-ring :percent="45" :width="150" :track-width="4"></bee-progress-ring>
     **/
    export default {
        name: 'bee-progress-line',
        props: {
            trackWidth: {
                type: Number,
                default: 0
            },
            width: {
                default: '100%',
                validator(val) {
                    return /\d+%?$/.test(String(val));
                }
            },
            trackColor: {
                type: [String, Array],
                default: ''
            },
            barColor: {
                type: [String, Array],
                default: ''
            },
            duration: {
                type: Number,
                default: 500
            },
            showText: {
                type: Boolean,
                default: false
            },
            percent: {
                default: 0,
                validator(val) {
                    return typeof val === 'number' && val >= 0 && val <= 100;
                }
            }
        },
        computed: {
            styles() {
                var s = {
                    width: typeof this.width == 'number' ? (this.width + 'px') : this.width
                }

                if (this.trackColor) {
                    if (Array.isArray(this.trackColor)) {
                        var linear = this.trackColor.join(',');
                        s.backgroundImage = '-webkit-linear-gradient(' + linear + ')';
                        s.backgroundImage = 'linear-gradient(' + linear + ')';
                    } else {
                        s.backgroundColor = this.trackColor;
                    }

                }

                if (this.trackWidth) {
                    s.height = this.trackWidth + 'px'
                }

                return s;
            },
            barStyles() {
                var s = {
                    width: this.percent + '%',
                    webkitTransitionDuration: this.duration + 'ms',
                    transitionDuration: this.duration + 'ms'
                }

                if (this.barColor) {
                    if (Array.isArray(this.barColor)) {
                        var linear = this.barColor.join(',');
                        s.backgroundImage = '-webkit-linear-gradient(' + linear + ')';
                        s.backgroundImage = 'linear-gradient(' + linear + ')';
                    } else {
                        s.backgroundColor = this.barColor;
                    }
                }

                return s;
            },
            textStyle() {
                return {
                    left: this.percent + '%'
                }
            }
        },
        methods: {
            handleClick($evt) {
                this.$emit('click', $evt);
            }
        }
    }
</script>

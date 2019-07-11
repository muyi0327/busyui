<style lang="scss">
    @import "../../../src/style/variable.scss";
    .#{$prefixCls}-swipe {
        overflow: hidden;
        position: relative;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        &__wrap {
            height: 100%;
        }

        &--horizontal {
            white-space: nowrap;
            font-size: 0;
        }

        &--transition {
            transition: transform 0.3s cubic-bezier(0.6, 0.07, 1, 1);
        }

        &__item {
            width: 100%;
            height: 100%;
            display: inline-block;
            font-size: 1rem;
        }

        &__dotes {
            position: absolute;
            z-index: 1;
            text-align: center;
            font-size: 0;

            &--pos-left {
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
                > span {
                    display: block;
                }
            }
            &--pos-right {
                top: 50%;
                transform: translateY(-50%);
                right: 15px;
                left: auto;
            }
            &--pos-top {
                left: 50%;
                top: 15px;
                transform: translateX(-50%);
            }
            &--pos-bottom {
                left: 50%;
                bottom: 15px;
                transform: translateX(-50%);
            }
        }

        &__dot {
            height: 8px;
            width: 8px;
            display: inline-block;
            border-radius: 50%;
            margin: 5px;
            box-sizing: border-box;
            transition: all 0.5s linear;
            background-color: $swipe-normal-dot-color;

            &--cur {
                background-color: $swipe-active-dot-color;
            }
        }
    }
</style>
<template>
    <div :class="`${prefixCls}-swipe`" :style="styles" @click="handleClick">
        <div :class="[`${prefixCls}-swipe__wrap`,classes]" :style="wrapStyles">
            <slot></slot>
        </div>
        <div :class="[`${prefixCls}-swpier__dotes`,dotesClass]" v-if="showDotes">
            <span :key="'swiper-'+i" v-for="(item, i) in items" @click.stop="goIndex(i)" :class="['busy-swipe__dot', i == index ? 'busy-swipe__dot--cur':'']" :style="[dotStyles, i == index ? {backgroundColor: curDotColor} : {}]"></span>
        </div>
    </div>
</template>
<script>
    import { BNumber, initName, baseMixins } from '../../util';
    const VERTICAL = 'vertical';
    const HORIZONTAL = 'horizontal';

    /**
     * @class
     * @constructor
     * @module Swipe
     * @see {@link ../example/all/swipe.html 实例}
     * @desc 切换组件
     * @param {Number} height=200 - 可视高度
     * @param {Number} width - 可视宽度
     * @param {Number} defaultIndex - 默认当前显示子项索引
     * @param {String} dotColor=#666 - 切换点颜色, css color
     * @param {String} curDotColor=#fff - 当前高亮切换点颜色, css color
     * @param {String} dirType=horizontal - 切换方向，水平或者垂直
     * @param {Boolean} showDotes=true - 是否显示切换点
     * @param {Boolean} autoPlay=false - 是否自动播放
     * @param {Number} interval=2000 - 自动播放间隔时间 毫秒
     */
    export default {
        name: initName('swipe'),
        mixins: [baseMixins],
        props: {
            height: {
                type: Number,
                default: 200
            },
            width: {
                type: Number
            },
            defaultIndex: {
                type: Number,
                default: 0
            },
            dotColor: {
                type: String
            },
            curDotColor: {
                type: String
            },
            dirType: {
                type: String,
                default: HORIZONTAL
            },
            showDotes: {
                type: Boolean,
                default: true
            },
            dotesPos: {
                type: String,
                default: 'bottom'
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            interval: {
                type: Number,
                default: 2000
            }
        },
        data() {
            return {
                index: this.defaultIndex,
                direction: '',
                items: [],
                timmer: null,
                status: 'waiting',
                size: 0,
                itemWidth: this.dirType == HORIZONTAL ? this.width : this.height,
                distance: 0,
                originTouches: {}
            }
        },
        computed: {
            styles() {
                return {
                    height: this.height + 'px',
                    width: this.width + 'px'
                }
            },
            wrapStyles() {
                var distance = 0, transform = {};

                if (this.dirType == VERTICAL) {
                    distance = -1 * this.index * this.height + this.distance;
                    transform = 'translate3d(0,' + distance + 'px, 0)';
                } else if (this.dirType == HORIZONTAL) {
                    distance = -1 * this.index * this.width + this.distance;
                    transform = 'translate3d(' + distance + 'px, 0, 0)';
                }

                return {
                    transform: transform
                }
            },
            dotStyles() {
                return {
                    backgroundColor: this.dotColor
                }
            },
            dotesClass() {
                return [`busy-swipe__dots--pos-${this.dotesPos}`]
            },
            classes() {
                return [
                    this.status == "transition" ? 'busy-swipe--transition' : '',
                    this.dirType == HORIZONTAL ? 'busy-swipe--horizontal' : 'busy-swipe--vertical'
                ]
            }
        },

        watch: {
            index(val, old) {
                this.$emit('index-change', val);
            },
            height(val, old) {
                this._reset();
            },
            width() {
                this._reset();
            },
            status(val) {
                this.$emit('status-change', val);
            },
            autoPlay(val) {
                if (val) {
                    !this.timmer && this._autoPlay();
                } else {
                    this._stopPlay();
                }
            }
        },
        methods: {
            _reset() {
                this.distance = 0;
                this.status = 'waiting';
                this.index = this.defaultIndex;
                this._stopPlay();
                this.autoPlay && this._autoPlay();
            },
            _handleStart(e) {
                if (this.status !== 'waiting') return;
                this.status = 'dragstart';
                // e.preventDefault();
                // e.stopPropagation();
                if (this.timmer) {
                    this._stopPlay();
                }
                this.originTouches = e.touches[0];
            },
            _handleMove(e) {
                if (this.status !== 'dragstart' && this.status !== 'draging') return;
                this.status = 'draging';
                e.preventDefault();
                e.stopPropagation();
                const touches = e.touches[0];
                const m = this._computeMove(this.originTouches, touches);
                // 判断角度
                if (!m.swipeAble) {
                    return;
                };
                this.distance = m.dis;
            },
            _handleEnd(e) {
                if (this.status == 'dragstart') return this.status = 'waiting';
                if (this.status !== 'draging') return;
                this.status = 'dragend';
                const touches = e.changedTouches[0];
                const m = this._computeMove(this.originTouches, touches);
                var index = this.index;

                if (!m.swipeAble) {
                    return this.status = 'waiting';
                };

                // 拖动距离超过20才滑动
                if (m.swipeAble && Math.abs(m.dis) >= 20) {
                    index += ['left', 'up'].indexOf(this.direction) >= 0 ? 1 : -1;
                }

                this.goIndex(index);
            },
            _transitionEnd() {
                this.status = 'waiting';
                // 保证不重复自动播放
                !this.timmer && this.autoPlay && this._autoPlay();
            },
            _transitionStart() {
                this.status = 'transition';
            },
            _computeMove(ot, et) {
                const distance = this.dirType == HORIZONTAL ? et.pageX - ot.pageX : et.pageY - ot.pageY;
                if (this.dirType == HORIZONTAL) {
                    this.direction = distance < 0 ? 'left' : 'right';
                } else {
                    this.direction = distance < 0 ? 'up' : 'down';
                }
                return {
                    dis: distance,
                    // 判断角度
                    swipeAble: this.dirType == HORIZONTAL
                        && Math.abs(et.pageX - ot.pageX) >= Math.abs(et.pageY - ot.pageY)
                        || this.dirType == VERTICAL
                        && Math.abs(et.pageX - ot.pageX) < Math.abs(et.pageY - ot.pageY)
                };
            },
            goIndex(index) {
                // 保证不超出0~this.size-1
                index = BNumber.limit(index, 0, this.size - 1);
                // 转页才有动画
                if (index !== this.index) {
                    this.status = 'transition';
                } else {
                    this.status = 'waiting';
                }

                this.distance = 0;
                this.index = index;

                if (!this.timmer && this.autoPlay) {
                    // 保证不重复自动播放
                    this._autoPlay();
                }
            },
            _autoPlay() {
                this.direction = this.dirType == HORIZONTAL ? 'left' : 'up';
                var i = 1;
                this.timmer = setInterval(() => {
                    if (this.index >= this.size - 1) {
                        i = -1;
                    } else if (this.index <= 0) {
                        i = 1;
                    }
                    this.goIndex(this.index + i);
                }, this.interval)
            },
            _stopPlay() {
                clearInterval(this.timmer);
                this.timmer = null;
            },
            _bindTouch() {
                this.$el.addEventListener('touchstart', this._handleStart.bind(this), false);
                this.$el.addEventListener('touchmove', this._handleMove.bind(this), false);
                this.$el.addEventListener('touchend', this._handleEnd.bind(this), false);
                this.$el.addEventListener('transitionend', this._transitionEnd.bind(this), false);
                this.$el.addEventListener('webkitTransitionEnd', this._transitionEnd.bind(this), false);
                this.$el.addEventListener('transitionstart', this._transitionStart.bind(this), false);
                this.$el.addEventListener('webkitTransitionStart', this._transitionStart.bind(this), false);
            },
            handleClick($evt) {
                this.$emit('click', $evt);
            }
        },
        mounted() {
            // 初始化
            this.items = [].slice.call(this.$el.querySelectorAll('.busy-swipe__item'));
            this.size = this.items.length;
            if (this.index < 0 || this.index >= this.size) {
                this.index = 0;
                console.warn('[Busy warn]:Index out of range');
            }

            this._bindTouch();
            //this.distance = -1 * this.index * this.itemWidth;
            this.autoPlay && this._autoPlay();
        }
    }
</script>

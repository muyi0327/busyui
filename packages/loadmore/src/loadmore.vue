<style lang="scss">
    @import "../../../src/style/variable.scss";

    .#{$prefixCls}-loadmore {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
        position: relative;
        height: 100%;
        transform: translate3d(0, 0, 0);

        &__top,
        &__bottom {
            text-align: center;
            height: 50px;
            height: 50px;
        }

        &__top {
            margin-top: -50px;
        }

        &__content {
        }

        &__nomore {
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 14px;
        }

        &__bar {
            height: 50px;
            line-height: 50px;
            text-align: center;
            display: flex;
        }

        &__spinner {
            display: inline-block;
            vertical-align: middle;
            line-height: 20px;
            height: 20px;
        }

        &__text {
            display: inline-block;
            margin-left: 12px;
            vertical-align: middle;
            line-height: 30px;
            height: 30px;

            > span {
                display: inline-block;
                vertical-align: middle;
            }
        }

        &__arrow {
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            transition: transform 0.2s linear;
        }

        &--pull &__arrow {
            transform: rotate(0deg);
        }
        &--drop &__arrow {
            transform: rotate(180deg);
        }

        &--loading &__arrow,
        &--init &__arrow {
            display: none;
        }
    }
</style>
<template>
    <div :class="`${prefixCls}-loadmore`">
        <div :class="`${prefixCls}-loadmore__content`" :style="styles">
            <slot name="top">
                <LoadMoreBar :class="`${prefixCls}-loadmore__top`" v-if="onRefresh" :pull-text="topPullText" :loading-text="topLoadingText" :drop-text="topDropText" :show-status="tStatus" pos="top" ref="top"></LoadMoreBar>
            </slot>
            <div :class="`${prefixCls}-loadmore__content`">
                <slot></slot>
            </div>
            <slot name="bottom" v-if="onInfinite">
                <LoadMoreBar :class="`${prefixCls}-loadmore__bottom`" :pull-text="bottomPullText" :loading-text="bottomLoadingText" :drop-text="bottomDropText" :show-status="bStatus" pos="bottom" ref="bottom"></LoadMoreBar>
            </slot>
            <slot name="no-more" v-if="noMore">
                <div :class="`${prefixCls}-loadmore__nomore`">{{noMoreText}}</div>
            </slot>
        </div>
    </div>
</template>
<script>
    import {
        BString,
        BNumber,
        initName,
        baseMixins
    } from '../../util'

    import LoadMoreBar from './loadmore-bar.vue'

    /**
     * @class
     * @constructor
     * @module Loadmore
     * @see {@link ../example/all/loadmore.html 实例}
     * @desc 加载更多组件
     * @param {String} topPullText - 内容上方loading拖动时显示文字
     * @param {String} topLoadingText - 内容上方loading拖动释放开始加载数据显示文字
     * @param {String} topDropText - 内容上方loading拖动超出指定距离，释放可加载时显示文字
     * @param {String} bottomPullText - 内容下方loading拖动时显示文字
     * @param {String} bottomLoadingText - 内容下方loading拖动释放开始加载数据显示文字
     * @param {String} bottomDropText - 内容下方loading拖动超出指定距离，释放可加载时显示文字
     * @param {Function} onRefresh - 内容上方loading加载数据方法
     * @param {Function} onInfinite - 内容下方loading加载数据方法
     * @param {Number} topLimit - 内容上方拖动距离可加载临界值
     * @param {Function} bottomLimit - 内容下方拖动距离可加载临界值
     * @param {String} topStatus - 内容上方组件状态
     * @param {String} bottomStatus - 内容下方组件状态
     * @param {Boolean} listenScroll - 是否监听scroll
     */
    export default {
        name: initName('loadmore'),
        mixins: [baseMixins],
        props: {
            topPullText: {
                type: String,
                default: '下拉刷新'
            },
            topLoadingText: {
                type: String,
                default: '正在加载新数据'
            },
            topDropText: {
                type: String,
                default: '释放加载'
            },
            bottomPullText: {
                type: String,
                default: '上拉刷新'
            },
            bottomLoadingText: {
                type: String,
                default: '加载中...'
            },
            bottomDropText: {
                type: String,
                default: '释放加载'
            },
            noMoreText: {
                type: String,
                default: '全部数据已加载'
            },
            onInfinite: {
                type: Function
            },
            onRefresh: {
                type: Function
            },
            topLimit: {
                type: Number,
                default: 60
            },
            bottomLimit: {
                type: Number,
                default: 120
            },
            topStatus: {
                type: String,
                default: 'init'
            },
            bottomStatus: {
                type: String,
                default: 'init'
            },
            noMoreData: {
                type: Boolean,
                default: false
            },
            listenScroll: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                translate: 0,
                direction: '',
                touchesY: 0,
                currentY: 0,
                tStatus: this.topStatus,
                bStatus: this.bottomStatus,
                draging: false,
                noMore: this.noMoreData,
                noData: false
            }
        },
        components: {
            LoadMoreBar
        },
        computed: {
            styles() {
                return {
                    transform: 'translate3d(0,' + this.translate + 'px, 0)'
                }
            }
        },
        methods: {
            _handleTouchStart(e) {
                //document.body.addEventListener('scroll', this.stopScroll, false);
                if (this.tStatus === 'loading' || this.bStatus === 'loading') {
                    return;
                }

                this.touchesY = e.touches[0].pageY;
                this.draging = true;
            },
            _handleTouchMove(e) {
                e.stopPropagation();
                if (this.tStatus === 'loading' || this.bStatus === 'loading' || !this.draging || this.$el.scrollTop > 0) {
                    return;
                }

                this.currentY = e.touches[0].pageY;
                var distance = (this.currentY - this.touchesY) / 2;

                // 没有向下滑动
                if (distance <= 0) {
                    return;
                }
                e.preventDefault();

                if (this.tStatus == 'init') {
                    this.tStatus = 'pull';
                }
                this.translate = distance;
                if (distance > this.topLimit && this.tStatus == 'pull') {
                    this.tStatus = 'drop';
                } else if (distance <= this.topLimit && this.tStatus == 'drop') {
                    this.tStatus = 'pull';
                }
            },
            _handleTouchEnd(e) {
                //document.body.removeEventListener('scroll', this.stopScroll, false);
                if (this.tStatus == 'loading' || this.bStatus == 'loading') {
                    return
                }

                this.draging = false;
                //e.preventDefault();
                //e.stopPropagation();
                if (this.tStatus === 'pull') {
                    this.tStatus = 'init';
                } else if (this.tStatus === 'drop') {
                    this.tStatus = 'loading';
                }
            },
            _getElementScrollTop(elem) {
                if (elem === window) {
                    return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
                }
                return elem.scrollTop;
            },

            _bindEvents() {
                this._doneScroll = this._scroll.bind(this);
                this.$el.addEventListener('touchstart', this._handleTouchStart.bind(this));
                this.$el.addEventListener('touchmove', this._handleTouchMove.bind(this));
                this.$el.addEventListener('touchend', this._handleTouchEnd.bind(this));
                this.$el.addEventListener('scroll', this._doneScroll, false);
            },
            _scroll() {
                if (this._checkReachBtm()) {
                    this.bStatus = 'loading';
                }
            },

            _checkReachBtm() {
                if (!this.listenScroll && this.bStatus == 'loading') {
                    return false;
                }
                var target = this.$el;
                let scrollTop = this._getElementScrollTop(target);
                let clientH = target.clientHeight;
                let scrollH = target.scrollHeight;

                return scrollH - clientH - scrollTop <= this.bottomLimit
            },
            stopScroll(e) {
                e.preventDefault();
            },
            doneRefresh() {
                this.tStatus = 'loading';
            },
            refreshDone(status) {
                if (status === 'no-data') {
                    !!this._doneScroll && this.$el.removeEventListener('scroll', this._doneScroll, false);
                    this._doneScroll = null;
                    this.noMore = false;
                } else if (status === 'no-more') {
                    this._doneScroll && this.$el.removeEventListener('scroll', this._doneScroll, false);
                    this._doneScroll = null;
                    this.noMore = true;
                } else if (!this._doneScroll) {
                    this._doneScroll = this._scroll.bind(this);
                    this.$el.addEventListener('scroll', this._doneScroll, false);
                    this.noMore = false;
                }

                this.tStatus = 'init';
            },
            infiniteDone(status) {
                if (status === 'no-more') {
                    this._doneScroll && this.$el.removeEventListener('scroll', this._doneScroll, false);
                    this._doneScroll = null;
                    this.noMore = true;
                }
                this.bStatus = 'init';
            }
        },
        watch: {
            topStatus(val) {
                this.tStatus = val;
            },
            bottomStatus(val) {
                this.bStatus = val;
            },
            tStatus(val) {
                if (val == 'loading') {
                    this.translate = 50;
                    typeof this.onRefresh == 'function' && this.onRefresh(this.refreshDone);
                }

                if (val == 'init') {
                    this.translate = 0;
                }
                this.$emit('top-status-change', val);
            },
            bStatus(val) {
                if (val == 'loading' && !this.noMore) {
                    typeof this.onInfinite == 'function' && this.onInfinite(this.infiniteDone);
                }
                this.$emit('bottom-status-change', val);
            },
            listenScroll(val) {
                if (val === false) {
                    this.$el.removeEventListener('scroll', this._doneScroll, false);
                    this._doneScroll = null;
                } else if (!this._doneScroll) {
                    this._doneScroll = this._scroll.bind(this);
                    this.$el.addEventListener('scroll', this._doneScroll, false);
                }
            },
            noMoreData(val) {
                this.noMore = val;
            }
        },
        mounted() {
            this._bindEvents();
        }
    }
</script>

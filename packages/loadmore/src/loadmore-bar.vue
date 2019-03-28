<style lang="scss">
    @import "../../../src/style/flex.scss";

    .wui-loadmore-bar {
      height: 50px;
      line-height: 50px;
      text-align: center;
    }

    .wui-loadmore-spinner {
      display: inline-block;
      vertical-align: middle;
      line-height: 20px;
      height: 20px;
    }

    .wui-loadmore-text {
      display: inline-block;
      margin-left: 12px;
      vertical-align: middle;
      line-height: 30px;
      height: 30px;

      > span {
        display: inline-block;
        vertical-align: middle;
      }
      .status-arrow {
        margin-right: 10px;
        height: 30px;
        line-height: 30px;
        transition: transform 0.2s linear;
      }
      &.loadmore-pull {
        .status-arrow {
          transform: rotate(0deg);
        }
      }
      &.loadmore-drop {
        .status-arrow {
          transform: rotate(180deg);
        }
      }

      &.loadmore-loading,
      &.loadmore-init {
        .status-arrow {
          display: none;
        }
      }
    }
</style>
<template>
    <div class="wui-loadmore-bar wui-al-cm" v-show="pos=='top' || pos=='bottom' && status=='loading'">
        <p class="wui-loadmore-spinner">
            <w-spinner :style="{verticalAlign: 'middle'}" v-show="status==='loading'" :size="size" :type="6" color="#aaa"></w-spinner>
        </p>
        <p class="wui-loadmore-text" :class="['loadmore-' + status]">
            <span v-if="pos=='top'" class="status-arrow">
                <w-icon :height="30" type="refresharrow" fill="#000"></w-icon>
            </span>
            <span>{{loadText}}</span>
        </p>
    </div>
</template>

<script>
    import Spinner from '../../spinner';
    import Icon from '../../icon';
    export default {
        props: {
            size: {
                type: Number,
                default: 20
            },
            pullText: {
                type: String,
                default: '刷新加载'
            },
            loadingText: {
                type: String,
                default: '加载中...'
            },
            dropText: {
                type: String,
                default: '释放刷新'
            },
            pos: {
                type: String,
                default: ''
            },
            showStatus: {
                type: String,
                default: 'init'
            }
        },
        data() {
            return {
                status: this.showStatus
            }
        },
        components: {
            'w-spinner': Spinner,
            'w-icon': Icon
        },
        computed: {
            loadText() {
                return this.status !== 'init' ? this[this.status + 'Text'] : '';
            }
        },
        watch: {
            status(val, old) {
                this.$emit('status-change', val);
            },
            showStatus(val, old) {
                this.status = val;
            }
        }
    }
</script>

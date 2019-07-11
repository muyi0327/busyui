
<template>
    <div :class="`${prefixCls}-loadmore__bar ${prefixCls}-flex--center-center`" v-show="pos=='top' || pos=='bottom' && status=='loading'">
        <p :class="`${prefixCls}-loadmore__spinner`">
            <Spinner v-show="status==='loading'" :width="size" :height="size" type="circle-rotate" color="#aaa"></Spinner>
        </p>
        <p :class="[`${prefixCls}-loadmore__text`, `${prefixCls}-loadmore--${status}`]">
            <span v-if="pos=='top'" :class="`${prefixCls}-loadmore__arrow`">
                <Icon :height="30" name="arrowdown" color="#000" />
            </span>
            <span>{{loadText}}</span>
        </p>
    </div>
</template>

<script>
    import Spinner from '../../spinner'
    import Icon from '../../icon'
    import { initName, baseMixins } from '../../util'

    export default {
        name: initName('loadmore-bar'),
        mixins: [baseMixins],
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
            Spinner,
            Icon
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

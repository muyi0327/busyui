
<template>
    <div class="bee-loadmore__bar bee-al-cm" v-show="pos=='top' || pos=='bottom' && status=='loading'">
        <p class="bee-loadmore__spinner">
            <w-spinner :style="{verticalAlign: 'middle'}" v-show="status==='loading'" :size="size" :type="6" color="#aaa"></w-spinner>
        </p>
        <p class="bee-loadmore__text" :class="['bee-loadmore--' + status]">
            <span v-if="pos=='top'" class="bee-loadmore__arrow">
                <bee-icon :height="30" type="refresharrow" fill="#000"></bee-icon>
            </span>
            <span>{{loadText}}</span>
        </p>
    </div>
</template>

<script>
    import Spinner from '../../spinner';
    import Icon from '../../icon';
    export default {
        name: 'bee-loadmore-bar',
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
            [Spinner.name]: Spinner,
            [Icon.name]: Icon
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

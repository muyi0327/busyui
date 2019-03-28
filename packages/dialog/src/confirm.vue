<template>
    <w-dialog ref="dialog" :show-close="false" :width="width" :height="height" :buttons="_buttons" :is-show="visiable" :is-remove="isRemove" :content="content" @visiable-change="handleVisiable">
    </w-dialog>
</template>
<script>
    import Dialog from './dialog.vue';

    export default {
        name: 'w-confirm',
        extends: Dialog,
        components: {
            'w-dialog': Dialog
        },

        props: {
            height: {
                type: [String, Number],
                default: 140
            },
            width: {
                type: [String, Number],
                default: '80%'
            },
            callback: {
                type: Function
            }
        },

        computed: {
            _buttons() {
                return [{
                    text: '取消',
                    action: this._doCancel
                }, {
                    text: '确定',
                    action: this._doSure
                }]
            }
        },

        methods: {
            _doSure() {
                typeof this.callback == 'function' && this.callback(true);
                this.$emit('confirm');
            },
            _doCancel() {
                typeof this.callback == 'function' && this.callback(false);
                this.$emit('cancel');
            },
            handleVisiable(visiable) {
                this.visiable = visiable;
            }
        }
    }
</script>

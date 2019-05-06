<template>
    <BusyDialog ref="dialog" v-bind="datas" @visiable-change="handleVisiable">
        <slot></slot>
    </BusyDialog>
</template>
<script>
    import Dialog from './dialog.vue';

    export default {
        name: 'busy-confirm',
        extends: Dialog,
        components: {
            BusyDialog: Dialog
        },
        computed: {
            _buttons() {
                return [{
                    text: '取消',
                    action: this.handleCancel
                }, {
                    text: '确定',
                    action: this.handleConfirm
                }]
            },
            datas() {
                return { ...this.$props, isShow: this.visiable, buttons: this._buttons }
            }
        },

        methods: {
            handleConfirm() {
                this.$emit('confirm');
            },
            handleCancel() {
                this.$emit('cancel');
            },
            handleVisiable(visiable) {
                this.visiable = visiable;
            }
        }
    }
</script>

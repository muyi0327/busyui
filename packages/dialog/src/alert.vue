<template>
    <BusyDialog ref="dialog" :class="`${prefixCls}-alert`" v-bind="datas" @visiable-change="handleVisiable">
        <slot></slot>
    </BusyDialog>
</template>
<script>
    import Dialog from './dialog.vue'
    import { initName } from '../../util'

    export default {
        name: initName('alert'),
        extends: Dialog,
        props: {
            action: Function
        },
        components: {
            BusyDialog: Dialog
        },
        computed: {
            datas() {
                return { ...this.$props, isShow: this.visiable, buttons: [{ text: '确定', action: this.action }] }
            }
        },
        methods: {
            handleVisiable(visiable) {
                this.visiable = visiable;
            }
        }
    }
</script>

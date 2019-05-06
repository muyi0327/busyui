<template>
    <BusyDialog ref="dialog" class="busy-alert" v-bind="datas" @visiable-change="handleVisiable">
        <slot></slot>
    </BusyDialog>
</template>
<script>
    import Dialog from './dialog.vue';

    export default {
        name: 'busy-alert',
        extends: Dialog,
        components: {
            BusyDialog: Dialog
        },
        computed: {
            datas() {
                return { ...this.$props, isShow: this.visiable, buttons: [{ text: '确定' }] }
            }
        },
        methods: {
            handleVisiable(visiable) {
                this.visiable = visiable;
            }
        }
    }
</script>

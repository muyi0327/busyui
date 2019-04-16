<template>
    <busy-dialog ref="dialog" class="busy-alert" :show-close="false" :width="width" :height="height" :buttons="[{text:'确定'}]" :is-show="visiable" :is-remove="isRemove" :content="content" @visiable-change="handleVisiable">
    </busy-dialog>
</template>
<script>
    import Dialog from './dialog.vue';

    export default {
        name: 'busy-alert',
        extends: Dialog,
        components: {
            [Dialog.name]: Dialog
        },
        props: {
            width: {
                type: [String, Number],
                default: '80%'
            },
            height: {
                type: [String, Number],
                default: 140
            }
        },
        methods: {
            handleVisiable(visiable) {
                this.visiable = visiable;
            }
        }
    }
</script>

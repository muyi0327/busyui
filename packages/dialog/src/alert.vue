<template>
    <c-dialog ref="dialog" class="cui-alert" :show-close="false" :width="width" :height="height" :buttons="[{text:'确定'}]" :is-show="visiable" :is-remove="isRemove" :content="content" @visiable-change="handleVisiable">
    </c-dialog>
</template>
<script>
    import Dialog from './dialog.vue';

    export default {
        name: 'c-alert',
        extends: Dialog,
        components: {
            'c-dialog': Dialog
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

<style lang="scss">
    .wui-prompt-text {
      width: 100%;
    }
    .wui-prompt-text-input {
      width: 80%;
      height: 28px;
      border: 1px solid #eee;
      box-sizing: border-box;
      padding-left: 5px;
      color: #8a8a8a;
    }
</style>

<template>
    <w-dialog ref="dialog" :show-close="false" :width="width" :height="height" :buttons="_buttons" :is-show="visiable" :is-remove="isRemove" @visiable-change="handleVisiable">
        <div slot="body">
            <div class="wui-prompt-text">
                <input type="text" v-model="content" :placeholder="placeholder" class="wui-prompt-text-input" />
            </div>
        </div>
    </w-dialog>
</template>
<script>
    import Dialog from './dialog.vue';

    export default {
        name: 'w-prompt',
        extends: Dialog,
        components: {
            'w-dialog': Dialog
        },
        props: {
            placeholder: String,
            height: {
                type: [String, Number],
                default: 120
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
                typeof this.callback == 'function' && this.callback(this.content);
                this.$emit('confirm');
            },
            _doCancel() {
                this.$emit('cancel');
            },
            handleVisiable(visiable) {
                this.visiable = visiable;
            }
        }
    }
</script>

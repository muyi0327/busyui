<style lang="scss">
    @import "../../../src/style/variable";
    .#{$prefixClass}-prompt {
        &__text {
            width: 100%;
        }

        &__input {
            width: 80%;
            height: 28px;
            border: 1px solid #eee;
            box-sizing: border-box;
            padding-left: 5px;
            color: #8a8a8a;
        }
    }
</style>

<template>
    <bee-dialog ref="dialog" :show-close="false" :width="width" :height="height" :buttons="_buttons" :is-show="visiable" :is-remove="isRemove" @visiable-change="handleVisiable">
        <div slot="body">
            <div class="bee-prompt__text">
                <input type="text" v-model="content" :placeholder="placeholder" class="bee-prompt__input" />
            </div>
        </div>
    </bee-dialog>
</template>
<script>
    import Dialog from './dialog.vue';

    export default {
        name: 'bee-prompt',
        extends: Dialog,
        components: {
            [Dialog.name]: Dialog
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

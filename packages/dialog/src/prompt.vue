<style lang="scss">
    @import "../../../src/style/variable";
    .#{$prefixCls}-prompt {
        &__text {
            width: 100%;
            padding: 0 0 10px;
        }

        &__input {
            width: 80%;
            height: 32px;
            -webkit-appearance: none;
            border: 1px solid #ddd;
            box-sizing: border-box;
            padding-left: 5px;
            color: #8a8a8a;
            background: transparent;
        }
    }
</style>

<template>
    <BusyDialog ref="dialog" v-bind="datas" @visiable-change="handleVisiable">
        <div>
            <div v-if="content" :class="`${prefixCls}-prompt__text`">
                {{content}}
            </div>
            <div :class="`${prefix}-prompt__input_box`">
                <input type="text" v-model="currentVal" :placeholder="placeholder" :class="`${prefixCls}-prompt__input`" />
            </div>
        </div>
    </BusyDialog>
</template>
<script>
    import Dialog from './dialog.vue'
    import { initName } from '../../util'

    export default {
        name: initName('prompt'),
        extends: Dialog,
        components: {
            BusyDialog: Dialog
        },
        props: {
            placeholder: String,
            height: {
                type: [String, Number],
                default: 180
            },
            content: String,
            value: [String, Number]
        },
        data() {
            return {
                currentVal: this.value
            }
        },
        watch: {
            value(val) {
                this.currentVal = val
            },
            currentVal(val) {
                this.$emit('input', val)
            }
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
                this.$emit('confirm', this.currentVal);
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

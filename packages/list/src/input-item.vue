<style lang="scss">
    .wui-list-input-item {}

    .wui-list-input-content {
        width: 100%;
        .wui-list-input {
            width: 100%;
            height: 24px;
            -webkit-appearance: none;
            appearance: none;
            outline: 0;
            border:0;
            &::-webkit-input-placeholder {
                color: #b2b2b2;
            }
        }

        .wui-list-input-error{
            height:20px;
            line-height:20px;
            color:#e00;
            font-size:12px;
            text-align:left;
        }
    }
</style>

<template>
    <w-list-item 
        :height="inputHeight" 
        :label="label" 
        :label-width="labelWidth" 
        :label-align="labelAlign" 
        :label-vertical="labelVertical"
        :label-style="labelStyle" 
        @label-click="handleLabelClick"
        :show-label="showLabel" 
        :icon-width="iconWidth" 
        :icon-align="iconAlign" 
        :icon-vertical="iconVertical"
        :icon-style="iconStyle" 
        @icon-click="handleIconClick"
        :show-icon="showIcon" class="wui-list-input-item">

        <div v-if="$slots['label']" slot="label">
            <slot name="label"></slot>
        </div>

        <div class="wui-list-input-content" slot="content">
            <w-input 
                :placeholder="placeholder" 
                :disabled="disabled" 
                :readonly="readonly" 
                :type="type" 
                :name="name" 
                :autofocus="autofocus"
                :maxlength="maxlength"
                @blur="handleBlur"
                @focus="handleFocus"
                @input="handleInput"
                class="wui-list-input" 
                :styles="inputStyles"
                v-model="currentValue"
                :pattern="pattern"></w-input>
            <div v-if="error" class="wui-list-input-error">{{error}}</div>
        </div>

        <div v-if="$slots['icon']" slot="icon">
            <slot name="icon"></slot>
        </div>
    </w-list-item>
</template>

<script>
    import ListItem from './list-item.vue';
    import Input from '../../input';

    export default {
        name: 'w-list-input-item',
        extends: ListItem,
        props: {
            placeholder: String,
            disabled: Boolean,
            readonly: Boolean,
            autofocus: Boolean,
            type: String,
            name: String,
            maxlength: Number,
            pattern: String,
            value: String,
            error: String,
            inputStyles: Object
        },
        data() {
            return {
                currentValue: this.value
            }
        },
        components: {
            [ListItem.name]: ListItem,
            [Input.name]: Input
        },
        computed:{
            inputHeight(){
                return this.error ? (Number(this.height) + 20) : this.height
            }
        },
        watch:{
            value(val){
                this.currentValue = val;
            },
            currentValue(val){
                this.$emit('input', val)
            }
        },
        methods: {
            handleEnter() {},
            handleFocus() {
                this.$emit('focus', this.currentValue)
            },
            handleBlur() {
                this.$emit('blur', this.currentValue)
            },
            handleInput() {
                this.$emit('input', this.currentValue)
            },
            handleChange() {

            },
            handleLabelClick($e){
                this.$emit('label-click', $e)
            },
            handleIconClick($e){
                this.$emit('icon-click', $e)
            }

        }
    }
</script>

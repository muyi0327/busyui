import Vue from 'vue';
import Prompt from './prompt.vue';


const PromptClass = Vue.extend(Prompt);
var instance

/**
 * @module Prompt
 * @see {@link ../example/all/dialog.html 实例}
 * @desc prompt对话框组件
 * @param {String} placeholder - 提示信息
 * @param {Number} height=140 - 组件高度
 * @param {Number} width=260 - 组件高度
 */
export default Object.assign(Prompt, {
    $type: 'prompt',
    install(vue) {
        vue.component(Prompt.name, Prompt);
    },
    /**
     * @method show
     * @desc 显示Prompt对话框
     * @param {String} text - 内容信息
     * @param {Object} opts - 配置项, <a href="#module_Prompt">参见</a>
     * @param {Function} callback - 回调函数, 用户输入信息将传参给第一个参数
     * @static
     * @returns PromptClass实例
     */
    show(placeholder, opts) {
        if (typeof placeholder === 'object') {
            opts = placeholder;
            placeholder = opts.placeholder;
        }

        opts = opts || {};

        let val = '';

        if (instance) {
            this.hide()
        }

        instance = new PromptClass({
            el: document.createElement('div'),
            propsData: Object.assign(opts, {
                placeholder: placeholder,
                isRemove: true,
                value: val
            })
        });

        return new Promise((resolve, reject) => {
            Vue.nextTick(() => {
                var vm = instance.$mount();
                document.body.appendChild(vm.$el);
                instance.show();
            });

            instance.$on('confirm', () => resolve(val))
            instance.$on('cancel', () => reject())
            instance.$on('input', (newVal) => val = newVal)
        })
    },
    hide() {
        if (instance) {
            instance.hide();
            instance = null
        }
    }
});

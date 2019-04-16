import Vue from 'vue';
import Prompt from './prompt.vue';


const PromptClass = Vue.extend(Prompt);

/**
 * @busy/prompt
 * @module Prompt
 * @see {@link ../example/all/dialog.html 实例}
 * @desc prompt对话框组件
 * @param {String} placeholder - 提示信息
 * @param {Number} height=140 - 组件高度
 * @param {Number} width=260 - 组件高度
 * 
 * @example
 *
 * // use it in html
 * <script src="busy.min.js"><\/script>
 * <link rel="stylesheet" href="busy.min.css" />
 * 
 * Busy.Prompt.show('请填写信息？', (val)=>{console.log(val)});
 * 
 * // use it in webpack or browserify, rollup
 * import {Prompt} from '@busy/dialog';
 * // var Prompt = require('@busy/dialog/prompt.js');
 *
 * Prompt.show('请填写信息？', (val)=>{console.log(val)});
 *
 */
export default Object.assign(Prompt, {
    $type: 'prompt',
    install(vue) {
        vue.component(Prompt.name, Prompt);
    },
    /**
     * 显示Prompt对话框
     * @method show
     * @desc 显示Prompt对话框
     * @param {String} text - 内容信息
     * @param {Object} opts - 配置项, <a href="#module_Prompt">参见</a>
     * @param {Function} callback - 回调函数, 用户输入信息将传参给第一个参数
     * @static
     * @returns PromptClass实例
     * 
     * @example
     * const confirm = Busy.Prompt.show('请输入要跳转的网址', (url)=>{window.location = url});
     * prompt.doClose();
     * 
     */
    show(text, opts, callback) {
        if (typeof text === 'object') {
            callback = opts;
            opts = text;
            text = opts.placeholder;
        }

        if (typeof text === 'function') {
            opts = {};
            callback = text;
            text = '';
        }

        if (typeof text === 'string' && typeof opts === 'function') {
            callback = opts;
            opts = {};
        }

        callback = callback || function () {};
        var instance = new PromptClass({
            el: document.createElement('div'),
            propsData: Object.assign(opts, {
                placeholder: text,
                callback: callback,
                isRemove: true
            })
        });

        Vue.nextTick(() => {
            var vm = instance.$mount();
            document.body.appendChild(vm.$el);
            instance.show();
        });

        return instance;
    }
});

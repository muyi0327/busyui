import Vue from 'vue';
import Confirm from './confirm.vue';


const ConfirmClass = Vue.extend(Confirm);

/**
 * busy-confirm
 * @module Confirm
 * @see {@link ../example/all/dialog.html 实例}
 * @desc confirm对话框组件
 * @param {String} content - 显示信息
 * @param {Number} height=140 - 组件高度
 * @param {Number} width=260 - 组件高度
 * 
 * @example
 *
 * // use it in html
 * <script src="busy.min.js"><\/script>
 * <link rel="stylesheet" href="busy.min.css" />
 * 
 * Busy.Confirm.show('确定要提交吗？', (result)=>{if (result) {console.log('提交')}});
 * 
 * // use it in webpack or browserify, rollup
 * import {Confirm} from '@busy/dialog';
 * // var Confirm = require('@busy/dialog/confirm.js');
 *
 * Confirm.show('确定要提交吗？', (result)=>{if (result) {console.log('提交')}});
 *
 */
export default Object.assign(Confirm, {
    $type: 'confirm',
    install(vue) {
        vue.component(Confirm.name, Confirm);
    },
    /**
     * 显示Alert对话框
     * @method show
     * @desc 显示Confirm对话框
     * @param {String} text - 内容信息
     * @param {Object} opts - 配置项, <a href="#module_Confirm">参见</a>
     * @param {Function} callback - 回调函数, 用户选择结果将传参给第一个参数: true of false
     * @static
     * @returns ConfirmClass实例
     * 
     * @example
     * const confirm = Busy.Confirm.show('确认要提交吗？', (rst)=>{if (rs) console.log('确认提交')});
     * confirm.doClose();
     * 
     */
    show(text, opts, callback) {
        if (typeof text === 'object') {
            callback = opts;
            opts = text;
            text = opts.content;
        }

        if (typeof text === 'function') {
            opts = {};
            callback = text;
            text = '';
        }

        if (typeof text === 'string' && typeof opts === 'function') {
            callback = opts;
            opts = {}
        }

        callback = callback || function () {};
        var instance = new ConfirmClass({
            el: document.createElement('div'),
            propsData: Object.assign(opts, {
                content: text,
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

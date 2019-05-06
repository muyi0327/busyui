import Vue from 'vue';
import Alert from './Alert.vue';


const AlertClass = Vue.extend(Alert);

/**
 * @busyui/alert
 * @module Alert
 * @see {@link ../example/all/dialog.html 实例}
 * @desc alert对话框组件
 * @param {String} content - 显示信息
 * @param {Number} height=140 - 组件高度
 * @param {Number} width=240 - 组件高度
 * 
 * @example
 * // use it in html
 * <script src="busyui.js"><\/script>
 * <link rel="stylesheet" href="busyui.css" />
 * 
 * Busy.Alert.show('提交申请成功');
 *
 * // use it in webpack or browserify, rollup
 * import {Alert} from '@busyui/dialog';
 * // var Aler = require('@busyui/dialog/alert.js');
 *
 * Alert.show('提交申请成功');
 *
 */
export default Object.assign(Alert, {
    $type: 'alert',
    install(vue) {
        vue.component(Alert.name, Alert);
    },
    /**
     * 显示Alert对话框
     * @method show
     * @desc 显示Alert对话框
     * @param {String} text - 内容信息
     * @param {Object} opts - 配置项, <a href="#module_Alert">参见</a>
     * @static
     * @returns AlertClass实例
     * 
     * @example
     * busy.Alert.show('提交申请成功');
     */
    show(text, opts) {
        if (typeof text === 'object') {
            opts = text;
            text = opts.content;
        }

        opts = opts || {};
        var instance = new AlertClass({
            el: document.createElement('div'),
            propsData: Object.assign(opts, {
                content: text,
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

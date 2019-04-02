import Vue from 'vue';
import Dialog from './dialog.vue';


var DialogClass = Vue.extend(Dialog);

/**
 * cui-dialog
 * @module Dialog
 * @see {@link ../example/all/dialog.html 实例}
 * @desc 对话框组件 <bee-dialog />
 * @param {Number} width=240 - 对话框宽度
 * @param {Number} height=160 - 对话框高度
 * @param {String} content - 对话框内容, 必填
 * @param {String} title＝'' - 对话框标题
 * @param {Function} show - 对话框标题
 * @param {Function} hide - 对话框标题
 * @param {Array<Object>} buttons=[{text:'确定'},{text:'取消'}] - 对话框标题
 * @param {Object} contentStyle - 对话框内容样式
 * @param {Boolean} showClose=false - 是否显示关闭按钮
 * @example
 * import {Dialog} from 'bee/packages/dialog';
 * 
 * Dialog.show({
 *      title: '提交信息',
 *      content: '确定要提交吗？', 
 *      buttons:[{text:'确定', action:function(){
 *          // 确认提交
 *      }},{text:'取消', action: function(){
 *          // 不提交
 *      }}]
 * });
 *
 */
export default Object.assign(Dialog, {
    install(vue) {
        vue.component(Dialog.name, Dialog);
    },
    /**
     * 显示对话框
     * @method show
     * @desc 显示对话框Dialog
     * @param {Object} opts - 配置项, <a href="#module_Dialog">参见</a>
     * @static
     * @returns DialogClass实例
     * 
     * @example
     * Bee.Dialog.show({content:'红包来了!',title:'发红包了'})
     * 
     */
    show(opts) {
        opts = opts || {};
        var instance = new DialogClass({
            el: document.createElement('div'),
            propsData: Object.assign({}, opts, {
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

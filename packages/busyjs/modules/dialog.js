import Vue from 'vue'
import DialogComponent from '../../dialog'

// cc
var DialogClass = Vue.extend(DialogComponent);

/**
 * @busyui/dialog
 * @module Dialog
 * @see {@link ../example/all/dialog.html 实例}
 * @desc 对话框组件11111 <busy-dialog />
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
 * import {Dialog} from '@busyui/dialog';
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
class Dialog {
    constructor() {
        this.instance = null
    }
    /**
     * 显示对话框
     * @method show
     * @desc 显示对话框Dialog
     * @param {Object} opts - 配置项, <a href="#module_Dialog">参见</a>
     * @static
     * @returns DialogClass实例
     * 
     * @example
     * Busy.Dialog.show({content:'红包来了!',title:'发红包了'})
     * 
     */
    show(opts) {
        opts = opts || {};
        instance = new DialogClass({
            el: document.createElement('div'),
            propsData: {
                isRemove: true,
                ...opts
            }
        });

        Vue.nextTick(() => {
            var vm = this.instance.$mount();
            document.body.appendChild(vm.$el);
            this.instance.show();
        });

        return this.instance;
    }

    /**
     * @method hide
     * @desc 隐藏对话框
     */
    hide() {
        this.instance && this.instance.hide()
        this.instance = null
    }
}

export default Dialog

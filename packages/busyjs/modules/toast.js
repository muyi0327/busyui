import Vue from 'vue';
import ToastComponent from '../../toast';

var ToastClass = Vue.extend(ToastComponent),
    instance;

/**
 * Toast module
 * @module Toast
 * @see {@link ../example/all/toast.html 实例}
 * @desc Toast组件 <busy-toast></busy-toast>
 * @param {Object} opts - 选项 可选{content:'显示内容', pos: '显示位置', delay: '显示多长时间隐藏', type: 'icon类型'}
 * @param {String} content - 显示内容
 * @param {String} pos='middle' - 显示位置,可以是 'top', 'middle', 'bottom'
 * @param {Number} delay=2000 - 显示时间，单位毫秒
 * @param {String} type - icon类型
 * @param {Boolean} isShow=false - 是否显示
 * @param {Boolean} isRemove=false - 是否隐藏移除dom
 * @param {Boolean} autoHide=true - 是否自动隐藏
 * @param {Number} iconHeight=28 - 设置图标的高度
 * @param {Number} iconWidth=28 - 设置图标的宽度
 * @param {Number} color=#fff - 设置图标的颜色
 * @param {Function} hide - 隐藏
 * @param {Function} show - 显示
 * @param {Event} hide - 隐藏时触发
 * @param {Event} show - 显示时触发
 * @param {Event} visiable-change - 显示,隐藏都会触发
 * @param {Event} after-leave - 隐藏动画结束时触发
 * 
 * @example
 *  // use it in module tools
 *   import Toast from '@busyui/toast';
 *   1, Toast.show('内容')
 *   2, Toast.show('内容', 5000)
 *   3, Toast.show('内容', 'top', 5000)
 *   4, Toast.show({content:'内容', pos: 'top', delay: 5000})
 * 
 *   // use it in html
 *   <script src="busyui.js"><\/script>
 *   <link href="busyui.css" rel="stylesheet" />
 * 
 *   1, Busy.Toast.show('内容')
 *   2, Busy.Toast.show('内容', 5000)
 *   3, Busy.Toast.show('内容', 'top', 5000)
 *   4, Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
 * 
 * 
 */

class Toast {

    constructor() {
        this.instance = null
    }

    /**
     * @method show
     * @param {Object} opts - 配置项, <a href="#module_Toast">参见</a>
     * @static
     * @returns ToastClass实例
     * 
     * @example
     * Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
     * 
     */
    show(content, opts) {
        if (this.instance) {
            this.hide()
        }

        let type = typeof content

        if (type === 'object') {
            opts = content
            content = opts.content
        } else if (type == 'string' || type === 'number') {
            opts = {
                ...opts,
                content
            }
        }

        this.instance = new ToastClass({
            el: document.createElement('div'),
            propsData: {
                isRemove: true,
                autoHide: true,
                ...opts
            }
        });

        Vue.nextTick(() => {
            var vm = this.instance.$mount();
            document.body.appendChild(vm.$el);
            this.instance.show();
        })

        return new Promise((resolve) => {
            this.instance.$on('hide', () => resolve())
        })
    }

    hide() {
        this.instance && this.instance.hide();
        this.instance = null;
    }
}

export default Toast

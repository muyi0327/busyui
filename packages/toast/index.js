import Vue from 'vue';
import Toast from './src/toast.vue';
import '../util/src/polyfill';

var ToastClass = Vue.extend(Toast),
    instance, vm;

/**
 * Toast component
 * @module Toast
 * @see {@link ../example/all/toast.html 实例}
 * @desc Toast组件 <bee-toast></bee-toast>
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
 *   import Toast from 'bee/packages/toast';
 *   1, Toast.show('内容')
 *   2, Toast.show('内容', 5000)
 *   3, Toast.show('内容', 'top', 5000)
 *   4, Toast.show({content:'内容', pos: 'top', delay: 5000})
 * 
 *   // use it in html
 *   <script src="bee.min.js"><\/script>
 *   <link href="bee.min.css" rel="stylesheet" />
 * 
 *   1, bee.Toast.show('内容')
 *   2, bee.Toast.show('内容', 5000)
 *   3, bee.Toast.show('内容', 'top', 5000)
 *   4, bee.Toast.show({content:'内容', pos: 'top', delay: 5000})
 * 
 * 
 */

export default Object.assign(Toast, {
    install(vue) {
        vue.component(Toast.name, Toast);
    },
    /**
     * @method show
     * @param {Object} opts - 配置项, <a href="#module_Toast">参见</a>
     * @static
     * @returns ToastClass实例
     * 
     * @example
     * Bee.Toast.show({content:'内容', pos: 'top', delay: 5000})
     * 
     */
    show(opts) {
        opts = opts || {};

        let content, type, delay, pos, complete, len = arguments.length;
        // case toast('content info')
        if (typeof opts == 'string' || typeof opts == 'number' || Array.isArray(opts)) {
            content = opts;
        }

        // case toast('content info','position info')
        if (typeof arguments[1] == 'string') {
            pos = arguments[1];
        }

        // case toast('content info','delay time')
        if (typeof arguments[1] == 'number') {
            delay = arguments[1];
        }

        //  case toast('content info', 'position info', 'delay time')
        if (typeof arguments[2] == 'number') {
            delay = arguments[2];
        }

        //  case toast('content info', 'position info', 'type info')
        if (typeof arguments[2] == 'string') {
            type = arguments[2];
        }

        //  case toast('content info', 'position info', 'delay time', 'type info')
        if (typeof arguments[3] == 'string') {
            type = arguments[3];
        }

        if (typeof arguments[len - 1] == 'function') {
            complete = arguments[len - 1]
        }

        if (instance) {
            this.hide();
        }

        instance = new ToastClass({
            el: document.createElement('div'),
            propsData: Object.assign({}, {
                type: type,
                content: content,
                pos: pos,
                delay: delay,
                isRemove: true,
                autoHide: true
            }, opts)
        });

        Vue.nextTick(() => {
            vm = instance.$mount();
            document.body.appendChild(vm.$el);
            if (complete) {
                instance.$on('hide', complete)
            }
            instance.show();
        });

        return instance;
    },
    hide() {
        instance && instance.hide();
        instance.$off('hide')
        instance = null;
        vm = null;
    }
});

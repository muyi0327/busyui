import Vue from 'vue';
import Toast from './src/toast.vue';

var ToastClass = Vue.extend(Toast),
    instance, vm;

/**
 * Toast component
 * @module Toast
 * @see {@link ../example/all/toast.html 实例}
 * @desc Toast组件 <busy-toast></busy-toast>
 * @param {Object} opts - 选项 可选{content:'显示内容', pos: '显示位置', delay: '显示多长时间隐藏', type: 'icon类型'}
 * @param {String} content - 显示内容
 * @param {String} pos='middle' - 显示位置,可以是 'top', 'middle', 'bottom'
 * @param {Number} delay=2000 - 显示时间，单位毫秒
 * @param {String} iconType - icon类型
 * @param {Boolean} isShow=false - 是否显示
 * @param {Boolean} isRemove=false - 是否隐藏移除dom
 * @param {Boolean} autoHide=true - 是否自动隐藏
 * @param {Number} iconHeight=28 - 设置图标的高度
 * @param {Number} iconWidth=28 - 设置图标的宽度
 * @param {Function} hide - 隐藏
 * @param {Function} show - 显示
 * @param {Event} hide - 隐藏时触发
 * @param {Event} show - 显示时触发
 * @param {Event} visiable-change - 显示,隐藏都会触发
 * @param {Event} after-leave - 隐藏动画结束时触发
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
     * Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
     * 
     */
    show(content, opts) {
        if (instance) {
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

        instance = new ToastClass({
            el: document.createElement('div'),
            propsData: {
                isRemove: true,
                autoHide: true,
                ...opts
            }
        });

        Vue.nextTick(() => {
            var vm = instance.$mount();
            document.body.appendChild(vm.$el);
            instance.show();
        })

        return instance
    },
    hide() {
        if (instance) {
            instance.hide();
            instance = null
        }
        vm = null;
    }
});

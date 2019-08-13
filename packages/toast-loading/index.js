import Vue from 'vue';
import ToastLoading from './src/toast-loading.vue';

var ToastLoadingClass = Vue.extend(ToastLoading);
var tlInstance, tlVm;
/**
 * @module ToastLoading
 * @see {@link ../example/all/toast-loading.html 实例}
 * @desc ToastLoading
 * @param {Number} height=100 - 高度(px)
 * @param {Number} width=100 - 宽度(px)
 * @param {String} color='#fff' - spinner和文字颜色, css color
 * @param {String} bgColor='rgba(0,0,0,0.6)' - 背景色, css color
 * @param {String} direction='column' - spinner和文字排列方向, column 垂直方向, row 水平方向
 * @param {Object} spinner - 设置spinner格式
 * @param {String} text - loading文字
 **/
export default Object.assign(ToastLoading, {
    install(vue) {
        vue.component(ToastLoading.name, ToastLoading);
    },
    /**
     * 隐藏loading
     * @method hide
     * @static
     * 
     */
    hide() {
        tlInstance && tlInstance.$destroy();
        tlVm && document.body.removeChild(tlVm.$el);
        tlVm = null;
        tlInstance = null;
    },
    /**
     * 显示loading
     * @method show
     * @param {Object} opts - 配置信息, <a href="#module_Loading">参考</a>
     * @static
     * @returns LoadingClass实例
     * 
     */
    show(opts) {
        opts = opts || {};

        if (tlInstance) {
            this.hide();
        }

        tlInstance = new ToastLoadingClass({
            el: document.createElement('div'),
            propsData: opts
        })

        Vue.nextTick(() => {
            tlVm = tlInstance.$mount();
            document.body.appendChild(tlVm.$el);
            tlInstance.show();
        })
    }
});

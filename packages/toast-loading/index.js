import Vue from 'vue';
import ToastLoading from './src/toast-loading.vue';

var ToastLoadingClass = Vue.extend(ToastLoading);
var tlInstance, tlVm;
/**
 * busy-toast-loading
 * @module ToastLoading
 * @see {@link ../example/all/toast-loading.html 实例}
 * @desc 页面toastloading组件 <busy-toast-loading />
 * @param {Number} height=100 - 高度(px)
 * @param {Number} width=100 - 宽度(px)
 * @param {String} color='#fff' - spinner和文字颜色, css color
 * @param {String} bgColor='rgba(0,0,0,0.6)' - 背景色, css color
 * @param {String} direction='column' - spinner和文字排列方向, column 垂直方向, row 水平方向
 * @param {Object} spinner - 设置spinner格式
 * @param {String} text - loading文字
 * 
 * @example
 *  //  use it in html
 *  <script src="busy.min.js"><\/script>
 *  <link rel="stylesheet" href="busy.min.css">
 *
 *  Busy.ToastLoading.show();
 *  http.get('url').then(()=>{
 *    Busy.ToastLoading.hide();
 *  });
 *
 *  // use it in module tools
 *  import ToastLoading from '@busy/toast-loading';
 *  ToastLoading.show({spinner:{type:2}, direction="row"});
 *  http.get('url').then(()=>{
 *    ToastLoading.hide();
 *  });
 **/
export default Object.assign(ToastLoading, {
    install(vue) {
        vue.component('busy-toast-loading', ToastLoading);
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
     * @example
     * Busy.ToastLoading.show();
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
        });

        Vue.nextTick(() => {
            tlVm = tlInstance.$mount();
            document.body.appendChild(tlVm.$el);
            tlInstance.show();
        });
    }
});

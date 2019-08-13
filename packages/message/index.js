import Vue from 'vue';
import Message from './src/message.vue';

const MessageClass = Vue.extend(Message);

/**
 * @class
 * @constructor
 * @module Message
 * @see {@link ../example/all/message.html 实例}
 * @desc 浮层提示信息组件
 * @param {String} pos='top' - 显示位置,可取值 'top', 'middle', 'bottom'
 * @param {String} type='info' - 提示框类型, 可取值 'info', 'success', 'error', 'warning'
 * @param {String} text - 提示信息内容, 也可以slot方式传入
 * @param {Number} delay=3000 - 显示多长时间，单位 ms<毫秒>
 * @param {Boolean} isRemove=false - 是否隐藏后移除dom
 * @param {Boolean} autoHide=false - 是否自动隐藏
 */
export default Object.assign(Message, {
    install(vue) {
        vue.component(Message.name, Message)
    },
    /**
     * 显示提示信息
     * @method show
     * @static
     * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
     * @returns MessageClass实例
     * 
     * @example
     * Busy.Message.show('有新信息了');
     * 
     */
    show(opts) {
        opts = opts || {};

        var msg = new MessageClass({
            el: document.createElement('div'),
            propsData: Object.assign({}, {
                isRemove: true
            }, opts)
        });

        Vue.nextTick(() => {
            var vm = msg.$mount();
            document.body.appendChild(vm.$el);
            msg.show();
        });

        return msg;
    },
    /**
     * 显示提示信息
     * @method info
     * @static
     * @param {String} text - 提示信息
     * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
     * @returns MessageClass实例
     */
    info(text, opts) {
        return this.show(Object.assign(opts || {}, {
            mode: 'info',
            text: text
        }));
    },
    /**
     * 显示成功提示信息
     * @method success
     * @static
     * @param {String} text - 提示信息
     * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
     * @returns MessageClass实例
     */
    success(text, opts) {
        return this.show(Object.assign(opts || {}, {
            mode: 'success',
            text: text
        }));
    },
    /**
     * 显示警告信息
     * @method warning
     * @static
     * @param {String} text - 提示信息
     * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
     * @returns MessageClass实例
     */
    warning(text, opts) {
        return this.show(Object.assign(opts || {}, {
            mode: 'warning',
            text: text
        }));
    },
    /**
     * 显示错误信息
     * @method error
     * @static
     * @param {String} text - 提示信息
     * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
     * @returns MessageClass实例
     */
    error(text, opts) {
        return this.show(Object.assign(opts || {}, {
            mode: 'error',
            text: text
        }));
    }
});

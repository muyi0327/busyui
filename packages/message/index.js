import Vue from 'vue';
import Message from './src/message.vue';

const MessageClass = Vue.extend(Message);

/**
 * @busy/message
 * @module Message
 * @see {@link ../example/all/message.html 实例}
 * @desc 浮层提示信息组件 <busy-meesage></busy-meesage>
 * @param {String} pos='top' - 显示位置,可取值 'top', 'middle', 'bottom'
 * @param {String} type='info' - 提示框类型, 可取值 'info', 'success', 'error', 'warning'
 * @param {String} text - 提示信息内容, 也可以slot方式传入
 * @param {Number} delay=3000 - 显示多长时间，单位 ms<毫秒>
 * @param {Boolean} isRemove=false - 是否隐藏后移除dom
 * @param {Boolean} autoHide=false - 是否自动隐藏
 * @example
 * 
 *  // use it in module tools
 *  import Message from '@busy/message';
 *  Message.show('有新信息了');
 *  Message.info('有新信息了');
 *  Message.success('信息提交成功');
 *  Message.warning('内容包含非法词');
 * 
 *  // use it in html
 *  <script src="busy.min.js"><\/script>
 *  <link rel="stylesheet" href="Busy.min.css">
 *  Busy.Message.show('有新信息了');
 *  Busy.Message.info('有新信息了');
 *  Busy.Message.success('信息提交成功');
 *  Busy.Message.warning('内容包含非法词');
 * 
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
        let text, type, delay;

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
     * 
     * @example
     *  Busy.Message.info('收到一个优惠券');
     * 
     */
    info(text, opts) {
        return this.show(Object.assign(opts || {}, {
            type: 'info',
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
     * 
     * @example
     *  Busy.Message.success('提交成功');
     * 
     */
    success(text, opts) {
        return this.show(Object.assign(opts || {}, {
            type: 'success',
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
     * 
     * @example
     *  Busy.Message.warning('内容包含非法词');
     * 
     */
    warning(text, opts) {
        return this.show(Object.assign(opts || {}, {
            type: 'warning',
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
     * 
     * @example
     *  Busy.Message.error('内容包含非法词');
     * 
     */
    error(text, opts) {
        return this.show(Object.assign(opts || {}, {
            type: 'error',
            text: text
        }));
    }
});

import ActionSheet from './src/action-sheet.vue';
import ActionSheetItem from './src/action-sheet-item.vue';

var ActionSheetClass, instance, vm;

/**
 * @class
 * @constructor
 * @module ActionSheet
 * @see {@link ../example/all/action-sheet.html 实例}
 * @desc ActionSheet框组件
 * @param {Array} actions - 动作菜单项
 * @param {Boolean} isShow=false - 是否显示
 * @param {Boolean} isRemove=false - 是否隐藏后删除
 * @param {Function} hide - 隐藏
 * @param {Function} show - 显示
 * @param {Event} show - 显示时触发
 * @param {Event} hide - 隐藏时触发
 * @param {Event} visiable-change - 显示隐藏时都会触发
 * @param {Slot} slot - default - 组件slot
 *
 */
ActionSheet.install = function (vue) {
    vue.component(ActionSheet.name, ActionSheet);
    vue.component(ActionSheetItem.name, ActionSheetItem);
    ActionSheetClass = vue.extend(ActionSheet);
}

/**
 * @method show
 * @param {Object} opts - 配置项, <a href="#module_ActionSheet">参见</a>
 * @static
 * @returns ActionSheetClass实例
 * 
 * @example
 * 
 *      Busy.ActionSheet.show({actions:{text:'执行动作', action: function(){console.log('do something')}}})
 * 
 */
ActionSheet.show = function (opts) {
    if (instance) {
        ActionSheet.hide();
    }

    instance = new ActionSheetClass({
        el: document.createElement('div'),
        propsData: Object.assign(opts || {}, {
            isRemove: true
        })
    });

    instance.$nextTick(() => {
        vm = instance.$mount();
        document.body.appendChild(vm.$el);
        instance.show();
    });

    return instance;
}

/**
 * @method hide
 * @static
 * 
 * @example
 * 
 *   Busy.ActionSheet.hide()
 * 
 */
ActionSheet.hide = function () {
    if (instance) {
        instance.hide();
        vm = null;
        instance = null;
    }
}

/**
 * @desc 判断actionsheet是否显示
 * @method isVisiable
 * @static
 * @return {Boolean} - 是否显示
 * 
 * @example
 * 
 *   if （Busy.ActionSheet.isVisiable(){
 *     console.log('done something')
 *   }
 * 
 */
ActionSheet.isVisiable = function () {
    return !!instance && instance.isShow;
}

export default ActionSheet;

import Vue from 'vue';
import Loading from './src/Loading.vue';

const LoadingClass = Vue.extend(Loading);
var instance, vm;

Loading.install = function (vue) {
    vue.component(Loading.name, Loading);
}

Loading.show = function (opts) {
    opts = opts || {};

    if (instance) {
        return instance;
    }

    instance = new LoadingClass({
        el: document.createElement('div'),
        propsData: Object.assign({}, {
            fullPage: true,
            isRemove: true
        }, opts)
    });

    Vue.nextTick(() => {
        vm = instance.$mount();
        document.body.appendChild(vm.$el);
        instance.show();
    });
}

Loading.hide = function () {
    if (instance) {
        instance.hide()
    }
    vm = null;
    instance = null;
}

export default Loading;

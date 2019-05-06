import Vue from 'vue';
import Loading from './src/Loading.vue';

const LoadingClass = Vue.extend(Loading);
var instance;

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
            isRemove: true,
            position: 'fixed'
        }, opts)
    });

    Vue.nextTick(() => {
        let vm = instance.$mount();
        document.body.appendChild(vm.$el);
        instance.show();
    });
}

Loading.hide = function () {
    if (instance) {
        instance.hide()
    }
    instance = null;
}

export default Loading;

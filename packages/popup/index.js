import Popup from './src/popup.vue';

Popup.install = function(vue) {
    vue.component('w-popup', Popup);
}

export default Popup;
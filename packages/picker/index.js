import Picker from './src/picker.vue';

Picker.install = function(vue) {
    vue.component('w-picker', Picker);
}

export default Picker;
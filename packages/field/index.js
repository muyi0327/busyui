import Field from './src/field.vue';

Field.install = function(vue) {
    vue.component('w-field', Field);
}

export default Field;
import Icon from './src/icon.vue';

Icon.install = function (vue) {
    vue.component(Icon.name, Icon);
};

export default Icon;

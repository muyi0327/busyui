import Button from './src/button.vue';

Button.install = function (vue) {
    vue.component(Button.name, Button);
}

export default Button;

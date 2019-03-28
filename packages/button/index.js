import Button from './src/button.vue';

Button.install = function(vue) {
    vue.component('w-button', Button);
}

export default Button;
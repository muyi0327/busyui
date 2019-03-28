import Switch from './src/switch.vue';

Switch.install = function(vue){
    vue.component(Switch.name, Switch)
}

export default Switch;
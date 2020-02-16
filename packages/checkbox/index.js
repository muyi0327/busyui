import Checkbox from './src/checkbox.vue';
import CheckboxList from './src/checkbox-list.vue';

Checkbox.install = function (vue) {
    vue.component(Checkbox.name, Checkbox);
    vue.component(CheckboxList.name, CheckboxList);
}

export { Checkbox, CheckboxList }

export default Checkbox;

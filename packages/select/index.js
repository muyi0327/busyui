import Option from './src/option.vue'
import Select from './src/select.vue'

Select.install = function (vue) {
    vue.component(Option.name, Option)
    vue.component(Select.name, Select)
}


export default Select

import Select from './src/select.vue'
import Option from './src/Option.vue'

Select.install = function (vue) {
    vue.component(Option.name, Option)
    vue.component(Select.name, Select)
}


export default Select

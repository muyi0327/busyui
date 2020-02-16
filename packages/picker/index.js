import Picker from './src/picker.vue'
import PickerWheel from './src/picker-wheel.vue'

Picker.install = (vue) => {
    vue.component(PickerWheel.name, PickerWheel)
    vue.component(Picker.name, Picker)
}

export {
    PickerWheel,
    Picker
}

export default Picker

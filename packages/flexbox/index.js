import FlexBox from './src/flexbox.vue'
import FlexItem from './src/flex-item.vue'

FlexBox.install = (vue) => {
    vue.component(FlexItem.name, FlexItem)
    vue.component(FlexBox.name, FlexBox)
}

export default FlexBox

import Segment from './src/segment.vue'
import SegmentItem from './src/segment-item.vue'

Segment.install = (vue) => {
    vue.component(SegmentItem.name, SegmentItem)
    vue.component(Segment.name, Segement)
}

export default Segment

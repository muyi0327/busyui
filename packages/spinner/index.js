//import svgCircleRotate from './svg-circle-rotate/index.js';
import CircleDash from './src/circle-dash.vue'
import CircleGradient from './src/circle-gradient.vue'
import CircleLine from './src/circle-line.vue'
import CircleRotate from './src/circle-rotate.vue'
import Spinner from './src/index.vue'

Spinner.install = function (vue) {
    vue.component(CircleDash.name, CircleDash)
    vue.component(CircleGradient.name, CircleGradient)
    vue.component(CircleLine.name, CircleLine)
    vue.component(Spinner.name, Spinner)
    vue.component(CircleRotate.name, CircleRotate)
}

export default Spinner;

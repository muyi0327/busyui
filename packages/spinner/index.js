import lineSpinFade from './line-spin-fade/index.js';
import ballScaleMultiple from './ball-scale-multiple/index.js';
import ballClipRotatePulse from './ball-clip-rotate-pulse/index.js';
import lineScalePulseOut from './line-scale-pulse-out/index.js';
import ballSpinFade from './ball-spin-fade/index.js';
import ballBeat from './ball-beat/index.js';
import circleRotate from './circle-rotate/index.js';
//import svgCircleRotate from './svg-circle-rotate/index.js';
import Spinner from './src/spinner.vue';

Spinner.install = function (vue) {
    vue.use(lineSpinFade);
    vue.use(ballScaleMultiple);
    vue.use(ballClipRotatePulse);
    vue.use(lineScalePulseOut);
    vue.use(ballSpinFade);
    vue.use(ballBeat);
    vue.use(circleRotate);
    //vue.use(svgCircleRotate);
    vue.component('w-spinner', Spinner);
}

export default Spinner;
import ProgressRing from './src/progress-ring.vue';
import ProgressLine from './src/progress-line.vue';
import Progress from './src/progress.vue';

Progress.install = function (vue) {
    vue.component(ProgressRing.name, ProgressRing);
    vue.component(ProgressLine.name, ProgressLine);
    vue.component(Progress.name, Progress);
}

export {
    ProgressRing,
    ProgressLine
}

export default Progress;

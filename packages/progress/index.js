import ProgressRing from './src/progress-ring.vue';
import ProgressLine from './src/progress-line.vue';
import Progress from './src/progress.vue';

Progress.install = function(vue) {
    vue.component('w-progress-ring', ProgressRing);
    vue.component('w-progress-line', ProgressLine);
    vue.component('w-progress', Progress);
}

export default Progress;
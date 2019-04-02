import Swipe from './src/swipe.vue';
import SwipeItem from './src/swipe-item.vue';

Swipe.install = function (vue) {
    vue.component(SwipeItem.name, SwipeItem);
    vue.component(Swipe.name, Swipe);
}

export default Swipe;

import Swipe from './src/swipe.vue';
import SwipeItem from './src/swipe-item.vue';

Swipe.install = function(vue){
    vue.component('w-swipe-item', SwipeItem);
    vue.component('w-swipe', Swipe);
}

export default Swipe;
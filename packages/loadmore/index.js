import LoadMore from './src/loadmore.vue';

LoadMore.install = function(vue){
    vue.component('w-loadmore', LoadMore);
}

export default LoadMore;
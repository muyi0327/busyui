import List from './src/list.vue';
import ListItem from './src/list-item.vue';
import ListInputItem from './src/input-item.vue';

List.install = function(vue){
    vue.component(ListItem.name, ListItem)
    vue.component(ListInputItem.name, ListInputItem)
    vue.component(List.name, List)
}

export {List, ListItem, ListInputItem};

export default List;

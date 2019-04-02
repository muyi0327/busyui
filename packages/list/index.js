import List from './src/list.vue';
import ListItem from './src/list-item.vue';

List.install = function (vue) {
    vue.component(ListItem.name, ListItem)
    vue.component(List.name, List)
}

export {
    List,
    ListItem
};

export default List;

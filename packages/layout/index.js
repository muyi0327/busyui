import Row from './src/row.vue';
import Col from './src/col.vue';
import Cell from './src/cell.vue';

export {
    Cell,
    Col,
    Row
}

export default {
    install(vue) {
        vue.component('w-row', Row);
        vue.component('w-col', Col);
        vue.component('w-cell', Cell);
    }
}
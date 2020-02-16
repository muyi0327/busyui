<style lang="scss" scoped>
</style>

<template>
    <List>
        <ListItem>
            <Checkbox></Checkbox>
        </ListItem>
    </List>
</template>

<script>
    import { initName } from '../../util'
    import { List, ListItem } from '../../list'
    import Checkbox from './checkbox.vue'

    export default {
        name: initName('checkbox-list'),
        components: {
            List,
            ListItem,
            Checkbox
        },
        props: {
            options: {
                type: Array
            }
        }
    }
</script>

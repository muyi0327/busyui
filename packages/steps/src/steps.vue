<style lang="scss">
    .bee-stepper {
        width: 100%;
    }
</style>

<template>
    <div class="bee-stepper"></div>
</template>

<script>
    export default {
        name: 'bee-stepper',
        props: {
            steps: {
                type: Array,
                default() {
                    return []
                }
            },
            width: {
                type: [Number, String],
                default: '100%'
            },
            height: {
                type: [Number, String],
                default: 100
            }
        },
        computed: {
            styles() {

            }
        }
    }
</script>

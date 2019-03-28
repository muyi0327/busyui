<style lang="scss">
    .wui-steps{
        width:100%;
    }
</style>

<template>
    <div class="wui-stepper"></div>
</template>

<script>
    export default {
        name:'w-stepper',
        props:{
            steps: {
                type:Array,
                default(){
                    return []
                }
            },
            width:{
                type:[Number,String],
                default: '100%'
            },
            height:{
                type:[Number,String],
                default: 100
            }
        },
        computed:{
            styles(){
                
            }
        }
    }
</script>
